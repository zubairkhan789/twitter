import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Check, 
  Menu,
  X,
  Compass,
  Wrench,
  Bookmark,
  User as UserIcon,
  Feather
} from 'lucide-react';
import { User, MainView } from '../types';
import { TwitterXLogo, VerifiedBadge } from './TwitterIcons';
import { CURRENT_USERS } from '../data/mockData';

interface NavbarProps {
  currentUser: User;
  onSwitchUser: (user: User) => void;
  onOpenComposer: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeView: MainView;
  onSelectView: (view: MainView) => void;
  onViewProfile: (user: User) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUser,
  onOpenComposer,
  searchQuery,
  onSearchChange,
  activeView,
  onSelectView,
  onViewProfile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="md:hidden sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-slate-800">
      <div className="px-4 h-14 flex items-center justify-between">
        
        {/* Left: User Avatar */}
        <button
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="relative"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
          />
        </button>

        {/* Center: 𝕏 (Twitter) Logo */}
        <button
          onClick={() => onSelectView('feed')}
          className="flex items-center gap-1.5"
        >
          <TwitterXLogo className="w-6 h-6 text-white" />
          <span className="font-extrabold text-sm text-white tracking-tight hidden xs:inline">
            Zubair WebsiteWala
          </span>
        </button>

        {/* Right: Post / Search button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenComposer}
            className="p-2 rounded-full bg-[#1d9bf0] text-white"
            title="Post a Tweet"
          >
            <Feather className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile User Dropdown Drawer */}
      {showUserDropdown && (
        <div 
          className="p-3 bg-black border-b border-slate-800 space-y-2 animate-in slide-in-from-top-2"
          onClick={() => setShowUserDropdown(false)}
        >
          <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-xl">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white flex items-center gap-1">
                {currentUser.name}
                {currentUser.isVerified && <VerifiedBadge className="w-3.5 h-3.5" />}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">@{currentUser.handle}</p>
            </div>
            <button
              onClick={() => onViewProfile(currentUser)}
              className="text-xs text-[#1d9bf0] font-bold"
            >
              Profile
            </button>
          </div>

          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold px-2 pt-1">
            Switch Account
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {CURRENT_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => onSwitchUser(u)}
                className={`p-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2 ${
                  u.id === currentUser.id ? 'bg-[#1d9bf0]/20 text-[#1d9bf0]' : 'bg-[#16181c] text-slate-300'
                }`}
              >
                <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full object-cover" />
                <span className="truncate">{u.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
