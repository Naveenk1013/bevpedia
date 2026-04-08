-- ==========================================
-- DATABASE REPAIR SCRIPT (FOR RELATIONS ERRORS)
-- ==========================================
-- Run this if you are getting 'Relationship not found' or '403 Forbidden' errors.

-- 1. RE-MAP FOREIGN KEYS TO PROFILES
-- This ensures PostgREST can join message data with user profiles.

-- Repair community_messages
ALTER TABLE public.community_messages DROP CONSTRAINT IF EXISTS community_messages_sender_id_fkey;
ALTER TABLE public.community_messages ADD CONSTRAINT community_messages_sender_id_fkey 
  FOREIGN KEY (sender_id) REFERENCES public.profiles(id);

-- Repair group_members
ALTER TABLE public.group_members DROP CONSTRAINT IF EXISTS group_members_user_id_fkey;
ALTER TABLE public.group_members ADD CONSTRAINT group_members_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Repair groups
ALTER TABLE public.groups DROP CONSTRAINT IF EXISTS groups_created_by_fkey;
ALTER TABLE public.groups ADD CONSTRAINT groups_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES public.profiles(id);

-- Repair sessions
ALTER TABLE public.sessions DROP CONSTRAINT IF EXISTS sessions_created_by_fkey;
ALTER TABLE public.sessions ADD CONSTRAINT sessions_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES public.profiles(id);

-- Repair session_participants
ALTER TABLE public.session_participants DROP CONSTRAINT IF EXISTS session_participants_user_id_fkey;
ALTER TABLE public.session_participants ADD CONSTRAINT session_participants_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 2. RE-SYNC EXISTING USERS
-- Ensure all existing auth users have a public profile entry
INSERT INTO public.profiles (id, full_name, avatar_url)
SELECT id, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 3. RE-APPLY RLS POLICIES (Stronger versions)
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can join groups" ON public.group_members;
CREATE POLICY "Authenticated users can join groups" ON public.group_members 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can view group memberships" ON public.group_members;
CREATE POLICY "Users can view group memberships" ON public.group_members 
FOR SELECT USING (true);

-- RELOAD SCHEMA CACHE HINT:
-- If you still get errors, go to Supabase -> Settings -> API -> PostgREST Security -> 'Reload Schema'
