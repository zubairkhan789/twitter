import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User as UserIcon, 
  Wrench, 
  Terminal, 
  Feather, 
  MoreHorizontal, 
  Check, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { MainView, User } from '../types';
import { TwitterXLogo, VerifiedBadge } from './TwitterIcons';
import { CURRENT_USERS } from '../data/mockData';

interface SidebarProps {
  activeView: MainView;
  onSelectView: (view: MainView) => void;
  savedCount: number;
  currentUser: User;
  onViewProfile: (user: User) => void;
  onOpenComposer: () => void;
  onSwitchUser: (user: User) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  savedCount,
  currentUser,
  onViewProfile,
  onOpenComposer,
  onSwitchUser
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const navItems = [
    { id: 'feed' as MainView, label: 'Home', icon: Home },
    { id: 'explore' as MainView, label: 'Explore', icon: Search },
    { id: 'notifications' as MainView, label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'messages' as MainView, label: 'Messages', icon: Mail },
    { id: 'saved' as MainView, label: 'Bookmarks', icon: Bookmark, count: savedCount },
    { id: 'tools-directory' as MainView, label: 'AI Tools Radar', icon: Wrench },
    { id: 'vibe-hub' as MainView, label: 'Vibe Hub', icon: Terminal },
    { id: 'profile' as MainView, label: 'Profile', icon: UserIcon },
  ];

  return (
    <aside className="w-20 xl:w-64 flex-shrink-0 flex flex-col justify-between h-[calc(100vh-2rem)] sticky top-4 select-none px-2 py-1">
      
      {/* Top section: Logo & Nav items */}
      <div className="space-y-1">
        
        {/* 𝕏 (Twitter) Logo */}
        <button
          onClick={() => onSelectView('feed')}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors mb-2 text-white group"
          title="Twitter / X - Zubair WebsiteWala"
        >
          <TwitterXLogo className="w-7 h-7 group-hover:scale-105 transition-transform" />
        </button>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'profile') {
                    onViewProfile(currentUser);
                  } else {
                    onSelectView(item.id);
                  }
                }}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-full text-base transition-all group ${
                  isSelected
                    ? 'font-bold text-white'
                    : 'text-slate-200 hover:bg-slate-900/80 hover:text-white font-medium'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${isSelected ? 'stroke-[2.5] text-[#1d9bf0]' : 'text-slate-200'}`} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1d9bf0] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-black">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-lg leading-none">{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="hidden xl:inline text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full ml-auto">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Big Twitter "Post" Button */}
        <div className="pt-3">
          <button
            onClick={onOpenComposer}
            className="w-12 h-12 xl:w-full xl:h-12 rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] active:scale-95 text-white font-bold text-base shadow-lg shadow-[#1d9bf0]/20 flex items-center justify-center transition-all cursor-pointer"
          >
            <Feather className="w-5 h-5 xl:hidden" />
            <span className="hidden xl:inline">Post</span>
          </button>
        </div>

      </div>

      {/* Bottom section: Account switcher */}
      <div className="relative pt-4">
        
        {/* Account popup menu */}
        {showAccountMenu && (
          <div 
            className="absolute bottom-16 left-0 w-64 bg-[#000000] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
            onClick={() => setShowAccountMenu(false)}
          >
            <div className="px-3 py-2 border-b border-slate-800 mb-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Switch Persona</p>
              <p className="text-xs text-slate-500">Test Twitter as different accounts</p>
            </div>

            <div className="space-y-1">
              {CURRENT_USERS.map((user) => {
                const isActive = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => onSwitchUser(user)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                      isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-800"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                          {user.name}
                          {user.isVerified && <VerifiedBadge className="w-3.5 h-3.5" />}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate font-mono">@{user.handle}</p>
                      </div>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-[#1d9bf0]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => onViewProfile(currentUser)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-[#1d9bf0]" />
                View Full Profile
              </button>
            </div>
          </div>
        )}

        {/* Current user pill card */}
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="w-full flex items-center justify-between p-2 rounded-full hover:bg-slate-900/80 transition-colors text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 flex-shrink-0"
            />
            <div className="hidden xl:block min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-white truncate">{currentUser.name}</span>
                {currentUser.isVerified && <VerifiedBadge className="w-3.5 h-3.5 flex-shrink-0" />}
              </div>
              <span className="text-xs text-slate-500 font-mono block truncate">
                @{currentUser.handle}
              </span>
            </div>
          </div>
          <MoreHorizontal className="hidden xl:block w-4 h-4 text-slate-400" />
        </button>

      </div>

    </aside>
  );
};
