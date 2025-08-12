import React, { useState } from 'react';

const activitySelection = (acts) => {
  acts.sort((a,b)=>a.e - b.e);
  const res=[]; let last=-Infinity;
  for(const a of acts){ if(a.s>=last){ res.push(a); last=a.e; } }
  return res;
};

class HuffNode { constructor(ch,f,left=null,right=null){ this.ch=ch; this.f=f; this.left=left; this.right=right; } }
const buildHuffman = (s) => {
  const freq={}; for(const ch of s) freq[ch]=(freq[ch]||0)+1;
  let pq = Object.keys(freq).map(ch=>[freq[ch], new HuffNode(ch,freq[ch])]);
  pq.sort((a,b)=>a[0]-b[0]);
  while(pq.length>1){
    const a = pq.shift()[1]; const b = pq.shift()[1];
    const node = new HuffNode(null, a.f+b.f, a, b);
    pq.push([node.f, node]); pq.sort((x,y)=>x[0]-y[0]);
  }
  const root = pq[0][1];
  const codes = {};
  const dfs = (node, path) => {
    if(!node) return;
    if(node.ch) codes[node.ch]=path||'0';
    dfs(node.left, path+'0'); dfs(node.right, path+'1');
  };
  dfs(root, '');
  return codes;
};

export default function GreedyAlgorithms(){
  const [actsText, setActsText] = useState('1 2\n2 3\n3 4\n1 3\n2 5');
  const [selected, setSelected] = useState(null);
  const [huffText, setHuffText] = useState('this is an example for huffman encoding');
  const [codes, setCodes] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Activity Selection</h3>
          <textarea className="w-full h-40 border rounded p-2" value={actsText} onChange={e=>setActsText(e.target.value)} />
          <p className="text-sm text-gray-600 mt-2">Each line: <code>start end</code></p>
          <div className="mt-3"><button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={()=>{
            const acts = actsText.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{ const [s,e]=l.split(/[ ,]+/); return {s:Number(s), e:Number(e), raw:l}; });
            setSelected(activitySelection(acts));
          }}>Select</button></div>
          {selected && <div className="mt-3"><div>Chosen:</div><ul className="list-disc ml-6 mt-2">{selected.map((a,i)=><li key={i}>{a.raw}</li>)}</ul></div>}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Huffman (simplified)</h3>
          <input className="w-full border rounded p-2 mt-2" value={huffText} onChange={e=>setHuffText(e.target.value)} />
          <div className="mt-3"><button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={()=>setCodes(buildHuffman(huffText))}>Build</button></div>
          {codes && <pre className="mt-3 bg-gray-50 p-2 rounded">{JSON.stringify(codes,null,2)}</pre>}
        </div>
      </div>
    </div>
  );
}
