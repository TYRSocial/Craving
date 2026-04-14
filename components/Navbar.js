'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/feed', label: 'Feed', icon: '📺' },
    { href: '/create-post', label: 'Create', icon: '✨' },
    { href: '/mood-recommendations', label: 'Mood', icon: '😊' },
    { href: '/nearby-restaurants', label: 'Nearby', icon: '🗺️' },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20 backdrop-blur-xl sticky top-0 z-50 shadow-xl shadow-purple-500/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-300 hover:to-purple-300 transition">
          <span className="text-3xl">🍽️</span>
          <span className="hidden sm:inline">A Craving</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-semibold">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-purple-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-white">{user.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-20 right-4 bg-gradient-to-b from-slate-800 to-slate-700 shadow-xl shadow-purple-500/20 rounded-2xl p-4 md:hidden space-y-2 w-64 border border-purple-500/20 backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-semibold">{link.label}</span>
              </Link>
            ))}
            
            {user && (
              <>
                <div className="border-t border-purple-500/20 pt-4 mt-4">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center font-bold text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition font-bold mt-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
