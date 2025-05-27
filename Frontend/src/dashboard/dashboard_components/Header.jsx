import React from 'react';
import { useLocation, Link } from 'react-router-dom';


function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      {/* Use regular img instead of next/image */}
      {/* <img src="/CourseGenLogo.png" width="160" height="50" alt="appimg" /> */}
      
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'text-primary' : ''}`}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/Questions' ? 'text-primary' : ''}`}>
          <Link to="/dashboard/Questions">Questions</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/Upgrade' ? 'text-primary' : ''}`}>
          <Link to="/dashboard/Upgrade">Upgrade</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/HowitWorks' ? 'text-primary' : ''}`}>
          <Link to="/dashboard/HowitWorks">How it Works?</Link>
        </li>
      </ul>

      <div>loginlogo</div>
    </div>
  );
}

export default Header;
