import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiMaximize, FiLayout, FiEdit3, FiDroplet, FiArrowRight, FiArrowLeft, FiAlertCircle, FiCheck } from 'react-icons/fi';

function RoomConfig() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [designName, setDesignName] = useState('');
  const [width, setWidth] = useState(5);
  const [length, setLength] = useState(5);
  const [shape, setShape] = useState('Rectangle');
  const [colorScheme, setColorScheme] = useState('#f8fafc'); 
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/designs/create', {
        designerId: user?.userId, // Added safe navigation
        designName,
        width: Number(width),
        length: Number(length),
        shape,
        colorScheme
      });

      navigate('/view-2d', { state: { designId: response.data.design._id, roomSpecs: response.data.design.roomSpecs } });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/designer-dashboard" 
          className="inline-flex items-center text-slate-500 hover:text-[#0a152d] font-bold mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        {/* Main Split Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Branding & Info (Luxury Dark Navy) */}
          <div className="md:w-5/12 bg-[#0a152d] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative Background Glows */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#eab308] to-transparent"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-lg backdrop-blur-sm">
                <FiLayout size={32} className="text-[#eab308]" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                Configure Room <br/><span className="text-[#eab308]">Dimensions</span>
              </h2>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-10">
                Precision is key. Enter the exact measurements and structural details of your client's space to ensure an accurate 2D layout and flawless 3D visualization.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-5">
                <div className="flex items-center">
                  <div className="bg-white/10 p-1.5 rounded-full text-[#eab308] mr-4 border border-white/5">
                    <FiCheck size={14} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Set precise width & length</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/10 p-1.5 rounded-full text-[#eab308] mr-4 border border-white/5">
                    <FiCheck size={14} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Define floor base color</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/10 p-1.5 rounded-full text-[#eab308] mr-4 border border-white/5">
                    <FiCheck size={14} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Seamless 2D to 3D transition</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="md:w-7/12 p-10 md:p-14 bg-white">
            
            <div className="mb-8 border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-bold text-[#0a152d]">Project Details</h3>
              <p className="text-slate-500 text-sm mt-1">Fill in the specifications to initialize the workspace.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start mb-8 animate-pulse">
                <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Design Name */}
              <div>
                <label className="block text-sm font-bold text-[#0a152d] mb-2 uppercase tracking-wide text-xs">Project / Design Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiEdit3 className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={designName} 
                    onChange={(e) => setDesignName(e.target.value)} 
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] placeholder-slate-400 focus:ring-2 focus:ring-[#0a152d] focus:border-[#0a152d] transition-all font-medium outline-none" 
                    placeholder="e.g., Ocean View Living Room" 
                  />
                </div>
              </div>

              {/* Dimensions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#0a152d] mb-2 uppercase tracking-wide text-xs">Width (Meters)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMaximize className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="number" 
                      min="1" 
                      step="0.1"
                      required 
                      value={width} 
                      onChange={(e) => setWidth(e.target.value)} 
                      className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] focus:ring-2 focus:ring-[#0a152d] focus:border-[#0a152d] transition-all font-bold outline-none" 
                    />
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-slate-400 font-bold">
                      m
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0a152d] mb-2 uppercase tracking-wide text-xs">Length (Meters)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMaximize className="h-5 w-5 text-slate-400 rotate-90" />
                    </div>
                    <input 
                      type="number" 
                      min="1" 
                      step="0.1"
                      required 
                      value={length} 
                      onChange={(e) => setLength(e.target.value)} 
                      className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] focus:ring-2 focus:ring-[#0a152d] focus:border-[#0a152d] transition-all font-bold outline-none" 
                    />
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-slate-400 font-bold">
                      m
                    </div>
                  </div>
                </div>
              </div>

              {/* Shape and Color Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#0a152d] mb-2 uppercase tracking-wide text-xs">Room Shape</label>
                  <div className="relative">
                    <select 
                      value={shape} 
                      onChange={(e) => setShape(e.target.value)} 
                      className="block w-full pl-5 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] focus:ring-2 focus:ring-[#0a152d] focus:border-[#0a152d] transition-all font-medium appearance-none cursor-pointer outline-none"
                    >
                      <option value="Rectangle">Rectangle / Square</option>
                      <option value="L-Shape">L-Shape (Coming Soon)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0a152d] mb-2 uppercase tracking-wide text-xs">Floor Base Color</label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus-within:ring-2 focus-within:ring-[#0a152d] transition-all">
                    <FiDroplet className="h-5 w-5 text-slate-400 ml-3 mr-3" />
                    <input 
                      type="color" 
                      value={colorScheme} 
                      onChange={(e) => setColorScheme(e.target.value)} 
                      className="h-10 w-full cursor-pointer bg-transparent border-0 rounded-lg p-0" 
                    />
                    <span className="ml-3 mr-4 font-mono text-sm text-slate-500 uppercase font-bold">{colorScheme}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`w-full flex items-center justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-xl text-white ${
                    loading ? 'bg-[#0a152d]/70 cursor-not-allowed' : 'bg-[#0a152d] hover:bg-[#15274d] hover:shadow-xl hover:shadow-[#0a152d]/20 hover:-translate-y-0.5'
                  } transition-all duration-300 outline-none`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Initializing Workspace...
                    </span>
                  ) : (
                    <>Initialize 2D Workspace <FiArrowRight className="ml-3" size={20} /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomConfig;