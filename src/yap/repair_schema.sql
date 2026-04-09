-- ==========================================
-- YAP DATABASE REPAIR SCRIPT (v2.11 Patch)
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Ensure 'groups' table has missing categories and security columns
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='groups' AND column_name='is_public') THEN
        ALTER TABLE public.groups ADD COLUMN is_public BOOLEAN DEFAULT true;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='groups' AND column_name='pin') THEN
        ALTER TABLE public.groups ADD COLUMN pin TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='groups' AND column_name='max_members') THEN
        ALTER TABLE public.groups ADD COLUMN max_members INTEGER DEFAULT 100;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='groups' AND column_name='category') THEN
        ALTER TABLE public.groups ADD COLUMN category TEXT DEFAULT 'Others';
    END IF;
END $$;

-- 2. Ensure 'invitations' table exists
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    inviter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    invitee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(group_id, invitee_id)
);

-- 3. Enable RLS and Realtime
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_messages REPLICA IDENTITY FULL;
ALTER TABLE public.private_messages REPLICA IDENTITY FULL;
ALTER TABLE public.groups REPLICA IDENTITY FULL;
ALTER TABLE public.invitations REPLICA IDENTITY FULL;

-- 4. GRANT Permissions
GRANT ALL ON public.invitations TO authenticated;
GRANT ALL ON public.groups TO authenticated;
GRANT ALL ON public.group_members TO authenticated;
GRANT ALL ON public.community_messages TO authenticated;
GRANT ALL ON public.private_messages TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- 5. Cascading Deletion Infrastructure (Purge Logic)
-- Update groups to cascade on creator deletion
ALTER TABLE public.groups DROP CONSTRAINT IF EXISTS groups_created_by_fkey;
ALTER TABLE public.groups ADD CONSTRAINT groups_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update community_messages to cascade on sender deletion
ALTER TABLE public.community_messages DROP CONSTRAINT IF EXISTS community_messages_sender_id_fkey;
ALTER TABLE public.community_messages ADD CONSTRAINT community_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 6. Account Purge RPC (Security Definer)
CREATE OR REPLACE FUNCTION public.delete_own_account()
RETURNS VOID AS $$
BEGIN
    -- Delete from auth.users (will cascade to profiles and everything else)
    DELETE FROM auth.users WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.delete_own_account() TO authenticated;

-- 7. Group Deletion Policy
DROP POLICY IF EXISTS "Founders can delete their groups" ON public.groups;
CREATE POLICY "Founders can delete their groups" ON public.groups 
FOR DELETE USING (auth.uid() = created_by);

-- 8. Deletion Policies for Messages (Owner or Admin)
DROP POLICY IF EXISTS "Users can delete their own community messages" ON public.community_messages;
CREATE POLICY "Users can delete their own community messages" ON public.community_messages 
FOR DELETE USING (
    auth.uid() = sender_id 
    OR 
    EXISTS (
        SELECT 1 FROM public.group_members 
        WHERE group_members.group_id = community_messages.group_id 
        AND group_members.user_id = auth.uid() 
        AND group_members.role = 'admin'
    )
);

DROP POLICY IF EXISTS "Users can delete their own private messages" ON public.private_messages;
CREATE POLICY "Users can delete their own private messages" ON public.private_messages 
FOR DELETE USING (auth.uid() = sender_id);

-- 9. Invitation Policies
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

-- 10. Group Members Policies
DROP POLICY IF EXISTS "Anyone can view group memberships" ON public.group_members;
CREATE POLICY "Anyone can view group memberships" ON public.group_members FOR SELECT USING (true);

-- 11. Profile Backfill
INSERT INTO public.profiles (id, full_name, avatar_url, username)
SELECT id, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url', split_part(email, '@', 1) || floor(random()*1000)::text
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 12. Advanced Delete Support (WhatsApp Style)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='private_messages' AND column_name='deleted_by_sender') THEN
        ALTER TABLE public.private_messages ADD COLUMN deleted_by_sender BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='private_messages' AND column_name='deleted_by_receiver') THEN
        ALTER TABLE public.private_messages ADD COLUMN deleted_by_receiver BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 13. Public Profile Mode and Extended Identity Fields
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_public') THEN
        ALTER TABLE public.profiles ADD COLUMN is_public BOOLEAN DEFAULT true;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='location') THEN
        ALTER TABLE public.profiles ADD COLUMN location TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='company') THEN
        ALTER TABLE public.profiles ADD COLUMN company TEXT;
    END IF;
END $$;

-- 14. Private Messages Soft Delete Permissions
DO $$ 
BEGIN 
    DROP POLICY IF EXISTS "Users can update private messages for deletion" ON public.private_messages;
    CREATE POLICY "Users can update private messages for deletion" ON public.private_messages
    FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
END $$;
