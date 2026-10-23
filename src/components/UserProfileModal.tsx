import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  MoreHorizontal, 
  Edit3, 
  X, 
  Check, 
  Heart, 
  MessageCircle, 
  Share2
} from 'lucide-react';
import { User, Post, ToolItem } from '../types';
import { VerifiedBadge, RetweetIcon, ChartViewsIcon } from './TwitterIcons';

interface UserProfileModalProps {
  user: User;
  currentUser: User;
  isFollowed: boolean;
  onToggleFollow: (userId: string) => void;
  onSwitchToThisUser: (user: User) => void;
  onUpdateCurrentUserProfile: (updatedData: Partial<User>) => void;
  userPosts: Post[];
  onClose: () => void;
  onLike: (postId: string) => void;
  onRepost: (postId: string) => void;
  onSave: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onVotePoll: (postId: string, optId: string) => void;
  onSelectTag: (tag: string) => void;
  onOpenTool: (tool: ToolItem) => void;
  onShowToast: (msg: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  currentUser,
  isFollowed,
  onToggleFollow,
  onSwitchToThisUser,
  onUpdateCurrentUserProfile,
  userPosts,
  onClose,
  onLike,
  onRepost,
  onSave,
  onAddComment,
  onVotePoll,
  onSelectTag,
  onOpenTool,
  onShowToast
}) => {
  const isSelf = currentUser.id === user.id;
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'highlights' | 'media' | 'likes'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);

  const mediaPosts = userPosts.filter(p => p.image);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCurrentUserProfile({
      name: name.trim(),
      bio: bio.trim(),
      website: website.trim() || undefined,
      avatar: avatarUrl.trim() || user.avatar
    });
    setIsEditing(false);
    onShowToast('Profile updated! ✨');
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(`${window.location.origin}/u/${user.handle}`);
    onShowToast(`Copied profile link for @${user.handle}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-black border border-slate-800 rounded-none sm:rounded-2xl shadow-2xl min-h-screen sm:min-h-0 sm:max-h-[92vh] overflow-y-auto text-slate-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header sticky bar */}
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md px-4 py-2 flex items-center gap-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-900 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-extrabold text-white leading-tight">{user.name}</h2>
              {user.isVerified && <VerifiedBadge className="w-4 h-4" />}
            </div>
            <p className="text-xs text-slate-500 font-mono">{userPosts.length} posts</p>
          </div>
        </div>

        {/* Cover Banner */}
        <div className="relative h-44 sm:h-52 w-full bg-gradient-to-r from-purple-950 via-slate-900 to-black overflow-hidden">
          {user.bannerImage ? (
            <img
              src={user.bannerImage}
              alt="Banner"
              className="w-full h-full object-cover opacity-75"
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
        </div>

        {/* Profile Info Section */}
        <div className="px-4 pb-4">
          
          {/* Avatar & Action Button Row */}
          <div className="flex items-end justify-between -mt-16 sm:-mt-20 mb-3 relative">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-black bg-black"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareProfile}
                className="p-2 rounded-full border border-slate-700 hover:bg-slate-900 text-slate-200 transition-colors"
                title="Share profile"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {isSelf ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-1.5 rounded-full border border-slate-600 hover:bg-white/10 text-white font-bold text-sm transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit profile'}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onToggleFollow(user.id)}
                    className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${
                      isFollowed
                        ? 'border border-slate-600 text-white hover:border-red-600 hover:text-red-500 hover:bg-red-500/10'
                        : 'bg-white hover:bg-slate-200 text-black'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>

                  <button
                    onClick={() => {
                      onSwitchToThisUser(user);
                      onClose();
                      onShowToast(`Switched account to ${user.name}`);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    Switch
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-3 bg-[#16181c] p-4 rounded-2xl border border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => setAvatarUrl('/assets/aistudio/ChatGPT_Image_Sep_26__2026__05_15_45_AM_f041ed4f.png')}
                  className="text-xs text-[#1d9bf0] hover:underline mt-1 block"
                >
                  Use Jinnah & Edhi Photo Preset
                </button>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            /* Bio & User metadata */
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-extrabold text-white">{user.name}</h1>
                  {user.isVerified && <VerifiedBadge className="w-5 h-5" />}
                </div>
                <p className="text-sm text-slate-500 font-mono">@{user.handle}</p>
              </div>

              <p className="text-sm sm:text-base text-slate-100 whitespace-pre-line leading-relaxed">
                {user.bio}
              </p>

              {/* Location, Links & Joined date */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Pakistan 🇵🇰</span>
                </div>
                {user.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1d9bf0] hover:underline"
                    >
                      {user.website.replace('https://', '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined October 2026</span>
                </div>
              </div>

              {/* Following / Followers count */}
              <div className="flex items-center gap-5 text-sm pt-1">
                <div>
                  <span className="font-bold text-white mr-1">
                    {user.followingCount}
                  </span>
                  <span className="text-slate-500">Following</span>
                </div>
                <div>
                  <span className="font-bold text-white mr-1">
                    {(user.followersCount + (isFollowed && !isSelf ? 1 : 0)).toLocaleString()}
                  </span>
                  <span className="text-slate-500">Followers</span>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tabs (Twitter style) */}
          <div className="flex border-b border-slate-800 mt-4 overflow-x-auto scrollbar-none">
            {[
              { id: 'posts', label: 'Posts' },
              { id: 'replies', label: 'Replies' },
              { id: 'highlights', label: 'Highlights' },
              { id: 'media', label: 'Media' },
              { id: 'likes', label: 'Likes' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 text-center font-bold text-sm whitespace-nowrap transition-colors relative hover:bg-white/[0.03] ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-500'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#1d9bf0] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content: Posts */}
          <div className="divide-y divide-slate-800">
            {activeTab === 'posts' && (
              userPosts.length > 0 ? (
                userPosts.map(post => (
                  <div key={post.id} className="py-3">
                    <p className="text-sm text-slate-100 whitespace-pre-line leading-relaxed mb-2">
                      {post.content}
                    </p>
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden border border-slate-800 my-2 max-h-80">
                        <img src={post.image} alt="Attachment" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-6 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-blue-400" /> {post.comments.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <RetweetIcon className="w-3.5 h-3.5 text-emerald-400" /> {post.reposts}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No posts yet.
                </div>
              )
            )}

            {/* Tab: Media */}
            {activeTab === 'media' && (
              mediaPosts.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 pt-3">
                  {mediaPosts.map(p => (
                    <div key={p.id} className="rounded-xl overflow-hidden border border-slate-800 aspect-square group relative">
                      <img src={p.image} alt="Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-bold">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-white" /> {p.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 fill-white" /> {p.comments.length}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No photos or videos yet.
                </div>
              )
            )}

            {activeTab !== 'posts' && activeTab !== 'media' && (
              <div className="text-center py-12 text-slate-500 text-sm">
                Nothing to see here — yet.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
