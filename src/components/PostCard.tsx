import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  MoreHorizontal, 
  Check, 
  Copy, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  Send,
  Pin,
  Code2
} from 'lucide-react';
import { Post, User, ToolItem } from '../types';
import { VerifiedBadge, RetweetIcon, ChartViewsIcon, ShareUploadIcon } from './TwitterIcons';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: (postId: string) => void;
  onRepost: (postId: string) => void;
  onSave: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onDeletePost?: (postId: string) => void;
  onEditPost?: (post: Post) => void;
  onViewProfile: (user: User) => void;
  onSelectTag: (tag: string) => void;
  onOpenTool: (tool: ToolItem) => void;
  onShowToast: (message: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onRepost,
  onSave,
  onAddComment,
  onVotePoll,
  onDeletePost,
  onEditPost,
  onViewProfile,
  onSelectTag,
  onOpenTool,
  onShowToast
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const isAuthor = currentUser.id === post.author.id;
  const viewsDisplay = post.views ? `${(post.views / 1000).toFixed(1)}K` : `${(post.likes * 14 + 120).toLocaleString()}`;

  const handleCopyPostLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    onShowToast('Tweet link copied to clipboard! 📋');
    setShowMenu(false);
  };

  const handleCopyCode = () => {
    if (post.codeSnippet) {
      navigator.clipboard.writeText(post.codeSnippet.code);
      setCopiedCode(true);
      onShowToast('Code copied to clipboard! 💻');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
    setShowComments(true);
  };

  // Render content with clickable Twitter hashtags and mentions
  const renderFormattedContent = (text: string) => {
    const parts = text.split(/(#[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        const cleanTag = part.slice(1);
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onSelectTag(cleanTag);
            }}
            className="text-[#1d9bf0] hover:underline font-normal inline-block"
          >
            {part}
          </button>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-[#1d9bf0] hover:underline font-normal cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <article className="border-b border-slate-800 hover:bg-white/[0.02] p-4 transition-colors duration-150">
      
      {/* Pinned Tweet notice */}
      {post.isPinned && (
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2 pl-8">
          <Pin className="w-3.5 h-3.5 fill-slate-500" />
          <span>Pinned</span>
        </div>
      )}

      <div className="flex gap-3">
        {/* User avatar */}
        <button
          onClick={() => onViewProfile(post.author)}
          className="flex-shrink-0 group self-start"
        >
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-800 group-hover:opacity-90 transition-opacity"
          />
        </button>

        {/* Tweet Body */}
        <div className="flex-1 min-w-0">
          
          {/* Tweet Header info */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <button
                onClick={() => onViewProfile(post.author)}
                className="font-bold text-sm text-slate-100 hover:underline truncate"
              >
                {post.author.name}
              </button>
              {post.author.isVerified && (
                <VerifiedBadge className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="text-xs text-slate-500 font-mono truncate">
                @{post.author.handle}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-500 hover:underline cursor-pointer">
                {post.createdAt}
              </span>
            </div>

            {/* Options Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-full text-slate-500 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMenu && (
                <div 
                  className="absolute right-0 mt-1 w-44 rounded-xl bg-black border border-slate-800 shadow-2xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setShowMenu(false)}
                >
                  <button
                    onClick={handleCopyPostLink}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-900 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#1d9bf0]" />
                    Copy Tweet Link
                  </button>

                  {isAuthor && onEditPost && (
                    <button
                      onClick={() => onEditPost(post)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-900 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      Edit Post
                    </button>
                  )}

                  {isAuthor && onDeletePost && (
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      Delete Post
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tweet Text Content */}
          <div className="text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line mt-1 mb-3 font-normal">
            {renderFormattedContent(post.content)}
          </div>

          {/* Attached Image (e.g. user photo) */}
          {post.image && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-slate-800 max-h-[500px] bg-black">
              <img
                src={post.image}
                alt="Tweet attachment"
                className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          )}

          {/* Attached Tool Card */}
          {post.toolAttachment && (
            <div className="mb-3 rounded-2xl p-3.5 bg-[#16181c] border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl flex-shrink-0">
                  {post.toolAttachment.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{post.toolAttachment.name}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-[#1d9bf0]">
                      {post.toolAttachment.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{post.toolAttachment.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onOpenTool(post.toolAttachment!)}
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  View
                </button>
                <a
                  href={post.toolAttachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Attached Code Snippet */}
          {post.codeSnippet && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-slate-800 bg-[#000000] text-xs">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#16181c] border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <Code2 className="w-3.5 h-3.5 text-[#1d9bf0]" />
                  <span>{post.codeSnippet.filename || 'snippet'}</span>
                  <span className="px-1.5 py-0.5 text-[9px] uppercase bg-slate-800 text-slate-300 rounded font-semibold">
                    {post.codeSnippet.language}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 overflow-x-auto text-slate-200 font-mono text-xs leading-relaxed max-h-60">
                <pre>{post.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Twitter Interactive Poll */}
          {post.poll && (
            <div className="mb-3 space-y-2">
              <p className="text-xs font-semibold text-slate-200">{post.poll.question}</p>
              <div className="space-y-1.5">
                {post.poll.options.map((option) => {
                  const isUserVoted = post.poll?.userVotedOptionId === option.id;
                  const percentage = post.poll?.totalVotes 
                    ? Math.round((option.votes / post.poll.totalVotes) * 100) 
                    : 0;

                  return (
                    <button
                      key={option.id}
                      onClick={() => onVotePoll(post.id, option.id)}
                      className={`w-full relative overflow-hidden rounded-xl border text-left p-2.5 text-xs transition-all ${
                        isUserVoted
                          ? 'border-[#1d9bf0] bg-[#1d9bf0]/10 font-bold text-white'
                          : 'border-slate-800 hover:border-slate-700 bg-[#16181c] text-slate-200'
                      }`}
                    >
                      <div
                        className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                          isUserVoted ? 'bg-[#1d9bf0]/30' : 'bg-slate-700/20'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          {isUserVoted && <Check className="w-3.5 h-3.5 text-[#1d9bf0]" />}
                          {option.text}
                        </span>
                        <span className="font-mono text-xs text-slate-300 font-bold">{percentage}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500">
                {post.poll.totalVotes} votes
              </p>
            </div>
          )}

          {/* Twitter Action Bar */}
          <div className="flex items-center justify-between max-w-md pt-2 text-slate-500 text-xs">
            
            {/* Reply */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors group ${
                showComments ? 'text-[#1d9bf0]' : ''
              }`}
              title="Reply"
            >
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span>{post.comments.length > 0 ? post.comments.length : ''}</span>
            </button>

            {/* Repost / Retweet */}
            <button
              onClick={() => onRepost(post.id)}
              className={`flex items-center gap-1.5 hover:text-[#00ba7c] transition-colors group ${
                post.hasReposted ? 'text-[#00ba7c]' : ''
              }`}
              title="Repost"
            >
              <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10 transition-colors">
                <RetweetIcon className="w-4 h-4" />
              </div>
              <span>{post.reposts > 0 ? post.reposts : ''}</span>
            </button>

            {/* Like */}
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 hover:text-[#f91880] transition-colors group ${
                post.hasLiked ? 'text-[#f91880] font-semibold' : ''
              }`}
              title="Like"
            >
              <div className="p-2 rounded-full group-hover:bg-[#f91880]/10 transition-colors">
                <Heart 
                  className={`w-4 h-4 transition-transform group-hover:scale-115 ${
                    post.hasLiked ? 'fill-[#f91880] text-[#f91880]' : ''
                  }`} 
                />
              </div>
              <span>{post.likes > 0 ? post.likes : ''}</span>
            </button>

            {/* Views / Impressions */}
            <div className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors group cursor-default">
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
                <ChartViewsIcon className="w-4 h-4" />
              </div>
              <span>{viewsDisplay}</span>
            </div>

            {/* Bookmark & Share */}
            <div className="flex items-center">
              <button
                onClick={() => onSave(post.id)}
                className={`p-2 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] transition-colors ${
                  post.isSaved ? 'text-[#1d9bf0]' : ''
                }`}
                title="Bookmark"
              >
                <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-[#1d9bf0]' : ''}`} />
              </button>

              <button
                onClick={handleCopyPostLink}
                className="p-2 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] transition-colors"
                title="Share"
              >
                <ShareUploadIcon className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Comments / Replies Thread */}
          {showComments && (
            <div className="mt-3 pt-3 border-t border-slate-800 space-y-3">
              
              {/* Reply Form */}
              <form onSubmit={handleSubmitComment} className="flex gap-2.5 items-center">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-800 flex-shrink-0"
                />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post your reply"
                  className="flex-1 bg-transparent border-b border-slate-800 focus:border-[#1d9bf0] pb-1 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-3.5 py-1.5 rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:opacity-50 text-white text-xs font-bold transition-all"
                >
                  Reply
                </button>
              </form>

              {/* Replies list */}
              {post.comments.length > 0 && (
                <div className="space-y-3 pl-2 sm:pl-4 border-l border-slate-800">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => onViewProfile(comment.author)}
                          className="flex items-center gap-1.5 text-left group"
                        >
                          <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-800"
                          />
                          <span className="text-xs font-bold text-slate-200 group-hover:underline">
                            {comment.author.name}
                          </span>
                          {comment.author.isVerified && <VerifiedBadge className="w-3 h-3" />}
                          <span className="text-[11px] text-slate-500">@{comment.author.handle}</span>
                        </button>
                        <span className="text-[11px] text-slate-500">· {comment.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-200 pl-8 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </div>

    </article>
  );
};
