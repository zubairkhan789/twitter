import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  BarChart2, 
  Code2, 
  Wrench, 
  Sparkles, 
  Globe, 
  X,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User, Post, ToolItem, CodeSnippet, Poll } from '../types';
import { CURATED_TOOLS } from '../data/mockData';

interface InlineTweetComposerProps {
  currentUser: User;
  onPostTweet: (postData: Partial<Post>) => void;
  onShowToast: (msg: string) => void;
}

export const InlineTweetComposer: React.FC<InlineTweetComposerProps> = ({
  currentUser,
  onPostTweet,
  onShowToast
}) => {
  const [content, setContent] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeBody, setCodeBody] = useState('');
  const [codeLang, setCodeLang] = useState('typescript');
  const [showPollInput, setShowPollInput] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Yes', 'No']);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !attachedImage) {
      onShowToast('Write something or attach an image to post!');
      return;
    }

    // Extract hashtags
    const foundTags = content.match(/#[a-zA-Z0-9_]+/g)?.map(t => t.slice(1)) || ['Twitter', 'ZubairWebsiteWala'];

    let toolAttachment: ToolItem | undefined = undefined;
    if (selectedToolId) {
      toolAttachment = CURATED_TOOLS.find(t => t.id === selectedToolId);
    }

    let codeSnippet: CodeSnippet | undefined = undefined;
    if (showCodeInput && codeBody.trim()) {
      codeSnippet = {
        language: codeLang,
        code: codeBody.trim(),
        filename: 'snippet.ts'
      };
    }

    let poll: Poll | undefined = undefined;
    if (showPollInput && pollQuestion.trim() && pollOptions.length >= 2) {
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

    onPostTweet({
      content: content.trim(),
      image: attachedImage || undefined,
      tags: foundTags,
      category: 'General',
      toolAttachment,
      codeSnippet,
      poll
    });

    // Reset composer
    setContent('');
    setAttachedImage(null);
    setShowToolSelector(false);
    setSelectedToolId('');
    setShowCodeInput(false);
    setCodeBody('');
    setShowPollInput(false);
    setPollOptions(['Yes', 'No']);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleAiVibeIdea = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      const ideas = [
        `Building with modern AI is like composing a symphony — one prompt at a time, one project at a time. What are you shipping today? 🚀💜 #ZubairWebsiteWala #VibeCoding #AI`,
        `The difference between 10x engineers and standard workflows in 2026 is tight iteration loops with AI models like Claude 3.7 & Gemini 2.0. #DevTools #FutureOfTech`,
        `Proud moment teaching young builders to code with AI! 'My school is making me into next Jinnah & Edhi — Ask me how.' Education + AI is the true future. 🇵🇰✨ #JinnahAndEdhi`
      ];
      const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
      setContent(randomIdea);
      setIsAiLoading(false);
      onShowToast('✨ Generated AI Tweet draft!');
    }, 300);
  };

  return (
    <div className="border-b border-slate-800 bg-[#000000]/40 backdrop-blur-sm p-4">
      <div className="flex gap-3">
        {/* User avatar */}
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-800 flex-shrink-0"
        />

        {/* Input area */}
        <div className="flex-1 min-w-0">
          <form onSubmit={handlePost}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is happening?!"
              rows={content.length > 80 ? 4 : 2}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base sm:text-lg focus:outline-none resize-none leading-relaxed"
            />

            {/* Attached Image Preview */}
            {attachedImage && (
              <div className="relative mb-3 rounded-2xl overflow-hidden border border-slate-800 max-h-72">
                <img
                  src={attachedImage}
                  alt="Attached preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/75 hover:bg-black text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Tool selector popup */}
            {showToolSelector && (
              <div className="mb-3 p-3 rounded-xl bg-[#0f141c] border border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-300 font-semibold">Attach AI Tool:</span>
                <select
                  value={selectedToolId}
                  onChange={(e) => setSelectedToolId(e.target.value)}
                  className="bg-[#192231] border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="">-- None --</option>
                  {CURATED_TOOLS.map(t => (
                    <option key={t.id} value={t.id}>{t.icon} {t.name} ({t.pricing})</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowToolSelector(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Code Snippet input */}
            {showCodeInput && (
              <div className="mb-3 p-3 rounded-xl bg-[#0a0d14] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Code / Prompt Snippet</span>
                  <button
                    type="button"
                    onClick={() => setShowCodeInput(false)}
                    className="hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={codeBody}
                  onChange={(e) => setCodeBody(e.target.value)}
                  placeholder="// Paste your code or prompt here..."
                  rows={3}
                  className="w-full bg-[#111622] rounded-lg p-2.5 text-xs font-mono text-cyan-200 border border-slate-800 focus:outline-none"
                />
              </div>
            )}

            {/* Poll input */}
            {showPollInput && (
              <div className="mb-3 p-3 rounded-xl bg-[#0f141c] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Create Poll</span>
                  <button
                    type="button"
                    onClick={() => setShowPollInput(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-[#171f2c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={pollOptions[0]}
                    onChange={(e) => setPollOptions([e.target.value, pollOptions[1]])}
                    placeholder="Option 1"
                    className="bg-[#171f2c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={pollOptions[1]}
                    onChange={(e) => setPollOptions([pollOptions[0], e.target.value])}
                    placeholder="Option 2"
                    className="bg-[#171f2c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* Reply audience notice */}
            <div className="flex items-center gap-1.5 pb-3 border-b border-slate-800 text-xs font-bold text-[#1d9bf0] cursor-pointer hover:underline">
              <Globe className="w-3.5 h-3.5" />
              <span>Everyone can reply</span>
            </div>

            {/* Bottom Actions toolbar & Post button */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-1 text-[#1d9bf0]">
                {/* Image button */}
                <button
                  type="button"
                  onClick={() => {
                    if (attachedImage) {
                      setAttachedImage(null);
                    } else {
                      setAttachedImage('/assets/aistudio/ChatGPT_Image_Sep_26__2026__05_15_45_AM_f041ed4f.png');
                      onShowToast('Attached photo: Jinnah & Edhi 📸');
                    }
                  }}
                  className={`p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors ${
                    attachedImage ? 'bg-[#1d9bf0]/20' : ''
                  }`}
                  title="Attach Photo (Click to toggle user photo)"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                {/* Poll */}
                <button
                  type="button"
                  onClick={() => setShowPollInput(!showPollInput)}
                  className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"
                  title="Add Poll"
                >
                  <BarChart2 className="w-5 h-5" />
                </button>

                {/* Code Snippet */}
                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"
                  title="Add Code Snippet"
                >
                  <Code2 className="w-5 h-5" />
                </button>

                {/* AI Tool */}
                <button
                  type="button"
                  onClick={() => setShowToolSelector(!showToolSelector)}
                  className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"
                  title="Tag AI Tool"
                >
                  <Wrench className="w-5 h-5" />
                </button>

                {/* AI Assist */}
                <button
                  type="button"
                  onClick={handleAiVibeIdea}
                  disabled={isAiLoading}
                  className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"
                  title="Generate AI Tweet Idea"
                >
                  <Sparkles className={`w-5 h-5 ${isAiLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Submit Post button */}
              <button
                type="submit"
                disabled={!content.trim() && !attachedImage}
                className="px-4 py-1.5 rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:opacity-50 text-white font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
