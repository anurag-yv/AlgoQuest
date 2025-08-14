import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold">AlgoQuest</h1>
        <p className="mt-2 text-gray-700">
          Interactive toolkit demonstrating 5 competitive programming topics. Click a module to try.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Link to="/graph" className="p-4 rounded-lg bg-indigo-50">Graph Algorithms</Link>
          <Link to="/dp" className="p-4 rounded-lg bg-purple-50">Dynamic Programming</Link>
          <Link to="/strings" className="p-4 rounded-lg bg-pink-50">String Algorithms</Link>
          <Link to="/greedy" className="p-4 rounded-lg bg-amber-50">Greedy Algorithms</Link>
          <Link to="/segment" className="p-4 rounded-lg bg-green-50">Segment Tree</Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-semibold">About AlgoQuest</h3>
        <p className="mt-3 text-sm text-gray-700">
          AlgoQuest is an interactive learning platform designed to make complex algorithms 
          easier to understand through hands-on modules. Whether you’re a beginner exploring 
          algorithm basics or an experienced programmer preparing for competitive contests, 
          AlgoQuest offers a visual and engaging way to learn.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Each module includes step-by-step visualizations, explanations, and the ability to 
          run your own test cases. You can observe how algorithms process data in real time, 
          compare different approaches, and analyze time complexities — all within your browser.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          The goal is to turn theoretical learning into practical understanding, 
          helping you bridge the gap between knowing an algorithm and applying it effectively.
        </p>
      </div>
    </div>
  );
}
