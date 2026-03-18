import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiUser, FiLock, FiLogIn, FiArrowRight, FiAlertCircle } from 'react-icons/fi'; // FiUser import kala

function Login() {
  const [username, setUsername] = useState(''); // Email wenuwata username damma
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Backend ekata username ekai password ekai yawanawa
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
      login({ userId: response.data.userId, name: response.data.name });
      
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Login Container (Split Screen) */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Left Side: Login Form */}
        <div className="p-12 md:p-20 flex flex-col justify-center">
          
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                <FiLogIn size={32} />
              </div>
              <FiArrowRight size={24} className="text-slate-300" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-md">
              Sign in to manage your 3D design portfolio and collaborate with clients.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center mb-8">
              <FiAlertCircle className="text-red-500 mr-3" size={20} />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="username">
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
                  className="appearance-none block w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  placeholder="designer123"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
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
                  className="appearance-none block w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Create one now
              </Link>
            </p>
          </div>

        </div>
        
        {/* Right Side: Professional Image */}
        <div className="relative hidden md:block bg-slate-900">
          <img 
            src="https://cdn.prod.website-files.com/5894a32730554b620f7bf36d/64c4bce7a124713eea88c821_Leveraging%203D%20Visualization%20to%20Bring%20Your%20Furniture%20and%20Interior%20Designs%20to%20Life.webp"
            alt="Professional Interior Visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute bottom-16 left-16 right-16 text-white p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20">
            <h4 className="text-2xl font-bold mb-3 tracking-tight">Transforming Spaces. One Room at a Time.</h4>
            <p className="text-slate-100 text-base font-medium leading-relaxed max-w-sm">Bring your client's vision to life with realistic 2D layouts and instant 3D rendering. Professional design visualization software for in-store consultants.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;