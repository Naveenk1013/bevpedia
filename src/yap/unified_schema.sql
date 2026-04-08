-- ==========================================
-- UNIFIED SUPABASE SCHEMA (SATHI AI + YAP)
-- ==========================================
-- Version: 2.6 (PIN Security, Social Invitations, Message Deletion)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- SYSTEM A: USER PROFILES
-- ==========================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration: Ensure new columns exist for existing tables
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger: Automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, avatar_url)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1) || floor(random()*1000)::text),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- SYSTEM B: SATHI AI
-- ==========================================

CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT DEFAULT 'New Conversation',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- SYSTEM C: YAP COMMUNITY
-- ==========================================

CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.profiles(id),
    is_public BOOLEAN DEFAULT true,
    max_members INTEGER DEFAULT 100,
    pin TEXT, -- 4-6 digit security PIN for private lounges
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.community_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id),
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.community_messages REPLICA IDENTITY FULL;

CREATE TABLE IF NOT EXISTS public.private_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.private_messages REPLICA IDENTITY FULL;

CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    inviter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    invitee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(group_id, invitee_id)
);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- LOGIC & SECURITY
-- ==========================================

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- REALTIME
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE 
    public.groups, 
    public.group_members, 
    public.community_messages, 
    public.private_messages, 
    public.profiles,
    public.invitations;
COMMIT;

-- Private Message Policies
DROP POLICY IF EXISTS "Users can view their own private messages" ON public.private_messages;
CREATE POLICY "Users can view their own private messages" ON public.private_messages 
FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can send private messages" ON public.private_messages;
CREATE POLICY "Users can send private messages" ON public.private_messages 
FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- YAP Policies
DROP POLICY IF EXISTS "Public groups are viewable by everyone" ON public.groups;
CREATE POLICY "Public groups are viewable by everyone" ON public.groups FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Authenticated users can create groups" ON public.groups;
CREATE POLICY "Authenticated users can create groups" ON public.groups FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can view group memberships" ON public.group_members;
CREATE POLICY "Users can view group memberships" ON public.group_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can join groups" ON public.group_members;
CREATE POLICY "Authenticated users can join groups" ON public.group_members FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update their own membership" ON public.group_members;
CREATE POLICY "Users can update their own membership" ON public.group_members FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Members can view community messages" ON public.community_messages;
CREATE POLICY "Members can view community messages" ON public.community_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.group_members WHERE group_members.group_id = community_messages.group_id AND group_members.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Members can insert community messages" ON public.community_messages;
CREATE POLICY "Members can insert community messages" ON public.community_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.group_members WHERE group_members.group_id = community_messages.group_id AND group_members.user_id = auth.uid())
);

-- Message Deletion Policies
DROP POLICY IF EXISTS "Users can delete their own community messages" ON public.community_messages;
CREATE POLICY "Users can delete their own community messages" ON public.community_messages 
FOR DELETE USING (auth.uid() = sender_id OR EXISTS (
    SELECT 1 FROM public.group_members WHERE group_members.group_id = community_messages.group_id AND group_members.user_id = auth.uid() AND group_members.role = 'admin'
));

DROP POLICY IF EXISTS "Users can delete their own private messages" ON public.private_messages;
CREATE POLICY "Users can delete their own private messages" ON public.private_messages 
FOR DELETE USING (auth.uid() = sender_id);

-- Invitation Policies
DROP POLICY IF EXISTS "Users can view their own invitations" ON public.invitations;
CREATE POLICY "Users can view their own invitations" ON public.invitations 
FOR SELECT USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

DROP POLICY IF EXISTS "Admins can send invitations" ON public.invitations;
CREATE POLICY "Admins can send invitations" ON public.invitations 
FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.group_members WHERE group_members.group_id = invitations.group_id AND group_members.user_id = auth.uid() AND group_members.role = 'admin'
));

DROP POLICY IF EXISTS "Invitee can update invitation status" ON public.invitations;
CREATE POLICY "Invitee can update invitation status" ON public.invitations 
FOR UPDATE USING (auth.uid() = invitee_id);

-- REPAIR / BACKFILL (Ensure everyone has a username)
UPDATE public.profiles p
SET username = split_part(u.email, '@', 1) || floor(random()*1000)::text
FROM auth.users u
WHERE p.id = u.id AND p.username IS NULL;

-- Backfill missing profiles
INSERT INTO public.profiles (id, full_name, avatar_url, username)
SELECT id, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url', split_part(email, '@', 1) || floor(random()*1000)::text
FROM auth.users
ON CONFLICT (id) DO NOTHING;
