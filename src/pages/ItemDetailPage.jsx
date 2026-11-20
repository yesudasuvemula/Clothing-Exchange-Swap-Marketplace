import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowRightLeft, 
  Heart, 
  Clock, 
  Package
} from 'lucide-react';

export const ItemDetailPage = ({ item, onBack, onOpenSwapModal }) => {
  const { currentUser, items } = useMarketplace();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!item) return null;

  const isOwner = item.ownerId === currentUser.id;

  // Find similar items or recommended swap matches
  const potentialMatches = items.filter(
    i => i.id !== item.id && 
         i.status === 'available' && 
         Math.abs(i.estimatedValue - item.estimatedValue) <= 25
  ).slice(0, 3);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }} className="animate-fade-in">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="secondary-btn"
        style={{ marginBottom: '1.5rem', padding: '8px 14px' }}
      >
        <ArrowLeft size={16} /> Back to Wardrobes
      </button>

      {/* Main Detail Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        {/* Left: Photos & Gallery */}
        <div>
          <div style={{
            width: '100%',
            height: '460px',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            background: '#131926',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1rem'
          }}>
            <img 
              src={item.images[activeImageIndex] || item.images[0]} 
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(11, 15, 23, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={16} color="var(--emerald-400)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                Estimated Swap Value: ~₹{item.estimatedValue?.toLocaleString('en-IN')}
              </span>
            </div>

            <button 
              onClick={() => setLiked(!liked)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(11, 15, 23, 0.7)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: liked ? '#f43f5e' : '#fff'
              }}
            >
              <Heart size={20} fill={liked ? '#f43f5e' : 'none'} />
            </button>
          </div>

          {/* Image Thumbnails */}
          {item.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {item.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: activeImageIndex === idx ? '2px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
                    opacity: activeImageIndex === idx ? 1 : 0.6
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}

          {/* Sustainability impact card */}
          <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Package size={24} color="var(--emerald-400)" />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Circular Fashion Metric</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Swapping this garment prevents approx. <strong>12.5 kg CO₂ emissions</strong> and saves <strong>2,700 liters</strong> of water compared to manufacturing a new piece.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Item Specs & Swap Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">{item.category}</span>
            <span className="badge badge-emerald">{item.condition}</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
              {item.gender || 'Unisex'}
            </span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.25 }}>
            {item.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
            paddingBottom: '1.2rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              <MapPin size={16} color="var(--emerald-400)" />
              {item.location} ({item.distanceKm} km away)
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-dim)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              <Clock size={16} />
              Listed on {item.createdAt}
            </div>
          </div>

          {/* Garment Attributes Table */}
          <div className="glass-panel" style={{ padding: '1.2rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '10px', letterSpacing: '0.05em' }}>
              Garment Specifications
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Brand</span>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff', margin: 0 }}>{item.brand}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Size</span>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff', margin: 0 }}>{item.size}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Material</span>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff', margin: 0 }}>{item.material || 'Premium Fabric'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Color</span>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff', margin: 0 }}>{item.color || 'Multi'}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Item Story & Fit Notes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>

          {/* Owner Swap Wishlist */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '14px',
            padding: '1.2rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowRightLeft size={16} /> What the Owner Wants to Swap For:
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#e2e8f0', margin: 0 }}>
              {item.swapPreferences || "Open to fair value trades in similar categories (sweaters, coats, boots)."}
            </p>
          </div>

          {/* Owner Profile Card */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={item.ownerAvatar} alt={item.ownerName} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{item.ownerName}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified Wardrobe • 4.9 ★ (14 swaps)</div>
              </div>
            </div>
            <span className="badge badge-emerald">
              <ShieldCheck size={14} /> Verified Member
            </span>
          </div>

          {/* Primary CTA */}
          <div style={{ marginTop: 'auto' }}>
            {isOwner ? (
              <div style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
              }}>
                This garment is currently active in your listed wardrobe.
              </div>
            ) : (
              <button 
                onClick={() => onOpenSwapModal(item)}
                className="glow-btn"
                style={{ width: '100%', padding: '14px 20px', fontSize: '1rem' }}
              >
                <ArrowRightLeft size={20} />
                Propose Clothing Swap with {item.ownerName.split(' ')[0]}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Value-Fair Matches */}
      {potentialMatches.length > 0 && (
        <section style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
            <Sparkles size={20} color="var(--emerald-400)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff' }}>
              Suggested Fair-Value Matches (±₹800 parity)
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {potentialMatches.map(match => (
              <div 
                key={match.id}
                className="glass-panel"
                style={{ padding: '1rem', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}
              >
                <img src={match.images[0]} alt={match.title} style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', fontWeight: 600 }}>{match.brand}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {match.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    Est. ₹{match.estimatedValue?.toLocaleString('en-IN')} • Size {match.size}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
