import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react'; // optional: install with `npm i lucide-react`

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Questions', path: '/questions' },
    { name: 'Upgrade', path: '/upgrade' },
    { name: 'How it Works?', path: '/how-it-works' },
  ];

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm relative'>
      {/* Logo */}
      <Link to="/" className="text-lg font-semibold">
        CourseGen
      </Link>

      {/* Desktop Nav */}
      <ul className='hidden md:flex gap-6'>
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === item.path ? 'text-blue-600' : ''
            }`}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Auth */}
      <div className="hidden md:block">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Burger Icon */}
      <button className="md:hidden" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 md:hidden">
          <ul className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-2 py-1 ${
                    path === item.path ? 'text-blue-600 font-semibold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
