import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { CATEGORIES, BRANDS, CONDITIONS } from '../mockData';
import { 
  Sparkles, 
  Scale,
  CheckCircle2
} from 'lucide-react';

export const CalculatorPage = ({ onOpenUploadModal }) => {
  const { calculateSwapValue } = useMarketplace();

  // Item A inputs
  const [catA, setCatA] = useState(CATEGORIES[1]);
  const [brandA, setBrandA] = useState("Levi's");
  const [condA, setCondA] = useState("Good");
  const [retailA, setRetailA] = useState(4500);

  // Item B inputs
  const [catB, setCatB] = useState(CATEGORIES[2]);
  const [brandB, setBrandB] = useState("Patagonia");
  const [condB, setCondB] = useState("Like New");
  const [retailB, setRetailB] = useState(5200);

  const valA = calculateSwapValue(catA, brandA, condA, retailA);
  const valB = calculateSwapValue(catB, brandB, condB, retailB);

  const difference = Math.abs(valA - valB);
  const ratio = Math.min(valA, valB) / Math.max(valA, valB);
  const isFair = difference <= 800 || ratio >= 0.75;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }} className="animate-fade-in">
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }} className="badge badge-emerald">
          <Scale size={14} /> Algorithmic Fair Trade Engine
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Swap Value & Fairness Calculator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          Calculate realistic barter exchange values based on brand tier, garment longevity, condition wear multipliers, and historical retail depreciation.
        </p>
      </div>

      {/* Main Dual Comparison Interface */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '2.5rem'
      }}>
        {/* Item A Card */}
        <div className="glass-panel" style={{ padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--emerald-400)', textTransform: 'uppercase' }}>
              Item A (Your Garment)
            </span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              ₹{valA.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 500 }}>est. barter value</span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Category</label>
              <select 
                value={catA} 
                onChange={(e) => setCatA(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              >
                {CATEGORIES.filter(c => c !== 'All Categories').map(c => <option key={c} value={c} style={{ background: '#131926' }}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Brand / Label</label>
              <select 
                value={brandA} 
                onChange={(e) => setBrandA(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              >
                {BRANDS.filter(b => b !== 'All Brands').map(b => <option key={b} value={b} style={{ background: '#131926' }}>{b}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Condition</label>
              <select 
                value={condA} 
                onChange={(e) => setCondA(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              >
                {CONDITIONS.map(c => <option key={c} value={c} style={{ background: '#131926' }}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Original Retail Price (₹)</label>
              <input 
                type="number"
                value={retailA}
                onChange={(e) => setRetailA(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Item B Card */}
        <div className="glass-panel" style={{ padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(20, 184, 166, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-500)', textTransform: 'uppercase' }}>
              Item B (Proposed Exchange)
            </span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              ₹{valB.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 500 }}>est. barter value</span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Category</label>
              <select 
                value={catB} 
                onChange={(e) => setCatB(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              >
                {CATEGORIES.filter(c => c !== 'All Categories').map(c => <option key={c} value={c} style={{ background: '#131926' }}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Brand / Label</label>
              <select 
                value={brandB} 
                onChange={(e) => setBrandB(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              >
                {BRANDS.filter(b => b !== 'All Brands').map(b => <option key={b} value={b} style={{ background: '#131926' }}>{b}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Condition</label>
              <select 
                value={condB} 
                onChange={(e) => setCondB(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              >
                {CONDITIONS.map(c => <option key={c} value={c} style={{ background: '#131926' }}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Original Retail Price (₹)</label>
              <input 
                type="number"
                value={retailB}
                onChange={(e) => setRetailB(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', color: '#fff' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fairness & Barter Parity Report Card */}
      <div className="glass-panel" style={{
        padding: '2rem',
        borderRadius: '20px',
        background: isFair 
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.05) 100%)' 
          : 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(244, 63, 94, 0.05) 100%)',
        border: `1px solid ${isFair ? 'rgba(16, 185, 129, 0.35)' : 'rgba(251, 191, 36, 0.35)'}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {isFair ? <CheckCircle2 size={24} color="var(--emerald-400)" /> : <Scale size={24} color="var(--amber-400)" />}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              {isFair ? 'Balanced & Equitable Barter Match' : 'Value Disparity Detected'}
            </h2>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
            {isFair ? (
              `Both items are in close parity with only a ₹${difference.toLocaleString('en-IN')} spread. This meets the platform's fair swap recommendation threshold (within ±25% margin). Users are highly encouraged to proceed directly to negotiation.`
            ) : (
              `There is a ₹${difference.toLocaleString('en-IN')} valuation gap between these items. Consider offering a 2-for-1 bundle, including accessories, or balancing the swap during the chat negotiation phase.`
            )}
          </p>
        </div>

        <div>
          <button 
            onClick={onOpenUploadModal}
            className="glow-btn"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} /> List My Item with This Valuation
          </button>
        </div>
      </div>
    </div>
  );
};
