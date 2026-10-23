import React from 'react';
import { 
  Search, 
  MoreHorizontal, 
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';
import { User, ToolItem } from '../types';
import { TRENDING_TAGS } from '../data/mockData';
import { VerifiedBadge } from './TwitterIcons';

interface RightSidebarProps {
  creators: User[];
  currentUserId: string;
  followedUserIds: string[];
  onToggleFollow: (userId: string) => void;
  onSelectTag: (tag: string) => void;
  onViewProfile: (user: User) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onShowToast: (msg: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  creators,
  currentUserId,
  followedUserIds,
  onToggleFollow,
  onSelectTag,
  onViewProfile,
  searchQuery,
  onSearchChange,
  onShowToast
}) => {
  const suggestedCreators = creators.filter(c => c.id !== currentUserId).slice(0, 3);

  return (
    <aside className="w-80 lg:w-88 flex-shrink-0 hidden lg:block space-y-4 px-3 py-1">
      
      {/* Twitter Search Input */}
      <div className="sticky top-2 z-10 bg-[#000000]/80 backdrop-blur-md pb-1">
        <div className="relative">
          <Search className="absolute left-4 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Twitter / X"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#16181c] border border-transparent focus:border-[#1d9bf0] focus:bg-black text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Subscribe to Premium Card */}
      <div className="bg-[#16181c] rounded-2xl p-4 border border-slate-800">
        <h3 className="font-extrabold text-white text-base leading-tight mb-1">
          Subscribe to Premium
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          Subscribe to unlock new AI features, priority ranking, and verified badge on Zubair WebsiteWala.
        </p>
        <button
          onClick={() => onShowToast('You are already enjoying full Zubair WebsiteWala features! 🚀')}
          className="px-4 py-2 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs transition-colors cursor-pointer"
        >
          Subscribe
        </button>
      </div>

      {/* What's happening (Trending) */}
      <div className="bg-[#16181c] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80">
          <h3 className="font-extrabold text-white text-base">What's happening</h3>
        </div>

        <div className="divide-y divide-slate-800/60">
          {TRENDING_TAGS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTag(item.tag)}
              className="w-full text-left px-4 py-3 hover:bg-white/[0.03] transition-colors flex items-start justify-between group"
            >
              <div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {item.category || 'Trending in Tech'}
                </p>
                <p className="text-sm font-bold text-slate-100 group-hover:underline">
                  #{item.tag}
                </p>
                <p className="text-[11px] text-slate-500">{item.count}</p>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-[#16181c] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80">
          <h3 className="font-extrabold text-white text-base">Who to follow</h3>
        </div>

        <div className="divide-y divide-slate-800/60">
          {suggestedCreators.map((creator) => {
            const isFollowed = followedUserIds.includes(creator.id);
            return (
              <div key={creator.id} className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/[0.03] transition-colors">
                <button
                  onClick={() => onViewProfile(creator)}
                  className="flex items-center gap-3 min-w-0 text-left group"
                >
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-800 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-100 group-hover:underline truncate flex items-center gap-1">
                      {creator.name}
                      {creator.isVerified && <VerifiedBadge className="w-3.5 h-3.5 flex-shrink-0" />}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">@{creator.handle}</p>
                  </div>
                </button>

                <button
                  onClick={() => onToggleFollow(creator.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                    isFollowed
                      ? 'border border-slate-600 text-white hover:border-red-600 hover:text-red-500 hover:bg-red-500/10'
                      : 'bg-white hover:bg-slate-200 text-black'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Twitter Footer links */}
      <div className="px-4 text-[11px] text-slate-600 space-y-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
        </div>
        <p>© 2026 X Corp. / Zubair WebsiteWala 💜🤖</p>
      </div>

    </aside>
  );
};
