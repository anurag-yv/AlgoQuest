import React, { useState, useEffect } from 'react';

class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.size = 1;
    while (this.size < this.n) this.size <<= 1;
    this.tree = Array(2 * this.size).fill(0);
    this.lazy = Array(2 * this.size).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.size + i] = arr[i];
    for (let i = this.size - 1; i >= 1; i--)
      this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
  }
  _apply(node, nl, nr, val) {
    this.tree[node] += (nr - nl + 1) * val;
    this.lazy[node] += val;
  }
  _push(node, nl, nr) {
    if (this.lazy[node] !== 0 && node < this.size) {
      const mid = Math.floor((nl + nr) / 2);
      this._apply(2 * node, nl, mid, this.lazy[node]);
      this._apply(2 * node + 1, mid + 1, nr, this.lazy[node]);
      this.lazy[node] = 0;
    }
  }
  _update(node, nl, nr, l, r, val) {
    if (l > nr || r < nl) return;
    if (l <= nl && nr <= r) {
      this._apply(node, nl, nr, val);
      return;
    }
    this._push(node, nl, nr);
    const mid = Math.floor((nl + nr) / 2);
    this._update(2 * node, nl, mid, l, r, val);
    this._update(2 * node + 1, mid + 1, nr, l, r, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }
  update(l, r, val) {
    this._update(1, 0, this.size - 1, l, r, val);
  }
  _query(node, nl, nr, l, r) {
    if (l > nr || r < nl) return 0;
    if (l <= nl && nr <= r) return this.tree[node];
    this._push(node, nl, nr);
    const mid = Math.floor((nl + nr) / 2);
    return (
      this._query(2 * node, nl, mid, l, r) +
      this._query(2 * node + 1, mid + 1, nr, l, r)
    );
  }
  query(l, r) {
    return this._query(1, 0, this.size - 1, l, r);
  }
}

export default function SegmentTreePage() {
  const [arrStr, setArrStr] = useState('1,2,3,4,5');
  const [seg, setSeg] = useState(null);
  const [lq, setLq] = useState(0);
  const [rq, setRq] = useState(2);
  const [ul, setUl] = useState(1);
  const [ur, setUr] = useState(3);
  const [uv, setUv] = useState(10);
  const [last, setLast] = useState(null);

  useEffect(() => {
    const arr = arrStr.split(',').map((x) => Number(x.trim()));
    setSeg(new SegmentTree(arr));
  }, [arrStr]);

  // Function to build visual tree structure
  const renderSegmentTreeStructure = () => {
    if (!seg) return null;
    const levels = [];
    let levelSize = 1;
    let index = 1;
    while (index < 2 * seg.size) {
      const levelNodes = [];
      for (let i = 0; i < levelSize && index < 2 * seg.size; i++) {
        levelNodes.push(seg.tree[index]);
        index++;
      }
      levels.push(levelNodes);
      levelSize *= 2;
    }
    return (
      <div className="space-y-2">
        {levels.map((lvl, i) => (
          <div key={i} className="flex justify-center gap-2">
            {lvl.map((val, j) => (
              <div
                key={j}
                className="px-3 py-1 bg-indigo-50 border rounded shadow text-sm"
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Function to show Lazy Propagation flow
  const renderLazyPropagationFlow = () => {
    return (
      <div className="flex flex-col items-center text-sm space-y-2">
        <div className="px-3 py-1 bg-green-50 border rounded shadow">
          Update/Query Request
        </div>
        <div>⬇</div>
        <div className="px-3 py-1 bg-blue-50 border rounded shadow">
          Check range overlap
        </div>
        <div>⬇</div>
        <div className="px-3 py-1 bg-yellow-50 border rounded shadow">
          If full overlap → Apply update and mark lazy
        </div>
        <div>⬇</div>
        <div className="px-3 py-1 bg-purple-50 border rounded shadow">
          Push lazy values to children when needed
        </div>
        <div>⬇</div>
        <div className="px-3 py-1 bg-pink-50 border rounded shadow">
          Recalculate parent node values
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Build Tree</h3>
          <input
            className="w-full border rounded p-2 mt-2"
            value={arrStr}
            onChange={(e) => setArrStr(e.target.value)}
          />
          <p className="text-sm text-gray-600 mt-2">Array (comma separated)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">Query / Update</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              className="border rounded p-2"
              value={lq}
              onChange={(e) => setLq(Number(e.target.value))}
            />
            <input
              type="number"
              className="border rounded p-2"
              value={rq}
              onChange={(e) => setRq(Number(e.target.value))}
            />
          </div>
          <div className="mt-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={() => {
                if (!seg) return;
                setLast(seg.query(lq, rq));
              }}
            >
              Query
            </button>
          </div>

          <hr className="my-3" />

          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              className="border rounded p-2"
              value={ul}
              onChange={(e) => setUl(Number(e.target.value))}
            />
            <input
              type="number"
              className="border rounded p-2"
              value={ur}
              onChange={(e) => setUr(Number(e.target.value))}
            />
            <input
              type="number"
              className="border rounded p-2"
              value={uv}
              onChange={(e) => setUv(Number(e.target.value))}
            />
          </div>
          <div className="mt-3">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={() => {
                if (!seg) return;
                seg.update(ul, ur, uv);
              }}
            >
              Update
            </button>
          </div>

          {last !== null && <div className="mt-3">Last Query: {last}</div>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">
          Segment Tree Structure for Array
        </h3>
        {renderSegmentTreeStructure()}
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">
          Lazy Propagation Flow Diagram
        </h3>
        {renderLazyPropagationFlow()}
      </div>
    </div>
  );
}
