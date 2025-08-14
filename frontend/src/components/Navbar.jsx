import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Leaf, Calculator, Info } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">SustainaMind</h2>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors duration-200 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/track-carbon" 
              className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors duration-200 font-medium"
            >
              <Calculator className="w-4 h-4" />
              <span>Track Carbon</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors duration-200 font-medium"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (hidden by default, would need state management to toggle) */}
        <div className="md:hidden border-t border-emerald-100 py-4 hidden">
          <nav className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-3 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/track-carbon" 
              className="flex items-center space-x-2 px-4 py-3 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium"
            >
              <Calculator className="w-4 h-4" />
              <span>Track Carbon</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-2 px-4 py-3 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}