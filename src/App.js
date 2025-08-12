import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import GraphAlgorithms from './pages/GraphAlgorithms';
import DynamicProgramming from './pages/DynamicProgramming';
import StringAlgorithms from './pages/StringAlgorithms';
import GreedyAlgorithms from './pages/GreedyAlgorithms';
import SegmentTreePage from './pages/SegmentTree';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph" element={<GraphAlgorithms />} />
            <Route path="/dp" element={<DynamicProgramming />} />
            <Route path="/strings" element={<StringAlgorithms />} />
            <Route path="/greedy" element={<GreedyAlgorithms />} />
            <Route path="/segment" element={<SegmentTreePage />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-sm text-gray-500">AlgoQuest — demo project</footer>
      </div>
    </BrowserRouter>
  );
}
