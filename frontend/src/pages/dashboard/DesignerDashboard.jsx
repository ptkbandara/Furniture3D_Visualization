import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FiGrid, FiFolder, FiCreditCard, FiUser, FiHeadphones, FiLogOut, FiPlus, FiCheckCircle, FiEdit2 } from 'react-icons/fi';

function DesignerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  useEffect(() => {
    const fetchDesigns = async () => {
      if (user && user.userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/designs/designer/${user.userId}`);
          setDesigns(response.data);
        } catch (error) {
          console.error("Error fetching designs:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDesigns();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const StatusBadge = ({ status }) => {
    return (
      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <FiCheckCircle className="mr-1.5" size={14} /> {status}
      </span>
    );
  };

  
  const handleEditDesign = (design) => {
    navigate('/view-2d', { 
      state: { 
        designId: design._id, 
        roomSpecs: design.roomSpecs,
        furniture: design.furniture || [] 
      } 
    });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {/* Dark Sidebar */}
      <div className="w-64 bg-[#0a152d] text-white flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-lg font-bold tracking-widest text-white">FURNITURE 3D</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/designer-dashboard" className="flex items-center px-4 py-3 bg-white/10 border-l-4 border-blue-500 text-white rounded-r-lg font-medium transition-all">
            <FiGrid className="mr-3 text-red-400" size={18} /> Dashboard
          </Link>
          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiFolder className="mr-3 text-blue-400" size={18} /> My Designs
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiCreditCard className="mr-3 text-cyan-400" size={18} /> Payments
          </a>
          <Link to="/profile" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiUser className="mr-3 text-purple-400" size={18} /> Profile
          </Link>
          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiHeadphones className="mr-3 text-pink-400" size={18} /> Support
          </a>
        </nav>

        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors shadow-sm"
          >
            <FiLogOut className="mr-2" size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-[#0a152d] text-white flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-6 text-sm font-semibold">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold ml-4 border-2 border-slate-300">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 md:p-10">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0a152d] mb-2 flex items-center justify-center">
              Welcome back, {user?.name || 'Designer'} <span className="ml-2 text-2xl">👋</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Here's a quick look at your recent 3D designs and account activity.
            </p>
          </div>

          {/* 4 Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            <div 
              onClick={() => navigate('/room-config')}
              className="bg-[#1e293b] rounded-xl p-6 text-white shadow-lg cursor-pointer hover:bg-[#0f172a] transition-colors flex flex-col justify-center items-center text-center"
            >
              <h3 className="font-bold text-lg mb-1 flex items-center">
                <FiPlus className="mr-2" size={20} /> Create New
              </h3>
              <p className="text-slate-400 text-sm">Start a 2D/3D Room Layout</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
              <h3 className="font-bold text-[#0a152d] text-lg mb-1">Recent Design</h3>
              <p className="text-slate-500 text-sm truncate w-full">
                {designs.length > 0 ? designs[0].designName : 'No projects yet'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
              <h3 className="font-bold text-[#0a152d] text-lg mb-1">Total Projects</h3>
              <p className="text-slate-500 text-sm">{designs.length} Designs saved</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
              <h3 className="font-bold text-[#0a152d] text-lg mb-1">Client Meetings</h3>
              <p className="text-slate-500 text-sm">1 active request</p>
            </div>
          </div>

          {/* DYNAMIC DATA TABLE SECTION */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#0a152d] font-serif tracking-tight">Your Recent Designs</h2>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                View All Projects
              </button>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                    <th className="py-4 px-6">Design Name</th>
                    <th className="py-4 px-6">Client / Location</th>
                    <th className="py-4 px-6">Created Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-500">
                        <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading your workspace projects...
                      </td>
                    </tr>
                  ) : designs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-500">
                        No designs found in the database. Click "Create New" to start!
                      </td>
                    </tr>
                  ) : (
                    designs.map((design, index) => (
                      <tr 
                        key={design._id} 
                        onClick={() => handleEditDesign(design)}
                        className={`hover:bg-blue-50/50 cursor-pointer group transition-colors ${index !== designs.length - 1 ? "border-b border-slate-100" : ""}`}
                      >
                        <td className="py-5 px-6 text-[#0a152d] font-bold text-base group-hover:text-blue-600 transition-colors">
                          {design.designName}
                        </td>
                        <td className="py-5 px-6 text-slate-500">
                          {design.roomSpecs?.width}m × {design.roomSpecs?.length}m Room
                        </td>
                        <td className="py-5 px-6 text-slate-500">{formatDate(design.createdAt)}</td>
                        <td className="py-5 px-6">
                          <StatusBadge status="Confirmed" />
                        </td>
                        <td className="py-5 px-6 text-right">
                          {/* Edit Button */}
                          <button className="inline-flex items-center px-3 py-1.5 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <FiEdit2 className="mr-1.5" /> Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default DesignerDashboard;