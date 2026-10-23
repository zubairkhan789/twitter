import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  ChevronUp, 
  ExternalLink, 
  Star, 
  Sparkles, 
  Share2, 
  Plus, 
  Check, 
  Flame,
  Filter
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolsDirectoryProps {
  tools: ToolItem[];
  onUpvoteTool: (toolId: string) => void;
  onShareToolInPost: (tool: ToolItem) => void;
  onAddCustomTool: (tool: ToolItem) => void;
  onShowToast: (msg: string) => void;
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({
  tools,
  onUpvoteTool,
  onShareToolInPost,
  onAddCustomTool,
  onShowToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New tool submission form state
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<ToolItem['category']>('Coding & IDEs');
  const [newUrl, setNewUrl] = useState('');
  const [newIcon, setNewIcon] = useState('⚡');
  const [newPricing, setNewPricing] = useState<ToolItem['pricing']>('Freemium');
  const [newDesc, setNewDesc] = useState('');

  const categories = [
    'All',
    'Coding & IDEs',
    'LLMs & Reasoning',
    'Agents & Automation',
    'Design & Frontend',
    'Media & Voice'
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUpvote = (toolId: string) => {
    if (upvotedIds.includes(toolId)) {
      setUpvotedIds(upvotedIds.filter(id => id !== toolId));
    } else {
      setUpvotedIds([...upvotedIds, toolId]);
      onUpvoteTool(toolId);
      onShowToast('Upvoted! Added to your radar 🚀');
    }
  };

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) {
      onShowToast('Please provide a name and website URL.');
      return;
    }

    const createdTool: ToolItem = {
      id: `tool-custom-${Date.now()}`,
      name: newName.trim(),
      tagline: newTagline.trim() || 'Exciting AI tool discovered by community',
      category: newCategory,
      url: newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`,
      icon: newIcon || '🤖',
      pricing: newPricing,
      rating: 4.8,
      upvotes: 1,
      isTrending: true,
      description: newDesc.trim() || newTagline.trim()
    };

    onAddCustomTool(createdTool);
    setShowSubmitModal(false);
    onShowToast(`🎉 ${createdTool.name} added to the AI Tools Radar!`);
    
    // reset form
    setNewName('');
    setNewTagline('');
    setNewUrl('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950 via-[#151a33] to-[#101426] border border-purple-800/40 shadow-xl">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated by Zubair WebsiteWala
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            AI Tools Radar 2026 🛠️
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Discover the highest-leverage AI coding environments, foundational reasoning models, autonomous agent frameworks, and generative design tools. Upvote your favorites or discuss them in community posts!
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              Submit an AI Tool
            </button>
            <span className="text-xs text-purple-300/80 font-medium">
              ⚡ {tools.length} Verified Tools in Directory
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111528]/80 border border-purple-900/30 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, category, or workflow..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151930] border border-purple-900/40 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'bg-[#151930] text-slate-300 hover:bg-[#1f2648]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map((tool) => {
          const isUpvoted = upvotedIds.includes(tool.id);
          const currentUpvotes = tool.upvotes + (isUpvoted ? 1 : 0);

          return (
            <div
              key={tool.id}
              className="bg-[#111528]/80 hover:bg-[#13172e] border border-purple-900/30 hover:border-purple-700/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-700/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.isTrending && (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-md">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> Hot
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-purple-400 font-medium">{tool.category}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] font-semibold text-emerald-400">{tool.pricing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Upvote Button */}
                  <button
                    onClick={() => handleUpvote(tool.id)}
                    className={`flex flex-col items-center justify-center min-w-[48px] py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isUpvoted
                        ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-600/30'
                        : 'bg-[#151930] hover:bg-purple-900/30 border-purple-900/40 text-slate-300 hover:text-purple-300'
                    }`}
                  >
                    <ChevronUp className={`w-4 h-4 ${isUpvoted ? 'stroke-[3]' : ''}`} />
                    <span>{currentUpvotes}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {tool.tagline}
                </p>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {tool.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-purple-900/20 text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tool.rating}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShareToolInPost(tool)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181d36] hover:bg-purple-600/30 text-purple-300 text-xs font-semibold transition-colors"
                    title="Write a review post with this tool attached"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Review in Post</span>
                  </button>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12 bg-[#111528]/80 border border-purple-900/30 rounded-2xl">
          <Wrench className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-300">No AI Tools found</h4>
          <p className="text-xs text-slate-500 mt-1">Try another search keyword or clear filters.</p>
        </div>
      )}

      {/* Submit Tool Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111528] border border-purple-800/40 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-bold text-white mb-1">Submit an AI Tool</h3>
            <p className="text-xs text-slate-400 mb-4">
              Share a tool you love with Zubair WebsiteWala and the community.
            </p>

            <form onSubmit={handleCreateTool} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tool Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. SuperAI Code"
                    className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Icon / Emoji</label>
                  <input
                    type="text"
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    placeholder="⚡"
                    className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Website URL</label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.ai"
                  className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Coding & IDEs">Coding & IDEs</option>
                    <option value="LLMs & Reasoning">LLMs & Reasoning</option>
                    <option value="Agents & Automation">Agents & Automation</option>
                    <option value="Design & Frontend">Design & Frontend</option>
                    <option value="Media & Voice">Media & Voice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pricing Model</label>
                  <select
                    value={newPricing}
                    onChange={(e) => setNewPricing(e.target.value as any)}
                    className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="Short, punchy one-liner of what it does"
                  className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Key features, standout abilities, and why builders should use it..."
                  rows={3}
                  className="w-full bg-[#151930] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-purple-900/30">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Add Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
