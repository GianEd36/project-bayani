import { useState } from 'react';
import Navbar from './components/Navbar';
import { initialResources } from './data/mockData';
import { Search, CheckCircle, XCircle, FileText, PlusCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('repository');
  const [resources, setResources] = useState(initialResources);
  
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedBarangay, setSelectedBarangay] = useState('All');

  // New Upload Form State
  const [form, setForm] = useState({
    title: '', description: '', author: '', chronologicalEra: 'Spanish Era', barangay: 'Binalonan Proper', localHero: ''
  });

  // Filter logic for public repository
  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEra = selectedEra === 'All' || res.chronologicalEra === selectedEra;
    const matchesBarangay = selectedBarangay === 'All' || res.barangay === selectedBarangay;
    return matchesSearch && matchesEra && matchesBarangay && res.status === 'approved';
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      ...form,
      fileType: 'pdf',
      status: 'pending' // goes to admin queue for verification
    };
    setResources([newEntry, ...resources]);
    alert('Manual submitted successfully! It is now pending coordinator review.');
    setForm({ title: '', description: '', author: '', chronologicalEra: 'Spanish Era', barangay: 'Binalonan Proper', localHero: '' });
    setActiveTab('admin'); // switch to admin to show them the pending item!
  };

  const handleApprove = (id) => {
    setResources(resources.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleReject = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* TAB 1: REPOSITORY CATALOG */}
        {activeTab === 'repository' && (
          <div>
            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <h2 className="text-xl font-bold mb-4 text-amber-900">Search Historical Archives</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-stone-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search keywords, titles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white"
                >
                  <option value="All">All Chronological Eras</option>
                  <option value="Pre-Colonial / Indigenous">Pre-Colonial / Indigenous</option>
                  <option value="Spanish Era">Spanish Era</option>
                  <option value="World War II">World War II</option>
                </select>
                <select
                  value={selectedBarangay}
                  onChange={(e) => setSelectedBarangay(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white"
                >
                  <option value="All">All Barangays</option>
                  <option value="Binalonan Proper">Binalonan Proper</option>
                  <option value="Palina East">Palina East</option>
                  <option value="San Pablo">San Pablo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length === 0 ? (
                <p className="text-stone-500 col-span-full text-center py-12">No approved historical manuals match your filters.</p>
              ) : (
                filteredResources.map(res => (
                  <div key={res.id} className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">{res.chronologicalEra}</span>
                        <span className="text-xs text-stone-500">{res.barangay}</span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-800 mb-2">{res.title}</h3>
                      <p className="text-sm text-stone-600 mb-4">{res.description}</p>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center text-xs text-stone-500">
                      <span>Author: {res.author}</span>
                      <button className="text-amber-700 font-medium hover:underline flex items-center gap-1">
                        <FileText size={14} /> View PDF
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: UPLOAD PORTAL */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <h2 className="text-2xl font-bold mb-2 text-amber-900">Submit Local History Manual</h2>
            <p className="text-sm text-stone-600 mb-6">Contribute peer-reviewed historical write-ups or multimedia assets for district-wide verification.</p>
            
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Manual Title</label>
                <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Oral History of Binalonan..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author / Historian</label>
                  <input required type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Juan Dela Cruz" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chronological Era</label>
                  <select value={form.chronologicalEra} onChange={e => setForm({...form, chronologicalEra: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white">
                    <option value="Pre-Colonial / Indigenous">Pre-Colonial / Indigenous</option>
                    <option value="Spanish Era">Spanish Era</option>
                    <option value="World War II">World War II</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Barangay Metric</label>
                  <input required type="text" value={form.barangay} onChange={e => setForm({...form, barangay: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Palina East" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Local Hero / Key Figure</label>
                  <input type="text" value={form.localHero} onChange={e => setForm({...form, localHero: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Capt. Carlos Palina" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description / Summary</label>
                <textarea required rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Brief summary of historical contents..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload PDF / Document File</label>
                <input required type="file" className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
              </div>
              <button type="submit" className="w-full bg-amber-900 text-white py-3 rounded-lg font-medium hover:bg-amber-800 transition flex items-center justify-center gap-2">
                <PlusCircle size={18} /> Submit to Verification Queue
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ADMIN VERIFICATION QUEUE */}
        {activeTab === 'admin' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h2 className="text-xl font-bold mb-4 text-amber-900">Admin Verification Queue</h2>
            <p className="text-sm text-stone-600 mb-6">Review, verify, and approve submitted instructional materials before publication.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-stone-50 text-xs text-stone-500 uppercase">
                    <th className="p-3">Title & Author</th>
                    <th className="p-3">Era & Barangay</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {resources.filter(r => r.status === 'pending').length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-stone-500">No pending submissions in the queue. Try submitting a manual from the "Submit Manual" tab!</td>
                    </tr>
                  ) : (
                    resources.filter(r => r.status === 'pending').map(item => (
                      <tr key={item.id} className="hover:bg-stone-50">
                        <td className="p-3">
                          <p className="font-bold text-stone-800">{item.title}</p>
                          <p className="text-xs text-stone-500">By {item.author}</p>
                        </td>
                        <td className="p-3">
                          <p className="text-stone-700">{item.chronologicalEra}</p>
                          <p className="text-xs text-stone-500">{item.barangay}</p>
                        </td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Pending Review</span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => handleApprove(item.id)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium inline-flex items-center gap-1">
                            <CheckCircle size={14} /> Approve
                          </button>
                          <button onClick={() => handleReject(item.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium inline-flex items-center gap-1">
                            <XCircle size={14} /> Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}