import React, { useState } from 'react';

const buildPrefix = (pat) => {
  const n = pat.length;
  const pi = Array(n).fill(0);
  const steps = [];
  for (let i = 1; i < n; i++) {
    let j = pi[i - 1];
    steps.push(`i=${i}, char=${pat[i]}, starting j=${j}`);
    while (j > 0 && pat[i] !== pat[j]) {
      steps.push(`  Mismatch at i=${i}, j=${j}, fallback to j=${pi[j - 1]}`);
      j = pi[j - 1];
    }
    if (pat[i] === pat[j]) {
      j++;
      steps.push(`  Match at i=${i}, increment j to ${j}`);
    }
    pi[i] = j;
    steps.push(`  pi[${i}] = ${j}`);
  }
  return { pi, steps };
};

const kmpSearch = (text, pat) => {
  const { pi, steps: prefixSteps } = buildPrefix(pat);
  const res = [];
  const searchSteps = [];
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    searchSteps.push(`Text[${i}] = ${text[i]}, Pattern[${j}]`);
    while (j > 0 && text[i] !== pat[j]) {
      searchSteps.push(`  Mismatch, fallback j=${pi[j - 1]}`);
      j = pi[j - 1];
    }
    if (text[i] === pat[j]) {
      j++;
      searchSteps.push(`  Match, j incremented to ${j}`);
    }
    if (j === pat.length) {
      res.push(i - j + 1);
      searchSteps.push(`  Pattern found at index ${i - j + 1}`);
      j = pi[j - 1];
    }
  }
  return { pi, res, prefixSteps, searchSteps };
};

const rabinKarp = (text, pat) => {
  const n = text.length, m = pat.length;
  if (m > n) return { res: [], hashSteps: [] };
  const base = 257, mod = 1000000007;
  let hp = 0, ht = 0, pow = 1;
  const hashSteps = [];

  // Initial hash computation
  for (let i = 0; i < m; i++) {
    hp = (hp * base + pat.charCodeAt(i)) % mod;
    ht = (ht * base + text.charCodeAt(i)) % mod;
    if (i) pow = (pow * base) % mod;
    hashSteps.push(`i=${i}: hp=${hp}, ht=${ht}`);
  }

  const res = [];
  for (let i = 0; i + m - 1 < n; i++) {
    if (hp === ht) {
      hashSteps.push(`Hash match at ${i}, verifying substring...`);
      if (text.substr(i, m) === pat) {
        res.push(i);
        hashSteps.push(`  Verified match at ${i}`);
      } else {
        hashSteps.push(`  False positive at ${i}`);
      }
    }
    if (i + m < n) {
      ht = (ht - text.charCodeAt(i) * pow) % mod;
      if (ht < 0) ht += mod;
      ht = (ht * base + text.charCodeAt(i + m)) % mod;
      hashSteps.push(`Slide window: remove ${text[i]}, add ${text[i + m]}, new ht=${ht}`);
    }
  }
  return { res, hashSteps };
};

export default function StringAlgorithms() {
  const [text, setText] = useState('abxabcabcaby');
  const [pat, setPat] = useState('abcaby');
  const [kmpRes, setKmpRes] = useState(null);
  const [rkRes, setRkRes] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* KMP */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">KMP</h3>
          <input
            className="w-full border rounded p-2 mt-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="w-full border rounded p-2 mt-2"
            value={pat}
            onChange={(e) => setPat(e.target.value)}
          />
          <div className="mt-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={() => setKmpRes(kmpSearch(text, pat))}
            >
              Run KMP
            </button>
          </div>
          {kmpRes && (
            <div className="mt-3 text-sm">
              <div>Matches: {kmpRes.res.length ? kmpRes.res.join(', ') : 'None'}</div>
              <div className="mt-2">Prefix Table: [{kmpRes.pi.join(', ')}]</div>
              <details className="mt-2">
                <summary className="cursor-pointer text-indigo-600">Prefix Table Steps</summary>
                <pre className="mt-1 bg-gray-50 p-2 rounded">{kmpRes.prefixSteps.join('\n')}</pre>
              </details>
              <details className="mt-2">
                <summary className="cursor-pointer text-indigo-600">Search Steps</summary>
                <pre className="mt-1 bg-gray-50 p-2 rounded">{kmpRes.searchSteps.join('\n')}</pre>
              </details>
            </div>
          )}
        </div>

        {/* Rabin–Karp */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Rabin-Karp</h3>
          <input
            className="w-full border rounded p-2 mt-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="w-full border rounded p-2 mt-2"
            value={pat}
            onChange={(e) => setPat(e.target.value)}
          />
          <div className="mt-3">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={() => setRkRes(rabinKarp(text, pat))}
            >
              Run RK
            </button>
          </div>
          {rkRes && (
            <div className="mt-3 text-sm">
              <div>Matches: {rkRes.res.length ? rkRes.res.join(', ') : 'None'}</div>
              <details className="mt-2">
                <summary className="cursor-pointer text-purple-600">Hashing Steps</summary>
                <pre className="mt-1 bg-gray-50 p-2 rounded">{rkRes.hashSteps.join('\n')}</pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
