import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiLock, FiUserPlus, FiAlertCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        username,
        password
      });

      
      setSuccess(response.data.message + ' Redirecting to login...');
      
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Container (Split Screen) */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Left Side: Register Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-[#0a152d] text-[#eab308] rounded-2xl flex items-center justify-center shadow-md border border-[#eab308]/20">
                <FiUserPlus size={32} />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-[#0a152d] tracking-tight font-serif mb-3">
              Create an Account
            </h2>
            <p className="text-lg text-slate-500 max-w-md">
              Join as an in-store designer and start building professional 3D rooms for your clients.
            </p>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start mb-8 animate-pulse">
              <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg flex items-start mb-8 animate-pulse">
              <FiCheckCircle className="text-emerald-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
              <p className="text-sm text-emerald-700 font-medium">{success}</p>
            </div>
          )}

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a152d] focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a152d] focus:border-transparent transition-all duration-200"
                  placeholder="designer123"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0a152d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a152d] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || success} 
                className={`w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white ${
                  isLoading || success
                    ? 'bg-[#0a152d]/60 cursor-not-allowed' 
                    : 'bg-[#0a152d] hover:bg-slate-800 hover:shadow-xl hover:shadow-[#0a152d]/20 hover:-translate-y-0.5'
                } transition-all duration-300 outline-none`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Create Account <FiArrowRight className="ml-2" />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#eab308] hover:text-yellow-600 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

        </div>

        {/* Right Side: Professional Luxury Image */}
        <div className="relative hidden md:block bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Luxury Interior Visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a152d]/60 mix-blend-multiply"></div>
          
          {/* Floating Branding on Image */}
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h4 className="text-3xl font-serif font-bold mb-4 text-[#eab308]">Elevate Your Consultations.</h4>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
                Join the platform trusted by top furniture retailers. Design stunning 2D floor plans and instant 3D renders that help customers visualize their dream spaces.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;