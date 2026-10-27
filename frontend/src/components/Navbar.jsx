import { BookOpen, UploadCloud, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="bg-amber-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Project BAYANI</h1>
          <p className="text-xs text-amber-200">Centralized Digital Repository & Local History CMS</p>
        </div>
        <nav className="flex gap-2">
          <button
            onClick={() => setActiveTab('repository')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'repository' ? 'bg-amber-800 shadow-inner' : 'hover:bg-amber-800/50'
            }`}
          >
            <BookOpen size={18} /> Public Repository
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'upload' ? 'bg-amber-800 shadow-inner' : 'hover:bg-amber-800/50'
            }`}
          >
            <UploadCloud size={18} /> Submit Manual
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'admin' ? 'bg-amber-800 shadow-inner' : 'hover:bg-amber-800/50'
            }`}
          >
            <ShieldCheck size={18} /> Admin Queue
          </button>
        </nav>
      </div>
    </header>
  );
}