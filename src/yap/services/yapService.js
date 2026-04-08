import { supabase } from '../../lib/supabaseClient';

export const yapService = {
    // Group operations
    async getPublicGroups(category = null) {
        let query = supabase
            .from('groups')
            .select('*, member_count:group_members(count)')
            .eq('is_public', true);
            
        if (category && category !== 'All') {
            query = query.eq('category', category);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        // Supabase returns count as an object in v2 join syntax
        return data.map(g => ({ ...g, member_count: g.member_count?.[0]?.count || 0 }));
    },

    async createGroup(name, description, userId, isPublic = true, pin = null, category = 'Others') {
        const { data, error } = await supabase
            .from('groups')
            .insert([{ name, description, created_by: userId, is_public: isPublic, pin, category }])
            .select()
            .single();
        if (error) throw error;
        
        // Auto-join the creator as admin
        await this.joinGroup(data.id, userId, 'admin');
        return data;
    },

    async updateGroupPrivacy(groupId, isPublic, pin) {
        const { data, error } = await supabase
            .from('groups')
            .update({ is_public: isPublic, pin })
            .eq('id', groupId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async joinGroup(groupId, userId, role = 'member') {
        const { error } = await supabase
            .from('group_members')
            .upsert([{ group_id: groupId, user_id: userId, role }], { onConflict: 'group_id,user_id' });
        if (error) throw error;
    },

    async updateGroup(groupId, name, description) {
        const { data, error } = await supabase
            .from('groups')
            .update({ name, description })
            .eq('id', groupId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async deleteGroup(groupId) {
        const { data, error } = await supabase
            .from('groups')
            .delete()
            .eq('id', groupId)
            .select();
            
        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Lounge not found or you don't have permission to delete it.");
        }
    },

    async getGroupMembers(groupId) {
        const { data, error } = await supabase
            .from('group_members')
            .select(`
                user_id,
                role,
                joined_at,
                profiles:user_id(full_name, avatar_url, username)
            `)
            .eq('group_id', groupId);
        if (error) throw error;
        return data;
    },

    async removeMember(groupId, userId) {
        const { error } = await supabase
            .from('group_members')
            .delete()
            .eq('group_id', groupId)
            .eq('user_id', userId);
        if (error) throw error;
    },

    async getUserGroups(userId) {
        const { data, error } = await supabase
            .from('group_members')
            .select('groups(*, member_count:group_members(count))')
            .eq('user_id', userId);
        if (error) throw error;
        return data.map(m => ({ 
            ...m.groups, 
            member_count: m.groups.member_count?.[0]?.count || 0 
        }));
    },

    // Messaging operations
    async getMessages(groupId, limit = 50) {
        const { data, error } = await supabase
            .from('community_messages')
            .select(`
                *,
                sender:profiles(full_name, avatar_url)
            `)
            .eq('group_id', groupId)
            .order('created_at', { ascending: true })
            .limit(limit);
        if (error) throw error;
        return data;
    },

    async sendMessage(groupId, senderId, content) {
        const { data, error } = await supabase
            .from('community_messages')
            .insert([{ group_id: groupId, sender_id: senderId, content }])
            .select(`
                *,
                sender:profiles(full_name, avatar_url)
            `)
            .single();
        if (error) throw error;
        return data;
    },

    async getMessageById(messageId) {
        const { data, error } = await supabase
            .from('community_messages')
            .select(`
                *,
                sender:profiles(full_name, avatar_url)
            `)
            .eq('id', messageId)
            .single();
        if (error) throw error;
        return data;
    },

    // Session (Study Room) operations
    async getSessions() {
        const { data, error } = await supabase
            .from('sessions')
            .select(`
                *,
                group:groups(name),
                participants:session_participants(count)
            `)
            .gte('start_time', new Date().toISOString())
            .order('start_time', { ascending: true });
        if (error) throw error;
        return data;
    },

    async joinSession(sessionId, userId) {
        const { error } = await supabase
            .from('session_participants')
            .insert([{ session_id: sessionId, user_id: userId }]);
        if (error) throw error;
    },


    // Private Messaging (1-on-1)
    async getPrivateMessages(userId, otherUserId, limit = 50) {
        const { data, error } = await supabase
            .from('private_messages')
            .select(`
                *,
                sender:profiles!private_messages_sender_id_fkey(full_name, avatar_url)
            `)
            .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
            .order('created_at', { ascending: true })
            .limit(limit);
        if (error) throw error;
        return data;
    },

    async sendPrivateMessage(senderId, receiverId, content) {
        const { data, error } = await supabase
            .from('private_messages')
            .insert([{ sender_id: senderId, receiver_id: receiverId, content }])
            .select(`
                *,
                sender:profiles!private_messages_sender_id_fkey(full_name, avatar_url)
            `)
            .single();
        if (error) throw error;
        return data;
    },

    async getRecentConversations(userId) {
        // This is a more complex query to get unique users we've chatted with
        const { data, error } = await supabase
            .from('private_messages')
            .select(`
                sender_id,
                receiver_id,
                content,
                created_at,
                sender:profiles!private_messages_sender_id_fkey(full_name, avatar_url),
                receiver:profiles!private_messages_receiver_id_fkey(full_name, avatar_url)
            `)
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Reduce to unique conversations
        const conversations = [];
        const seenUsers = new Set();

        data.forEach(msg => {
            const otherUser = msg.sender_id === userId ? msg.receiver : msg.sender;
            const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
            
            if (!seenUsers.has(otherUserId)) {
                seenUsers.add(otherUserId);
                conversations.push({
                    id: otherUserId,
                    user: otherUser,
                    lastMessage: msg.content,
                    timestamp: msg.created_at
                });
            }
        });

        return conversations;
    },

    subscribeToMessages(groupId, userProfile, onMessage, onDelete, onPresence, onTyping) {
        const channel = supabase.channel(`group-${groupId}`);
        
        return channel
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'community_messages',
                filter: `group_id=eq.${groupId}`
            }, (payload) => {
                onMessage(payload.new);
            })
            .on('postgres_changes', {
                event: 'DELETE',
                schema: 'public',
                table: 'community_messages',
                filter: `group_id=eq.${groupId}`
            }, (payload) => {
                onDelete(payload.old.id);
            })
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState();
                const users = Object.values(state).flat().map(p => p.user);
                onPresence(users);
            })
            .on('broadcast', { event: 'typing' }, (payload) => {
                onTyping(payload.payload);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({
                        user: userProfile,
                        online_at: new Date().toISOString(),
                    });
                }
            });

        return channel;
    },

    sendTyping(groupId, userId, fullName, isTyping, activeChannel = null) {
        const channel = activeChannel || supabase.channel(`group-${groupId}`);
        return channel.send({
            type: 'broadcast',
            event: 'typing',
            payload: { userId, fullName, isTyping },
        });
    },

    subscribeToPrivateMessages(userId, userProfile, onMessage, onDelete, onPresence, onTyping) {
        const channel = supabase.channel(`private-${userId}`);
        
        return channel
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'private_messages',
                filter: `receiver_id=eq.${userId}`
            }, (payload) => {
                onMessage(payload.new);
            })
            .on('postgres_changes', {
                event: 'DELETE',
                schema: 'public',
                table: 'private_messages',
                filter: `receiver_id=eq.${userId}`
            }, (payload) => {
                onDelete(payload.old.id);
            })
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState();
                const users = Object.values(state).flat().map(p => p.user);
                onPresence(users);
            })
            .on('broadcast', { event: 'typing' }, (payload) => {
                onTyping(payload.payload);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({
                        user: userProfile,
                        online_at: new Date().toISOString(),
                    });
                }
            });
        
        return channel;
    },

    sendPrivateTyping(recipientId, userId, fullName, isTyping, activeChannel = null) {
        // Send typing to the recipient's private channel
        const channel = activeChannel || supabase.channel(`private-${recipientId}`);
        return channel.send({
            type: 'broadcast',
            event: 'typing',
            payload: { userId, fullName, isTyping },
        });
    },

    async deleteGroupMessage(messageId) {
        const { data, error } = await supabase
            .from('community_messages')
            .delete()
            .eq('id', messageId)
            .select();
        
        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Message not found or you don't have permission to retract it.");
        }
    },

    async deletePrivateMessage(messageId) {
        const { data, error } = await supabase
            .from('private_messages')
            .delete()
            .eq('id', messageId)
            .select();

        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Message not found or you don't have permission to retract it.");
        }
    },

    async verifyLoungePin(groupId, pin) {
        const { data, error } = await supabase
            .from('groups')
            .select('pin')
            .eq('id', groupId)
            .single();
        if (error) throw error;
        return data.pin === pin;
    },

    async sendSocialInvite(groupId, inviterId, inviteeId) {
        const { data, error } = await supabase
            .from('invitations')
            .insert([{ group_id: groupId, inviter_id: inviterId, invitee_id: inviteeId }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getInvitations(userId) {
        const { data, error } = await supabase
            .from('invitations')
            .select('*, group:groups(*), inviter:profiles!invitations_inviter_id_fkey(full_name, username)')
            .eq('invitee_id', userId)
            .eq('status', 'pending');
        if (error) throw error;
        return data;
    },

    async respondToInvite(inviteId, status, groupId, userId) {
        const { error } = await supabase
            .from('invitations')
            .update({ status })
            .eq('id', inviteId);
        if (error) throw error;

        if (status === 'accepted') {
            await this.joinGroup(groupId, userId);
        }
    },

    async getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) throw error;
        return data;
    },

    async updateProfile(userId, profileData) {
        const { data, error } = await supabase
            .from('profiles')
            .update({
                full_name: profileData.full_name,
                username: profileData.username,
                avatar_url: profileData.avatar_url,
                bio: profileData.bio,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async searchUsers(query) {
        if (!query || query.length < 2) return [];
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
            .limit(10);
        if (error) throw error;
        return data;
    }
};
