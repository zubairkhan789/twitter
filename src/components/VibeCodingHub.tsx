import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  Lightbulb, 
  Compass, 
  Send, 
  Layers, 
  Cpu, 
  Rocket,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { VIBE_CODING_PRINCIPLES, READY_PROMPTS } from '../data/mockData';

interface VibeCodingHubProps {
  onCopyPrompt: (text: string) => void;
  onPostWithPrompt: (promptText: string) => void;
  onShowToast: (msg: string) => void;
}

export const VibeCodingHub: React.FC<VibeCodingHubProps> = ({
  onCopyPrompt,
  onPostWithPrompt,
  onShowToast
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Interactive Generator state
  const [targetType, setTargetType] = useState('Full-Stack Web App');
  const [modelType, setModelType] = useState('Claude 3.7 / Gemini 2.0');
  const [userConcept, setUserConcept] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedGen, setCopiedGen] = useState(false);

  const handleCopyReadyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIdx(idx);
    onShowToast('Prompt copied to clipboard! 📋');
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleGeneratePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userConcept.trim()) {
      onShowToast('Please describe your project idea first!');
      return;
    }

    const output = `Role: Principal AI Architect & Vibe Coder
Target: ${targetType}
Model Context: ${modelType}

Concept: "${userConcept.trim()}"

Vibe Coding Directives:
1. Architecture Spec:
   - Provide a 3-bullet execution plan before coding.
   - Use standard TypeScript interfaces, no implicit 'any'.
   - Avoid generic placeholder content; use domain-rich, contextual data.

2. Styling & Craft:
   - Use Tailwind CSS with modern subtle borders and generous whitespace.
   - Primary Accent: Deep violet / electric purple with dark slate backdrop.
   - Icons: Lucide-react only. Smooth micro-transitions for all interactive states.

3. Code Boundaries:
   - Keep files modular under 180 lines. Extract custom hooks for persistent state.
   - Persist user modifications to localStorage to preserve state across page reloads.
   - Include zero bloat: only install and import what is strictly necessary.`;

    setGeneratedPrompt(output);
    onShowToast('🚀 Production Vibe Prompt crafted!');
  };

  const handleCopyGenerated = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedGen(true);
    onShowToast('Generated prompt copied to clipboard! 📋');
    setTimeout(() => setCopiedGen(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-950 via-[#161a35] to-[#0f1224] border border-purple-800/40 shadow-xl">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Terminal className="w-3.5 h-3.5" />
            The Zubair WebsiteWala Philosophy
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            The Vibe Coding Hub 💜🤖
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Vibe Coding is not about mindlessly spamming prompts. It is the high-bandwidth union of human taste, architectural judgment, and AI velocity. We build software by conducting intelligence, not typing every semicolon.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-purple-300">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> 10x Velocity
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Slop
            </span>
            <span className="flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-purple-400" /> One Idea at a Time
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Principles Grid */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          The 4 Golden Principles of Vibe Coding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VIBE_CODING_PRINCIPLES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111528]/80 border border-purple-900/30 rounded-2xl p-5 hover:border-purple-700/50 transition-all"
            >
              <h3 className="font-bold text-sm text-purple-200 mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Vibe Prompt Generator */}
      <div className="bg-[#111528]/80 border border-purple-800/40 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            Interactive Vibe Prompt Generator
          </h2>
        </div>
        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          Configure your target stack and build intent. Generate a rock-solid, production-grade prompt configured with anti-slop rules ready for Cursor, Claude, or Gemini.
        </p>

        <form onSubmit={handleGeneratePrompt} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Architecture
              </label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
                className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="Full-Stack Web App">Full-Stack Web App (React + Express)</option>
                <option value="Sleek UI Component">Sleek Generative UI Component</option>
                <option value="Autonomous AI Agent">Multi-Step AI Agent Workflow</option>
                <option value="Interactive Landing Page">High-Converting Tech Landing Page</option>
                <option value="Data Visualization Hub">Live Real-Time Data Dashboard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Preferred Model / Engine
              </label>
              <select
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="Claude 3.7 / Gemini 2.0">Claude 3.7 Sonnet / Gemini 2.0 Flash</option>
                <option value="Cursor Composer Agent">Cursor Composer Multi-File Agent</option>
                <option value="Bolt.new / Lovable">Bolt.new / Lovable In-Browser Engine</option>
                <option value="Local DeepSeek / Ollama">Local DeepSeek R1 / Ollama</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your App Idea or Feature Request
            </label>
            <textarea
              value={userConcept}
              onChange={(e) => setUserConcept(e.target.value)}
              placeholder="e.g. A bookmark manager with automatic AI categorization, instant full-text search, and export to markdown..."
              rows={3}
              className="w-full bg-[#151930] border border-purple-900/40 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate Production Prompt
          </button>
        </form>

        {/* Generated Output */}
        {generatedPrompt && (
          <div className="mt-5 p-4 rounded-2xl bg-[#090b14] border border-purple-800/40 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-900/30">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Crafted Vibe Prompt
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyGenerated}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-semibold transition-colors"
                >
                  {copiedGen ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedGen ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
                <button
                  onClick={() => onPostWithPrompt(generatedPrompt)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181d36] hover:bg-[#202747] text-slate-300 text-xs font-semibold transition-colors"
                >
                  <Send className="w-3 h-3 text-purple-400" />
                  <span>Share in Post</span>
                </button>
              </div>
            </div>
            <pre className="text-xs font-mono text-purple-100 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {generatedPrompt}
            </pre>
          </div>
        )}
      </div>

      {/* Ready-to-Copy Prompts Library */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Zubair's Curated System Prompts Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {READY_PROMPTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111528]/80 border border-purple-900/30 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-700/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 italic bg-[#0a0d18] p-3 rounded-xl border border-purple-950 mb-4 line-clamp-4 leading-relaxed font-mono">
                  "{item.prompt}"
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-purple-900/20">
                <button
                  onClick={() => handleCopyReadyPrompt(item.prompt, idx)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-semibold transition-all"
                >
                  {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => onPostWithPrompt(item.prompt)}
                  className="p-1.5 rounded-xl bg-[#181d36] hover:bg-[#202747] text-slate-300 transition-colors"
                  title="Share this prompt as a post"
                >
                  <Send className="w-3.5 h-3.5 text-purple-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
