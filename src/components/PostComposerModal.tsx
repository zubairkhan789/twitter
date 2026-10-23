import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Code2, 
  Wrench, 
  BarChart2, 
  Image as ImageIcon, 
  Check, 
  Bot, 
  RefreshCw,
  Plus,
  Trash2,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Post, User, ToolItem, CodeSnippet, Poll } from '../types';
import { CURATED_TOOLS } from '../data/mockData';

interface PostComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSavePost: (postData: Partial<Post>) => void;
  editingPost?: Post | null;
  onShowToast: (msg: string) => void;
}

export const PostComposerModal: React.FC<PostComposerModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSavePost,
  editingPost,
  onShowToast
}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Post['category']>('Trending');
  const [tagsInput, setTagsInput] = useState('');
  
  // Attachments toggle states
  const [showToolSelect, setShowToolSelect] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string>('');
  
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('typescript');
  const [codeFilename, setCodeFilename] = useState('');
  const [codeBody, setCodeBody] = useState('');

  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Option 1', 'Option 2']);

  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showAiAssist, setShowAiAssist] = useState(false);

  // Initialize if editing
  useEffect(() => {
    if (editingPost) {
      setContent(editingPost.content);
      setCategory(editingPost.category);
      setTagsInput(editingPost.tags ? editingPost.tags.join(', ') : '');
      
      if (editingPost.toolAttachment) {
        setShowToolSelect(true);
        setSelectedToolId(editingPost.toolAttachment.id);
      }
      if (editingPost.codeSnippet) {
        setShowCodeSnippet(true);
        setCodeLanguage(editingPost.codeSnippet.language);
        setCodeFilename(editingPost.codeSnippet.filename || '');
        setCodeBody(editingPost.codeSnippet.code);
      }
      if (editingPost.poll) {
        setShowPoll(true);
        setPollQuestion(editingPost.poll.question);
        setPollOptions(editingPost.poll.options.map(o => o.text));
      }
      if (editingPost.image) {
        setShowImageInput(true);
        setImageUrl(editingPost.image);
      }
    } else {
      // Reset
      setContent('');
      setCategory('Trending');
      setTagsInput('VibeCoding, ZubairWebsiteWala');
      setShowToolSelect(false);
      setSelectedToolId('');
      setShowCodeSnippet(false);
      setCodeBody('');
      setShowPoll(false);
      setPollOptions(['Option 1', 'Option 2']);
      setShowImageInput(false);
      setImageUrl('');
    }
  }, [editingPost, isOpen]);

  if (!isOpen) return null;

  // AI Prompt templates & assistant
  const handleGenerateAiDraft = (type: 'vibe' | 'tool' | 'trend' | 'showcase') => {
    setIsAiGenerating(true);
    setTimeout(() => {
      if (type === 'vibe') {
        setContent(`⚡ **Vibe Coding Protocol: Speed With Architectural Integrity**

Here is my core mental model when pairing with AI code assistants:
1. Don't write raw code; write explicit interface boundaries.
2. Instruct the model: "Use standard TypeScript enums, zero generic types, and modular hooks under 150 lines."
3. Keep the visual preview open in split-screen — immediate feedback prevents 95% of regressions.

One prompt at a time. The code is fast, but the vision is human! 🚀`);
        setCategory('Vibe Coding');
        setTagsInput('VibeCoding, SystemDesign, CleanCode, WebDev');
        setShowCodeSnippet(true);
        setCodeFilename('vibe-contract.ts');
        setCodeLanguage('typescript');
        setCodeBody(`interface VibeSprint {
  targetFeature: string;
  maxIterations: number;
  testCoverage: 'unit' | 'e2e' | 'smoke';
  onDrift: (error: Error) => void;
}`);
      } else if (type === 'tool') {
        setContent(`🛠️ **Tool Deep-Dive: Why Cursor + Claude 3.7 / Gemini 2.0 is the unstoppable combo in 2026**

After testing across 12 production micro-apps, here is the verdict:
• Context-indexing across the whole repo is unmatched.
• Spec-driven generation produces clean, production-ready React 19 code on the first attempt.
• Low latency makes coding feel like having a senior engineer pair programming with you in real-time.

What tool has made the biggest difference in your build velocity this month? 👇`);
        setCategory('AI Tools');
        setTagsInput('Cursor, Gemini2, DevTools, Productivity');
        setShowToolSelect(true);
        setSelectedToolId('tool-cursor');
      } else if (type === 'trend') {
        setContent(`🌐 **AI Tech Trend: Autonomous Agentic Loops vs Co-Pilots**

We are transitioning from "assistants that auto-complete a line" to "agents that scaffold entire verified systems". 

The real breakthrough in 2026:
• Self-healing test runs
• Multimodal verification (agent views screenshot of rendered UI to verify button colors and responsive layout)
• Semantic memory across dev sessions

Are you ready for autonomous agent peers in your team? 🤖`);
        setCategory('Trending');
        setTagsInput('AutonomousAgents, FutureOfDev, TechTrends, AI');
      } else if (type === 'showcase') {
        setContent(`🌟 **Project Launch: Built an interactive AI Tool Navigator in 4 hours!**

Thrilled to share my latest build on Zubair WebsiteWala! 💜🤖
• Stack: React 19 + Tailwind CSS + Lucide Icons
• Features: Real-time search, tag cloud filters, curated upvoting, and live community discussions.
• Live Demo: https://zubairwebsitewala.dev

Drop your feedback below — constructive critiques always welcome! 🚀`);
        setCategory('Showcase');
        setTagsInput('Showcase, BuildInPublic, React, WebDev');
      }
      setIsAiGenerating(false);
      setShowAiAssist(false);
      onShowToast('✨ AI draft generated successfully!');
    }, 400);
  };

  const handlePolisher = () => {
    if (!content.trim()) {
      onShowToast('Please write some content first before polishing!');
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      setContent(prev => `🚀 **Key Insight from Zubair WebsiteWala Community:**\n\n${prev}\n\n💡 *Takeaway: One idea at a time. One project at a time. Let's build the future!*`);
      setIsAiGenerating(false);
      onShowToast('✨ Post polished with punchy formatting!');
    }, 300);
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handleRemovePollOption = (idx: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      onShowToast('Please write some content for your post.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    // Build tool attachment
    let toolAttachment: ToolItem | undefined = undefined;
    if (showToolSelect && selectedToolId) {
      toolAttachment = CURATED_TOOLS.find(t => t.id === selectedToolId);
    }

    // Build code snippet
    let codeSnippet: CodeSnippet | undefined = undefined;
    if (showCodeSnippet && codeBody.trim()) {
      codeSnippet = {
        language: codeLanguage,
        filename: codeFilename.trim() || undefined,
        code: codeBody.trim()
      };
    }

    // Build poll
    let poll: Poll | undefined = undefined;
    if (showPoll && pollQuestion.trim() && pollOptions.length >= 2) {
      poll = {
        id: `poll-${Date.now()}`,
        question: pollQuestion.trim(),
        totalVotes: 0,
        options: pollOptions.map((opt, i) => ({
          id: `opt-${i}-${Date.now()}`,
          text: opt.trim(),
          votes: 0
        }))
      };
    }

    onSavePost({
      content: content.trim(),
      category,
      tags,
      toolAttachment,
      codeSnippet,
      poll,
      image: showImageInput && imageUrl.trim() ? imageUrl.trim() : undefined
    });

    // Fire celebratory confetti!
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-[#111528] border border-purple-800/40 rounded-2xl shadow-2xl p-5 sm:p-6 my-8 text-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-900/30">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/40"
            />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                {editingPost ? 'Edit Post' : 'Create AI Discovery Post'}
                <span className="text-xs font-normal text-purple-400">on Zubair WebsiteWala</span>
              </h3>
              <p className="text-xs text-slate-400">Share your AI workflows, tools, and code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2039] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Vibe Assist Quick Bar */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-950/60 via-[#191e38] to-[#12162a] border border-purple-700/40">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAiAssist(!showAiAssist)}
              className="flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>✨ AI Vibe Assist</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200">
                Generate or Polish
              </span>
            </button>
            {content && (
              <button
                type="button"
                onClick={handlePolisher}
                disabled={isAiGenerating}
                className="text-xs font-semibold text-purple-300 hover:text-white px-2 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600 transition-colors flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${isAiGenerating ? 'animate-spin' : ''}`} />
                Polish Draft
              </button>
            )}
          </div>

          {showAiAssist && (
            <div className="mt-3 pt-3 border-t border-purple-800/30 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleGenerateAiDraft('vibe')}
                className="p-2 rounded-lg bg-[#111425] hover:bg-purple-900/40 border border-purple-900/40 text-[11px] font-semibold text-purple-200 hover:text-white transition-all text-left"
              >
                ⚡ Vibe Coding Tip
              </button>
              <button
                type="button"
                onClick={() => handleGenerateAiDraft('tool')}
                className="p-2 rounded-lg bg-[#111425] hover:bg-purple-900/40 border border-purple-900/40 text-[11px] font-semibold text-purple-200 hover:text-white transition-all text-left"
              >
                🛠️ AI Tool Review
              </button>
              <button
                type="button"
                onClick={() => handleGenerateAiDraft('trend')}
                className="p-2 rounded-lg bg-[#111425] hover:bg-purple-900/40 border border-purple-900/40 text-[11px] font-semibold text-purple-200 hover:text-white transition-all text-left"
              >
                💡 Tech Trend
              </button>
              <button
                type="button"
                onClick={() => handleGenerateAiDraft('showcase')}
                className="p-2 rounded-lg bg-[#111425] hover:bg-purple-900/40 border border-purple-900/40 text-[11px] font-semibold text-purple-200 hover:text-white transition-all text-left"
              >
                🌟 Project Launch
              </button>
            </div>
          )}
        </div>

        {/* Main Post Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category selection */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Feed Channel:</span>
            {(['Trending', 'Vibe Coding', 'AI Tools', 'Showcase', 'General'] as Post['category'][]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  category === cat
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                    : 'bg-[#151930] text-slate-300 hover:bg-[#1f2648]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Text Area */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What are you building, discovering, or vibe coding today? Share prompts, lessons, or tool breakdowns..."
              rows={5}
              className="w-full bg-[#141829] border border-purple-900/40 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 leading-relaxed transition-all"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
              <span>Supports hashtags like #VibeCoding #Cursor #Gemini</span>
              <span>{content.length} chars</span>
            </div>
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="VibeCoding, Cursor, AI, Frontend"
              className="w-full bg-[#141829] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Attachment Toggles */}
          <div className="flex items-center gap-2 pt-2 border-t border-purple-900/30 flex-wrap">
            <span className="text-xs text-slate-400 font-medium mr-1">Attach:</span>
            <button
              type="button"
              onClick={() => setShowToolSelect(!showToolSelect)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                showToolSelect 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#151930] text-slate-300 hover:bg-[#1d2345]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>AI Tool Card</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCodeSnippet(!showCodeSnippet)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                showCodeSnippet 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#151930] text-slate-300 hover:bg-[#1d2345]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Snippet</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPoll(!showPoll)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                showPoll 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#151930] text-slate-300 hover:bg-[#1d2345]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Interactive Poll</span>
            </button>

            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                showImageInput 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-[#151930] text-slate-300 hover:bg-[#1d2345]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image Banner</span>
            </button>
          </div>

          {/* Tool Attachment Form */}
          {showToolSelect && (
            <div className="p-3.5 rounded-xl bg-[#14182e] border border-purple-800/40 space-y-2 animate-in fade-in">
              <label className="block text-xs font-bold text-purple-300">
                Select AI Tool to Feature:
              </label>
              <select
                value={selectedToolId}
                onChange={(e) => setSelectedToolId(e.target.value)}
                className="w-full bg-[#0d1020] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option value="">-- Choose a tool --</option>
                {CURATED_TOOLS.map(tool => (
                  <option key={tool.id} value={tool.id}>
                    {tool.icon} {tool.name} ({tool.category}) - {tool.pricing}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Code Snippet Form */}
          {showCodeSnippet && (
            <div className="p-3.5 rounded-xl bg-[#0a0d18] border border-purple-900/50 space-y-2.5 animate-in fade-in">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Language</label>
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    className="w-full bg-[#141829] border border-purple-900/40 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="bash">Bash / Shell</option>
                    <option value="css">CSS / Tailwind</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">File Name (optional)</label>
                  <input
                    type="text"
                    value={codeFilename}
                    onChange={(e) => setCodeFilename(e.target.value)}
                    placeholder="e.g. prompt.ts or agent.py"
                    className="w-full bg-[#141829] border border-purple-900/40 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Code / System Prompt</label>
                <textarea
                  value={codeBody}
                  onChange={(e) => setCodeBody(e.target.value)}
                  placeholder="// Paste your vibe code snippet or AI prompt here..."
                  rows={4}
                  className="w-full bg-[#141829] border border-purple-900/40 rounded-lg p-2.5 text-xs font-mono text-purple-200"
                />
              </div>
            </div>
          )}

          {/* Poll Form */}
          {showPoll && (
            <div className="p-3.5 rounded-xl bg-[#14182e] border border-purple-800/40 space-y-2.5 animate-in fade-in">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Poll Question</label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Which LLM is your daily driver for coding?"
                  className="w-full bg-[#0d1020] border border-purple-900/40 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-400">Options</label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...pollOptions];
                        newOpts[idx] = e.target.value;
                        setPollOptions(newOpts);
                      }}
                      className="flex-1 bg-[#0d1020] border border-purple-900/40 rounded-lg px-2.5 py-1 text-xs text-slate-200"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePollOption(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Option
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Image Banner Form */}
          {showImageInput && (
            <div className="p-3.5 rounded-xl bg-[#14182e] border border-purple-800/40 space-y-2 animate-in fade-in">
              <label className="block text-[11px] font-bold text-slate-300">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-[#0d1020] border border-purple-900/40 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              />
              <div className="flex gap-2 text-[10px] text-slate-400">
                <span>Quick presets:</span>
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80')}
                  className="text-purple-400 hover:underline"
                >
                  Cyber Violet
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80')}
                  className="text-purple-400 hover:underline"
                >
                  AI Matrix
                </button>
              </div>
            </div>
          )}

          {/* Footer Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-900/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-purple-600/30 cursor-pointer active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{editingPost ? 'Save Changes' : 'Publish to Feed 🚀'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
