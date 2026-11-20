import React, { useState, useMemo } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { CATEGORIES, BRANDS } from '../mockData';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRightLeft, 
  Compass,
  Leaf,
  Tag
} from 'lucide-react';

export const ListingsPage = ({ onSelectItem, onOpenSwapModal }) => {
  const { items, currentUser } = useMarketplace();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [maxDistance, setMaxDistance] = useState(15); // km
  const [sortBy, setSortBy] = useState('featured'); // featured, valueAsc, valueDesc, distance
  const [onlyNearby, setOnlyNearby] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Don't show swapped items in default feed
      if (item.status === 'swapped') return false;

      // Search match
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      // Category match
      const matchesCategory = 
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      // Brand match
      const matchesBrand = 
        selectedBrand === 'All Brands' || item.brand === selectedBrand;

      // Condition match
      const matchesCondition = 
        selectedCondition === 'All' || item.condition === selectedCondition;

      // Distance match
      const distanceNum = parseFloat(item.distanceKm || 5);
      const matchesDistance = !onlyNearby || distanceNum <= maxDistance;

      return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesDistance;
    }).sort((a, b) => {
      if (sortBy === 'valueAsc') return a.estimatedValue - b.estimatedValue;
      if (sortBy === 'valueDesc') return b.estimatedValue - a.estimatedValue;
      if (sortBy === 'distance') return parseFloat(a.distanceKm || 0) - parseFloat(b.distanceKm || 0);
      return 0; // featured default
    });
  }, [items, searchQuery, selectedCategory, selectedBrand, selectedCondition, maxDistance, sortBy, onlyNearby]);

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem' }} className="animate-fade-in">
      {/* Hero Banner with Sustainable Barter Highlights */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(99, 102, 241, 0.08) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }} className="badge badge-emerald">
            <Leaf size={14} /> Zero Monetary Transactions • 100% Peer-to-Peer Barter
          </div>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #ffffff, #cbd5e1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Swap your clothes. <br />
            Renew your wardrobe with zero waste.
          </h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
            Trade authentic vintage, designer streetwear, and capsule staples directly with verified members near you in New York. Value-checked, fair, and planet-friendly.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald-400)' }}>1,420+ kg</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Textile Waste Diverted</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>680+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Completed Swaps</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan-500)' }}>₹0.00</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Currency Required</div>
            </div>
          </div>
        </div>

        {/* Decorative background circle */}
        <div style={{
          position: 'absolute',
          right: '-60px',
          bottom: '-60px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
      </section>

      {/* Search and Discovery Control Center */}
      <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '10px 14px'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text"
              placeholder="Search by brand, item, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                color: '#fff',
                fontSize: '0.9rem',
                width: '100%'
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '10px 14px'
          }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: 'transparent',
                color: '#fff',
                width: '100%',
                fontSize: '0.9rem'
              }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} style={{ background: '#131926' }}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '10px 14px'
          }}>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{
                background: 'transparent',
                color: '#fff',
                width: '100%',
                fontSize: '0.9rem'
              }}
            >
              {BRANDS.map(b => (
                <option key={b} value={b} style={{ background: '#131926' }}>{b}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '10px 14px'
          }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                color: '#fff',
                width: '100%',
                fontSize: '0.9rem'
              }}
            >
              <option value="featured" style={{ background: '#131926' }}>Sort: Featured</option>
              <option value="valueAsc" style={{ background: '#131926' }}>Swap Value: Low to High</option>
              <option value="valueDesc" style={{ background: '#131926' }}>Swap Value: High to Low</option>
              <option value="distance" style={{ background: '#131926' }}>Nearest Distance</option>
            </select>
          </div>
        </div>

        {/* Location & Radius Toggle */}
        <div style={{
          marginTop: '1.2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setOnlyNearby(!onlyNearby)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: onlyNearby ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: onlyNearby ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                color: onlyNearby ? 'var(--emerald-400)' : 'var(--text-muted)'
              }}
            >
              <Compass size={14} />
              {onlyNearby ? `Within ${maxDistance} km of ${currentUser.city}` : 'Show All Locations'}
            </button>

            {onlyNearby && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Radius: {maxDistance}km</span>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  style={{ cursor: 'pointer', accentColor: 'var(--emerald-500)' }}
                />
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Showing <strong style={{ color: '#fff' }}>{filteredItems.length}</strong> available garments ready for swap
          </div>
        </div>
      </section>

      {/* Grid of Clothing Items */}
      {filteredItems.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Tag size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>No items match your criteria</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Try expanding your distance radius, removing filters, or be the first to list a garment in this category!
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSelectedBrand('All Brands');
              setSelectedCondition('All');
              setOnlyNearby(false);
            }}
            className="secondary-btn"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredItems.map(item => {
            const isOwner = item.ownerId === currentUser.id;

            return (
              <div 
                key={item.id}
                className="glass-panel"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Image & Badges */}
                <div 
                  onClick={() => onSelectItem(item)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '110%',
                    overflow: 'hidden',
                    background: '#131926'
                  }}
                >
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Top Badge: Value Estimate */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(11, 15, 23, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Sparkles size={13} color="var(--emerald-400)" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>
                      Est. Value ~₹{item.estimatedValue?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Top Right: Condition Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px'
                  }}>
                    <span className="badge badge-emerald" style={{ background: 'rgba(11, 15, 23, 0.85)' }}>
                      {item.condition}
                    </span>
                  </div>

                  {/* Bottom Location Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    color: '#e2e8f0'
                  }}>
                    <MapPin size={12} color="var(--emerald-400)" />
                    {item.location} ({item.distanceKm} km away)
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.brand}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      Size: {item.size}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectItem(item)}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '8px',
                      lineHeight: 1.35,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                    lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.swapPreferences || item.description}
                  </p>

                  {/* Owner & Action button */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img 
                        src={item.ownerAvatar} 
                        alt={item.ownerName} 
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item.ownerName.split(' ')[0]}
                      </span>
                    </div>

                    {isOwner ? (
                      <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                        Your Wardrobe
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenSwapModal(item);
                        }}
                        className="glow-btn"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <ArrowRightLeft size={14} />
                        Request Swap
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
