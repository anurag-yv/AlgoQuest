import React, { useState } from 'react';

const buildPrefix = (pat) => {
  const n = pat.length; const pi = Array(n).fill(0);
  for(let i=1;i<n;i++){
    let j = pi[i-1];
    while(j>0 && pat[i]!==pat[j]) j = pi[j-1];
    if(pat[i]===pat[j]) j++;
    pi[i]=j;
  }
  return pi;
};
const kmpSearch = (text, pat) => {
  const pi = buildPrefix(pat); const res = []; let j=0;
  for(let i=0;i<text.length;i++){
    while(j>0 && text[i]!==pat[j]) j = pi[j-1];
    if(text[i]===pat[j]) j++;
    if(j===pat.length) { res.push(i-j+1); j = pi[j-1]; }
  }
  return {pi, res};
};
const rabinKarp = (text, pat) => {
  const n=text.length, m=pat.length; if(m>n) return {res:[]};
  const base=257, mod=1000000007;
  let hp=0, ht=0, pow=1;
  for(let i=0;i<m;i++){ hp=(hp*base + pat.charCodeAt(i))%mod; ht=(ht*base + text.charCodeAt(i))%mod; if(i) pow=(pow*base)%mod; }
  const res=[];
  for(let i=0;i+m-1<n;i++){
    if(hp===ht){ if(text.substr(i,m)===pat) res.push(i); }
    if(i+m<n){ ht = (ht - text.charCodeAt(i)*pow)%mod; if(ht<0) ht+=mod; ht = (ht*base + text.charCodeAt(i+m))%mod; }
  }
  return {res};
};

export default function StringAlgorithms(){
  const [text, setText] = useState('abxabcabcaby');
  const [pat, setPat] = useState('abcaby');
  const [kmpRes, setKmpRes] = useState(null);
  const [rkRes, setRkRes] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">KMP</h3>
          <input className="w-full border rounded p-2 mt-2" value={text} onChange={e=>setText(e.target.value)} />
          <input className="w-full border rounded p-2 mt-2" value={pat} onChange={e=>setPat(e.target.value)} />
          <div className="mt-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={()=>setKmpRes(kmpSearch(text,pat))}>Run KMP</button>
          </div>
          {kmpRes && <div className="mt-3"><div>Matches: {kmpRes.res.length? kmpRes.res.join(', '): 'None'}</div><div className="mt-2 text-sm text-gray-600">Prefix: [{kmpRes.pi.join(', ')}]</div></div>}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Rabin-Karp</h3>
          <input className="w-full border rounded p-2 mt-2" value={text} onChange={e=>setText(e.target.value)} />
          <input className="w-full border rounded p-2 mt-2" value={pat} onChange={e=>setPat(e.target.value)} />
          <div className="mt-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={()=>setRkRes(rabinKarp(text,pat))}>Run RK</button>
          </div>
          {rkRes && <div className="mt-3">Matches: {rkRes.res.length? rkRes.res.join(', '): 'None'}</div>}
        </div>
      </div>
    </div>
  );
}
