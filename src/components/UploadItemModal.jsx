import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { CATEGORIES, BRANDS, CONDITIONS } from '../mockData';
import { 
  X, 
  Upload, 
  Sparkles
} from 'lucide-react';

export const UploadItemModal = ({ onClose }) => {
  const { addItem, calculateSwapValue } = useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]); // Jackets & Coats
  const [brand, setBrand] = useState("Levi's");
  const [size, setSize] = useState('M');
  const [condition, setCondition] = useState('Good');
  const [originalRetail, setOriginalRetail] = useState('');
  const material = '100% Organic Cotton';
  const color = 'Denim Blue';
  const [swapPreferences, setSwapPreferences] = useState('Looking for winter wool coats, chunky knits or boots');
  const description = '';
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80');

  // Computed swap value
  const estimatedValue = calculateSwapValue(category, brand, condition, originalRetail);

  const handleSubmit = (e) => {
    e.preventDefault();

    addItem({
      title,
      category,
      brand,
      size,
      condition,
      conditionRating: condition === 'Brand New' ? 5 : condition === 'Like New' ? 5 : condition === 'Good' ? 4 : 3,
      material,
      color,
      swapPreferences,
      description: description || `Well maintained ${brand} ${category} in ${condition} condition. Ready to be re-loved.`,
      estimatedValue,
      images: [
        imageUrl || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
      ]
    });

    onClose();
  };

  // Preset mock photos for quick selection
  const samplePhotos = [
    { label: "Vintage Jacket", url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" },
    { label: "Cozy Knit Sweater", url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80" },
    { label: "Summer Dress", url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80" },
    { label: "Classic Boots", url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80" },
    { label: "Kommodo profile image", url: "https://kommodo.ai/i/nCVQW77YE79z3STRsVjc" }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }} className="animate-fade-in">
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        background: '#131926',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--text-muted)',
            padding: '4px'
          }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Upload size={20} color="var(--emerald-400)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>List a Garment for Swap</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Join the barter revolution. No commission fees, zero monetary transactions.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Garment Title */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              Item Title *
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Vintage Oversized Corduroy Overshirt"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Grid row: Category, Brand, Size */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                {CATEGORIES.filter(c => c !== 'All Categories').map(c => (
                  <option key={c} value={c} style={{ background: '#131926' }}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                {BRANDS.filter(b => b !== 'All Brands').map(b => (
                  <option key={b} value={b} style={{ background: '#131926' }}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                Size
              </label>
              <input 
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. M / 32 / 9 US"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Condition and Original Retail Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                Item Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond} style={{ background: '#131926' }}>{cond}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                Original Retail Price (INR ₹, optional)
              </label>
              <input 
                type="number"
                value={originalRetail}
                onChange={(e) => setOriginalRetail(e.target.value)}
                placeholder="e.g. 4500"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Automated Valuation Callout Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '14px',
            padding: '12px 16px',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="var(--emerald-400)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  Smart Barter Value Calculation:
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Algorithm evaluated: {brand} tier × {category} base × {condition} wear factor
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--emerald-400)' }}>
                ~₹{estimatedValue?.toLocaleString('en-IN')}
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Automated Parity</span>
            </div>
          </div>

          {/* Image Selection / URL */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              Image URL / Quick Presets:
            </label>
            <input 
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '10px',
                color: '#fff',
                fontSize: '0.85rem',
                marginBottom: '8px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {samplePhotos.map(p => (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => setImageUrl(p.url)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: imageUrl === p.url ? 'var(--emerald-500)' : 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontWeight: 500
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Swap Wishlist / Preferences */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              What would you like to swap this for?
            </label>
            <input 
              type="text"
              value={swapPreferences}
              onChange={(e) => setSwapPreferences(e.target.value)}
              placeholder="e.g. Denim jackets, vintage knitwear, or boots in size M/L"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="secondary-btn"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glow-btn"
              style={{ flex: 2 }}
            >
              Publish to Marketplace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
