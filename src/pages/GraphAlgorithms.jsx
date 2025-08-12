import React, { useState, useEffect } from 'react';

function parseEdges(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const edges = [];
  for (const line of lines) {
    const parts = line.split(/[ ,]+/).map(x => x.trim());
    if (parts.length >= 2) {
      const u = parts[0]; const v = parts[1];
      const w = parts.length >= 3 ? parseFloat(parts[2]) : 1;
      edges.push([u, v, w]);
    }
  }
  return edges;
}
function buildAdj(edges) {
  const adj = {};
  for (const [u,v,w] of edges) {
    if (!adj[u]) adj[u] = [];
    if (!adj[v]) adj[v] = [];
    adj[u].push([v,w]); adj[v].push([u,w]);
  }
  return adj;
}
const bfs = (adj, start) => {
  const q = [start]; const dist = {[start]:0}; const parent = {[start]:null}; const order = []; const vis = new Set([start]);
  while (q.length) {
    const u = q.shift(); order.push(u);
    for (const [v] of adj[u] || []) {
      if (!vis.has(v)) { vis.add(v); parent[v]=u; dist[v]=dist[u]+1; q.push(v); }
    }
  }
  return {order, dist, parent};
};
class MinHeap { constructor(){this.a=[];} push(x){this.a.push(x); this._siftUp(this.a.length-1);} pop(){ if(!this.a.length) return null; const t=this.a[0]; const last=this.a.pop(); if(this.a.length){this.a[0]=last; this._siftDown(0);} return t;} _siftUp(i){while(i>0){const p=Math.floor((i-1)/2); if(this.a[p][0]<=this.a[i][0]) break; [this.a[p],this.a[i]]=[this.a[i],this.a[p]]; i=p;}} _siftDown(i){const n=this.a.length; while(true){let l=2*i+1, r=2*i+2, s=i; if(l<n && this.a[l][0]<this.a[s][0]) s=l; if(r<n && this.a[r][0]<this.a[s][0]) s=r; if(s===i) break; [this.a[i],this.a[s]]=[this.a[s],this.a[i]]; i=s;}}
}const dijkstra = (adj, start) => {
  const dist = {}; for(const k in adj) dist[k]=Infinity;
  dist[start]=0; const heap=new MinHeap(); heap.push([0,start]);
  const parent={};
  while(true){
    const cur = heap.pop(); if(!cur) break; const [d,u]=cur; if(d!==dist[u]) continue;
    for(const [v,w] of adj[u] || []) {
      if(dist[v] > dist[u] + w) { dist[v] = dist[u] + w; parent[v]=u; heap.push([dist[v], v]); }
    }
  }
  return {dist, parent};
};

export default function GraphAlgorithms(){
  const [text, setText] = useState('A B 1\nB C 2\nA C 4\nC D 1');
  const [edges, setEdges] = useState([]);
  const [adj, setAdj] = useState({});
  const [start, setStart] = useState('A');
  const [bfsRes, setBfsRes] = useState(null);
  const [dijRes, setDijRes] = useState(null);

  useEffect(()=>{ const e=parseEdges(text); setEdges(e); setAdj(buildAdj(e)); }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Graph Input</h3>
          <textarea className="w-full h-40 border rounded p-2" value={text} onChange={e=>setText(e.target.value)} />
          <p className="text-sm text-gray-600 mt-2">Each line: <code>u v w</code> (weight optional)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Controls</h3>
          <input className="w-full border rounded p-2" value={start} onChange={e=>setStart(e.target.value)} />
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={()=>setBfsRes(bfs(adj, start))}>Run BFS</button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={()=>setDijRes(dijkstra(adj, start))}>Run Dijkstra</button>
          </div>
          <div className="mt-3 text-sm text-gray-700">Nodes: {Object.keys(adj).join(', ') || '—'}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-medium">BFS Result</h4>
          {bfsRes ? <div><div className="mt-2">Order: {bfsRes.order.join(', ')}</div><pre className="mt-2 bg-gray-50 p-2 rounded">{JSON.stringify(bfsRes.dist,null,2)}</pre></div> : <div className="text-gray-500">Run BFS</div>}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-medium">Dijkstra Result</h4>
          {dijRes ? <pre className="mt-2 bg-gray-50 p-2 rounded">{JSON.stringify(dijRes.dist,null,2)}</pre> : <div className="text-gray-500">Run Dijkstra</div>}
        </div>
      </div>
    </div>
  );
}
