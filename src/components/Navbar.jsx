import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link to={to} className={`px-3 py-2 rounded-md font-medium ${active ? 'bg-white/20' : 'hover:bg-white/10'}`}>
      {children}
    </Link>
  );
};

export default function Navbar(){
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-4 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-xl">AlgoQuest</div>
        <nav className="hidden md:flex gap-2">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/graph">Graph</NavLink>
          <NavLink to="/dp">DP</NavLink>
          <NavLink to="/strings">Strings</NavLink>
          <NavLink to="/greedy">Greedy</NavLink>
          <NavLink to="/segment">Segment</NavLink>
        </nav>
        <div className="md:hidden">
          <Link to="/" className="font-medium">Menu</Link>
        </div>
      </div>
    </div>
  );
}
