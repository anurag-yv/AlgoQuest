import React, { useState } from 'react';

const knapsack01 = (weights, values, W) => {
  const n = weights.length;
  const dp = Array.from({length: n+1}, () => Array(W+1).fill(0));
  for (let i=1;i<=n;i++){
    for(let w=0;w<=W;w++){
      dp[i][w]=dp[i-1][w];
      if(weights[i-1] <= w) dp[i][w] = Math.max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1]);
    }
  }
  return {value: dp[n][W], dp};
};

const lcs = (A, B) => {
  const n=A.length, m=B.length;
  const dp = Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      if(A[i-1]===B[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  let i=n,j=m; const seq=[];
  while(i>0 && j>0){
    if(A[i-1]===B[j-1]) { seq.push(A[i-1]); i--; j--; }
    else if(dp[i-1][j] > dp[i][j-1]) i--; else j--;
  }
  return {length: dp[n][m], seq: seq.reverse().join(''), dp};
};

export default function DynamicProgramming(){
  const [wstr, setWstr] = useState('2,3,4,5');
  const [vstr, setVstr] = useState('3,4,5,6');
  const [cap, setCap] = useState(5);
  const [knap, setKnap] = useState(null);
  const [A, setA] = useState('AGGTAB');
  const [B, setB] = useState('GXTXAYB');
  const [lcsRes, setLcsRes] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">0/1 Knapsack</h3>
          <input className="w-full border rounded p-2 mt-2" value={wstr} onChange={e=>setWstr(e.target.value)} />
          <input className="w-full border rounded p-2 mt-2" value={vstr} onChange={e=>setVstr(e.target.value)} />
          <input type="number" className="w-full border rounded p-2 mt-2" value={cap} onChange={e=>setCap(Number(e.target.value))} />
          <div className="mt-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={()=>{
              const weights = wstr.split(',').map(x=>Number(x.trim()));
              const values = vstr.split(',').map(x=>Number(x.trim()));
              setKnap(knapsack01(weights, values, cap));
            }}>Solve</button>
          </div>
          {knap && <div className="mt-3"><div>Max Value: {knap.value}</div><pre className="mt-2 bg-gray-50 p-2 rounded max-h-48 overflow-auto">{knap.dp.map(r=>r.join('\t')).join('\n')}</pre></div>}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">LCS</h3>
          <input className="w-full border rounded p-2 mt-2" value={A} onChange={e=>setA(e.target.value)} />
          <input className="w-full border rounded p-2 mt-2" value={B} onChange={e=>setB(e.target.value)} />
          <div className="mt-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={()=>setLcsRes(lcs(A,B))}>Find LCS</button>
          </div>
          {lcsRes && <div className="mt-3"><div>Length: {lcsRes.length}</div><div>Sequence: <code>{lcsRes.seq}</code></div><pre className="mt-2 bg-gray-50 p-2 rounded max-h-48 overflow-auto">{lcsRes.dp.map(r=>r.join('\t')).join('\n')}</pre></div>}
        </div>
      </div>
    </div>
  );
}
