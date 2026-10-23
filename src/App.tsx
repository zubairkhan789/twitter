import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User as UserIcon, 
  Wrench, 
  Terminal, 
  Plus, 
  X, 
  Filter, 
  Send, 
  Check, 
  Heart, 
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';
import { 
  User, 
  Post, 
  ToolItem, 
  FeedTab, 
  MainView 
} from './types';
import { 
  CURRENT_USERS, 
  CURATED_TOOLS, 
  INITIAL_POSTS,
  TRENDING_TAGS 
} from './data/mockData';
import { TwitterXLogo, VerifiedBadge, RetweetIcon } from './components/TwitterIcons';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { InlineTweetComposer } from './components/InlineTweetComposer';
import { PostCard } from './components/PostCard';
import { PostComposerModal } from './components/PostComposerModal';
import { ToolsDirectory } from './components/ToolsDirectory';
import { VibeCodingHub } from './components/VibeCodingHub';
import { UserProfileModal } from './components/UserProfileModal';
import { Toast } from './components/Toast';

const USER_PHOTO = '/assets/aistudio/ChatGPT_Image_Sep_26__2026__05_15_45_AM_f041ed4f.png';

export default function App() {
  // Persistence state
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('twitter_zww_user_v3');
    if (saved) return JSON.parse(saved);
    return { ...CURRENT_USERS[0], avatar: USER_PHOTO };
  });

  const [creators, setCreators] = useState<User[]>(() => {
    const saved = localStorage.getItem('twitter_zww_creators_v3');
    if (saved) return JSON.parse(saved);
    return CURRENT_USERS.map(c => c.id === 'user-zubair' ? { ...c, avatar: USER_PHOTO } : c);
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('twitter_zww_posts_v3');
    if (saved) {
      const parsed: Post[] = JSON.parse(saved);
      // Ensure the Jinnah & Edhi photo post is at the top
      if (!parsed.some(p => p.id === 'post-jinnah-edhi')) {
        return [INITIAL_POSTS[0], ...parsed];
      }
      return parsed;
    }
    return INITIAL_POSTS;
  });

  const [tools, setTools] = useState<ToolItem[]>(() => {
    const saved = localStorage.getItem('twitter_zww_tools_v3');
    return saved ? JSON.parse(saved) : CURATED_TOOLS;
  });

  const [followedUserIds, setFollowedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('twitter_zww_followed_ids_v3');
    return saved ? JSON.parse(saved) : ['user-alex', 'user-elena'];
  });

  // UI state
  const [activeView, setActiveView] = useState<MainView>('feed');
  const [feedFilterTab, setFeedFilterTab] = useState<'for-you' | 'following' | 'vibe-coding' | 'tools'>('for-you');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Modals & Drawers
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [viewingProfileUser, setViewingProfileUser] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Direct message simulated chat
  const [chatMessage, setChatMessage] = useState('');
  const [messagesList, setMessagesList] = useState<{ id: string; sender: string; text: string; time: string; isSelf: boolean }[]>([
    {
      id: 'm1',
      sender: 'Zubair WebsiteWala',
      text: 'Salam! Welcome to Twitter / X for Zubair WebsiteWala. Ready to vibe code the future? 🚀🇵🇰',
      time: '10:30 AM',
      isSelf: false
    },
    {
      id: 'm2',
      sender: 'You',
      text: 'Loving the platform and the Jinnah & Edhi mission! Truly inspirational 👏',
      time: '10:32 AM',
      isSelf: true
    }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('twitter_zww_user_v3', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('twitter_zww_creators_v3', JSON.stringify(creators));
  }, [creators]);

  useEffect(() => {
    localStorage.setItem('twitter_zww_posts_v3', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('twitter_zww_tools_v3', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('twitter_zww_followed_ids_v3', JSON.stringify(followedUserIds));
  }, [followedUserIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Post Actions
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasLiked = !post.hasLiked;
        return {
          ...post,
          hasLiked,
          likes: hasLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
        };
      }
      return post;
    }));
  };

  const handleRepost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasReposted = !post.hasReposted;
        return {
          ...post,
          hasReposted,
          reposts: hasReposted ? post.reposts + 1 : Math.max(0, post.reposts - 1)
        };
      }
      return post;
    }));
    showToast('Reposted to your timeline! 🔁');
  };

  const handleSavePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isSaved = !post.isSaved;
        showToast(isSaved ? 'Added to your Bookmarks 🔖' : 'Removed from Bookmarks');
        return { ...post, isSaved };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author: currentUser,
      content: text,
      createdAt: 'Just now',
      likes: 0
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
    showToast('Your reply was sent! 💬');
  };

  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId && post.poll) {
        if (post.poll.userVotedOptionId) {
          showToast('You already voted in this poll.');
          return post;
        }

        const updatedOptions = post.poll.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });

        showToast('Vote recorded! 🗳️');
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: post.poll.totalVotes + 1,
            userVotedOptionId: optionId
          }
        };
      }
      return post;
    }));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Post deleted.');
  };

  const handleCreateOrUpdatePost = (postData: Partial<Post>) => {
    if (editingPost) {
      setPosts(prev => prev.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            content: postData.content || p.content,
            category: postData.category || p.category,
            tags: postData.tags || p.tags,
            toolAttachment: postData.toolAttachment,
            codeSnippet: postData.codeSnippet,
            poll: postData.poll,
            image: postData.image
          };
        }
        return p;
      }));
      setEditingPost(null);
      showToast('Tweet updated! ✨');
    } else {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: currentUser,
        content: postData.content || '',
        createdAt: 'Just now',
        category: postData.category || 'General',
        tags: postData.tags || ['ZubairWebsiteWala'],
        likes: 1,
        hasLiked: true,
        reposts: 0,
        isSaved: false,
        comments: [],
        toolAttachment: postData.toolAttachment,
        codeSnippet: postData.codeSnippet,
        poll: postData.poll,
        image: postData.image,
        views: 120
      };
      setPosts([newPost, ...posts]);
      showToast('Your post was sent! 🚀');
    }
  };

  // Follow / Unfollow
  const handleToggleFollow = (userId: string) => {
    const isCurrentlyFollowed = followedUserIds.includes(userId);
    let updatedIds: string[];

    if (isCurrentlyFollowed) {
      updatedIds = followedUserIds.filter(id => id !== userId);
      showToast('Unfollowed user.');
    } else {
      updatedIds = [...followedUserIds, userId];
      showToast('Following user! Posts will appear in your Following tab 🚀');
    }

    setFollowedUserIds(updatedIds);

    setCreators(prev => prev.map(c => {
      if (c.id === userId) {
        return {
          ...c,
          followersCount: isCurrentlyFollowed ? Math.max(0, c.followersCount - 1) : c.followersCount + 1
        };
      }
      return c;
    }));
  };

  const handleUpdateCurrentUserProfile = (updatedData: Partial<User>) => {
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setCreators(prev => prev.map(c => c.id === currentUser.id ? updated : c));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser.name,
      text: chatMessage.trim(),
      time: 'Just now',
      isSelf: true
    };
    setMessagesList(prev => [...prev, newMsg]);
    setChatMessage('');

    // Simulate reply from Zubair
    setTimeout(() => {
      setMessagesList(prev => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'Zubair WebsiteWala',
          text: 'Thanks for connecting! Let’s keep building great AI tools and uplifting the community! 💜🤖',
          time: 'Just now',
          isSelf: false
        }
      ]);
    }, 1000);
  };

  // Filter posts
  const getFilteredPosts = () => {
    let result = [...posts];

    if (activeView === 'saved') {
      result = result.filter(p => p.isSaved);
    } else if (activeView === 'feed') {
      if (feedFilterTab === 'following') {
        result = result.filter(p => followedUserIds.includes(p.author.id) || p.author.id === currentUser.id);
      } else if (feedFilterTab === 'vibe-coding') {
        result = result.filter(p => p.category === 'Vibe Coding' || p.tags.some(t => t.toLowerCase().includes('vibe')));
      } else if (feedFilterTab === 'tools') {
        result = result.filter(p => p.category === 'AI Tools' || p.toolAttachment !== undefined);
      }
    }

    if (selectedTag) {
      result = result.filter(p => p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.content.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.author.handle.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  };

  const displayedPosts = getFilteredPosts();
  const savedPostsCount = posts.filter(p => p.isSaved).length;

  return (
    <div className="min-h-screen bg-black text-slate-100 flex justify-center selection:bg-[#1d9bf0] selection:text-white">
      
      {/* Wrapper container for Twitter 3-column layout */}
      <div className="w-full max-w-7xl flex justify-between">
        
        {/* Left Column: Twitter Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={(v) => {
            setActiveView(v);
            setSelectedTag(null);
          }}
          savedCount={savedPostsCount}
          currentUser={currentUser}
          onViewProfile={(u) => setViewingProfileUser(u)}
          onOpenComposer={() => {
            setEditingPost(null);
            setComposerOpen(true);
          }}
          onSwitchUser={(u) => {
            setCurrentUser(u);
            showToast(`Switched account to ${u.name}`);
          }}
        />

        {/* Center Column: Main Twitter Feed / Active View */}
        <main className="flex-1 min-w-0 max-w-[620px] border-x border-slate-800 min-h-screen pb-20 md:pb-8">
          
          {/* Mobile Header */}
          <Navbar
            currentUser={currentUser}
            onSwitchUser={(user) => {
              setCurrentUser(user);
              showToast(`Switched account to ${user.name}`);
            }}
            onOpenComposer={() => {
              setEditingPost(null);
              setComposerOpen(true);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeView={activeView}
            onSelectView={(v) => {
              setActiveView(v);
              setSelectedTag(null);
            }}
            onViewProfile={(u) => setViewingProfileUser(u)}
          />

          {/* VIEW: HOME FEED */}
          {activeView === 'feed' && (
            <div>
              {/* Sticky Top Header Tabs (Twitter "For you" / "Following") */}
              <div className="sticky top-0 z-30 bg-black/85 backdrop-blur-md border-b border-slate-800">
                <div className="px-4 py-3 flex items-center justify-between">
                  <h1 className="text-lg font-extrabold text-white">Home</h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1d9bf0]/10 text-[#1d9bf0] border border-[#1d9bf0]/20">
                    𝕏 Zubair WebsiteWala
                  </span>
                </div>

                <div className="flex border-t border-slate-800/60 overflow-x-auto scrollbar-none">
                  {[
                    { id: 'for-you', label: 'For you' },
                    { id: 'following', label: 'Following' },
                    { id: 'vibe-coding', label: 'Vibe Coding' },
                    { id: 'tools', label: 'AI Tools' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setFeedFilterTab(tab.id as any);
                        setSelectedTag(null);
                      }}
                      className="flex-1 py-3 text-center text-sm font-bold transition-colors relative hover:bg-white/[0.03] whitespace-nowrap px-3 text-slate-300"
                    >
                      <span className={feedFilterTab === tab.id ? 'text-white' : 'text-slate-500'}>
                        {tab.label}
                      </span>
                      {feedFilterTab === tab.id && (
                        <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#1d9bf0] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag filter notice */}
              {selectedTag && (
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                  <span className="text-slate-300">
                    Showing tweets tagged: <strong className="text-[#1d9bf0]">#{selectedTag}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
              )}

              {/* Inline Tweet Composer ("What is happening?!") */}
              <InlineTweetComposer
                currentUser={currentUser}
                onPostTweet={handleCreateOrUpdatePost}
                onShowToast={showToast}
              />

              {/* Tweets Timeline */}
              <div className="divide-y divide-slate-800">
                {displayedPosts.length > 0 ? (
                  displayedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      onLike={handleLikePost}
                      onRepost={handleRepost}
                      onSave={handleSavePost}
                      onAddComment={handleAddComment}
                      onVotePoll={handleVotePoll}
                      onDeletePost={handleDeletePost}
                      onEditPost={(p) => {
                        setEditingPost(p);
                        setComposerOpen(true);
                      }}
                      onViewProfile={(u) => setViewingProfileUser(u)}
                      onSelectTag={(t) => setSelectedTag(t)}
                      onOpenTool={(tool) => {
                        setActiveView('tools-directory');
                        setSearchQuery(tool.name);
                      }}
                      onShowToast={showToast}
                    />
                  ))
                ) : (
                  <div className="py-16 px-4 text-center space-y-3">
                    <p className="text-base font-bold text-white">No posts to display</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Try switching to "For you" or follow more AI builders.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: EXPLORE */}
          {activeView === 'explore' && (
            <div>
              <div className="sticky top-0 z-30 bg-black/85 backdrop-blur-md border-b border-slate-800 p-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Twitter / X"
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-[#16181c] border border-transparent focus:border-[#1d9bf0] text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-purple-950/40 via-slate-900 to-black">
                <p className="text-xs text-[#1d9bf0] font-bold">Trending in Pakistan 🇵🇰</p>
                <h2 className="text-xl font-extrabold text-white mt-1">#JinnahAndEdhi</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Education and AI-driven leadership inspiring the next generation.
                </p>
              </div>

              <div className="divide-y divide-slate-800">
                {TRENDING_TAGS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTag(t.tag);
                      setActiveView('feed');
                    }}
                    className="w-full text-left px-4 py-3.5 hover:bg-white/[0.03] transition-colors flex justify-between"
                  >
                    <div>
                      <p className="text-xs text-slate-500">{t.category}</p>
                      <p className="text-sm font-bold text-slate-100">#{t.tag}</p>
                      <p className="text-xs text-slate-500">{t.count}</p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: NOTIFICATIONS */}
          {activeView === 'notifications' && (
            <div>
              <div className="sticky top-0 z-30 bg-black/85 backdrop-blur-md border-b border-slate-800 px-4 py-3">
                <h1 className="text-lg font-extrabold text-white">Notifications</h1>
              </div>

              <div className="divide-y divide-slate-800">
                <div className="p-4 flex gap-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center text-[#1d9bf0]">
                    <VerifiedBadge className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold">Verified Account Active</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your verified checkmark is active on Zubair WebsiteWala Twitter! 🚀
                    </p>
                  </div>
                </div>

                <div className="p-4 flex gap-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      <strong className="font-bold">Alex Chen</strong> liked your tweet
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 italic">
                      "My school is making me into next Jinnah & Edhi — Ask me how! 🌟🇵🇰"
                    </p>
                  </div>
                </div>

                <div className="p-4 flex gap-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <RetweetIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      <strong className="font-bold">Elena Rostova</strong> reposted your tweet
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 italic">
                      "Welcome to Zubair WebsiteWala — our dedicated AI social playground! 💜🤖"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: MESSAGES */}
          {activeView === 'messages' && (
            <div className="flex flex-col h-[calc(100vh-4rem)]">
              <div className="sticky top-0 z-30 bg-black/85 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-extrabold text-white">Messages</h1>
                  <span className="text-xs text-slate-500">with Zubair WebsiteWala</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messagesList.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                        m.isSelf
                          ? 'bg-[#1d9bf0] text-white rounded-br-none'
                          : 'bg-[#16181c] border border-slate-800 text-slate-100 rounded-bl-none'
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-black flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Start a new message"
                  className="flex-1 bg-[#16181c] border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#1d9bf0]"
                />
                <button
                  type="submit"
                  disabled={!chatMessage.trim()}
                  className="p-2.5 rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:opacity-50 text-white transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* VIEW: BOOKMARKS */}
          {activeView === 'saved' && (
            <div>
              <div className="sticky top-0 z-30 bg-black/85 backdrop-blur-md border-b border-slate-800 px-4 py-3">
                <h1 className="text-lg font-extrabold text-white">Bookmarks</h1>
                <p className="text-xs text-slate-500">@{currentUser.handle}</p>
              </div>

              <div className="divide-y divide-slate-800">
                {displayedPosts.length > 0 ? (
                  displayedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      onLike={handleLikePost}
                      onRepost={handleRepost}
                      onSave={handleSavePost}
                      onAddComment={handleAddComment}
                      onVotePoll={handleVotePoll}
                      onDeletePost={handleDeletePost}
                      onViewProfile={(u) => setViewingProfileUser(u)}
                      onSelectTag={(t) => setSelectedTag(t)}
                      onOpenTool={(tool) => {
                        setActiveView('tools-directory');
                        setSearchQuery(tool.name);
                      }}
                      onShowToast={showToast}
                    />
                  ))
                ) : (
                  <div className="py-20 px-4 text-center">
                    <p className="text-xl font-extrabold text-white">Save posts for later</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Don’t let the good ones fly away! Bookmark posts to easily find them again.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: AI TOOLS RADAR */}
          {activeView === 'tools-directory' && (
            <div className="p-4">
              <ToolsDirectory
                tools={tools}
                onUpvoteTool={(id) => {
                  setTools(prev => prev.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
                }}
                onShareToolInPost={() => {
                  setEditingPost(null);
                  setComposerOpen(true);
                }}
                onAddCustomTool={(t) => setTools([t, ...tools])}
                onShowToast={showToast}
              />
            </div>
          )}

          {/* VIEW: VIBE CODING HUB */}
          {activeView === 'vibe-hub' && (
            <div className="p-4">
              <VibeCodingHub
                onCopyPrompt={() => showToast('Copied to clipboard!')}
                onPostWithPrompt={() => {
                  setEditingPost(null);
                  setComposerOpen(true);
                }}
                onShowToast={showToast}
              />
            </div>
          )}

        </main>

        {/* Right Column: Twitter Right Sidebar */}
        <RightSidebar
          creators={creators}
          currentUserId={currentUser.id}
          followedUserIds={followedUserIds}
          onToggleFollow={handleToggleFollow}
          onSelectTag={(t) => {
            setActiveView('feed');
            setSelectedTag(t);
          }}
          onViewProfile={(u) => setViewingProfileUser(u)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onShowToast={showToast}
        />

      </div>

      {/* Tweet Composer Modal (when triggered via Post button) */}
      <PostComposerModal
        isOpen={composerOpen}
        onClose={() => {
          setComposerOpen(false);
          setEditingPost(null);
        }}
        currentUser={currentUser}
        onSavePost={handleCreateOrUpdatePost}
        editingPost={editingPost}
        onShowToast={showToast}
      />

      {/* User Profile Modal */}
      {viewingProfileUser && (
        <UserProfileModal
          user={viewingProfileUser}
          currentUser={currentUser}
          isFollowed={followedUserIds.includes(viewingProfileUser.id)}
          onToggleFollow={handleToggleFollow}
          onSwitchToThisUser={(user) => setCurrentUser(user)}
          onUpdateCurrentUserProfile={handleUpdateCurrentUserProfile}
          userPosts={posts.filter(p => p.author.id === viewingProfileUser.id)}
          onClose={() => setViewingProfileUser(null)}
          onLike={handleLikePost}
          onRepost={handleRepost}
          onSave={handleSavePost}
          onAddComment={handleAddComment}
          onVotePoll={handleVotePoll}
          onSelectTag={(t) => {
            setViewingProfileUser(null);
            setActiveView('feed');
            setSelectedTag(t);
          }}
          onOpenTool={(tool) => {
            setViewingProfileUser(null);
            setActiveView('tools-directory');
            setSearchQuery(tool.name);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Toast Alert */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Mobile Bottom Navigation Bar (Twitter Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-slate-800 px-6 py-2.5 flex items-center justify-between">
        <button
          onClick={() => {
            setActiveView('feed');
            setSelectedTag(null);
          }}
          className={`p-1.5 ${activeView === 'feed' ? 'text-white' : 'text-slate-500'}`}
        >
          <Home className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            setActiveView('explore');
            setSelectedTag(null);
          }}
          className={`p-1.5 ${activeView === 'explore' ? 'text-white' : 'text-slate-500'}`}
        >
          <Search className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            setActiveView('notifications');
            setSelectedTag(null);
          }}
          className={`p-1.5 relative ${activeView === 'notifications' ? 'text-white' : 'text-slate-500'}`}
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#1d9bf0] rounded-full" />
        </button>

        <button
          onClick={() => {
            setActiveView('messages');
            setSelectedTag(null);
          }}
          className={`p-1.5 ${activeView === 'messages' ? 'text-white' : 'text-slate-500'}`}
        >
          <Mail className="w-6 h-6" />
        </button>

        <button
          onClick={() => setViewingProfileUser(currentUser)}
          className="p-1"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-800"
          />
        </button>
      </nav>

    </div>
  );
}
