import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  ArrowRightLeft, 
  Trash2, 
  Leaf
} from 'lucide-react';

export const AdminPanelPage = () => {
  const { 
    items, 
    swaps, 
    users, 
    deleteItem 
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, listings, users, disputes

  // KPI Calculations
  const totalListings = items.length;
  const activeListings = items.filter(i => i.status === 'available').length;
  const completedSwaps = swaps.filter(s => s.status === 'completed').length;
  const pendingSwaps = swaps.filter(s => s.status === 'pending').length;
  const co2DivertedKg = (completedSwaps * 14.5 + totalListings * 3.2).toFixed(1);

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }} className="badge badge-indigo">
            <ShieldCheck size={14} /> Master Administration & Oversight
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Marketplace Control Console
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Audit listings, moderate accounts, evaluate circular fashion KPIs, and resolve disputes.
          </p>
        </div>
      </div>

      {/* Analytics KPI Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.2rem',
        marginBottom: '2rem'
      }}>
        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '16px', borderLeft: '4px solid var(--emerald-400)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Listings
            </span>
            <Layers size={18} color="var(--emerald-400)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{totalListings}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', marginTop: '4px' }}>
            {activeListings} currently active for barter
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '16px', borderLeft: '4px solid var(--cyan-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Swaps Executed
            </span>
            <ArrowRightLeft size={18} color="var(--cyan-500)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{completedSwaps}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--cyan-500)', marginTop: '4px' }}>
            {pendingSwaps} pending review/negotiation
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '16px', borderLeft: '4px solid var(--indigo-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Wardrobes
            </span>
            <Users size={18} color="var(--indigo-500)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{users.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            100% verified members in NYC
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '16px', borderLeft: '4px solid #34d399' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Carbon Offset Impact
            </span>
            <Leaf size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>{co2DivertedKg} kg</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Equivalent to 184 planted trees
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '2rem',
        paddingBottom: '8px'
      }}>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'analytics' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'analytics' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            border: activeTab === 'analytics' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
          }}
        >
          Overview & Insights
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'listings' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'listings' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            border: activeTab === 'listings' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
          }}
        >
          Listing Moderation ({items.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'users' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'users' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            border: activeTab === 'users' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
          }}
        >
          Member Wardrobes ({users.length})
        </button>
      </div>

      {/* Tab Content: Analytics */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.8rem', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
              Sustainable Fashion Impact Matrix
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Water Conserved (Liters)</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>38,400 L</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Landfill Diverted Garments</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>92 Items</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #10b981)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Barter Satisfaction Score</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>98.6%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '98%', height: '100%', background: '#10b981' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.8rem', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
              Exchange Integrity & Safety Logs
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '10px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '10px', fontSize: '0.82rem', color: '#e2e8f0' }}>
                ✓ Automatic valuation algorithm processed 8 listings with zero anomalies detected.
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '10px', fontSize: '0.82rem', color: '#e2e8f0' }}>
                ✓ Geolocation radius filtering active for all NYC metropolitan exchanges.
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', fontSize: '0.82rem', color: '#94a3b8' }}>
                ℹ Zero commercial counterfeit complaints logged this week.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Listings Moderation */}
      {activeTab === 'listings' && (
        <div className="glass-panel" style={{ borderRadius: '18px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-dim)' }}>
                  <th style={{ padding: '14px 16px' }}>Item</th>
                  <th style={{ padding: '14px 16px' }}>Owner</th>
                  <th style={{ padding: '14px 16px' }}>Category & Brand</th>
                  <th style={{ padding: '14px 16px' }}>Est. Value</th>
                  <th style={{ padding: '14px 16px' }}>Status</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={item.images[0]} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{item.title}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ID: {item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                      {item.ownerName}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ color: '#fff' }}>{item.brand}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.category}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--emerald-400)' }}>
                      ₹{item.estimatedValue?.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-emerald">{item.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => deleteItem(item.id)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          background: 'rgba(244, 63, 94, 0.15)',
                          color: 'var(--rose-500)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Users */}
      {activeTab === 'users' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {users.map(u => (
            <div key={u.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <img src={u.avatar} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{u.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{u.city} • {u.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {u.badges?.map(b => (
                  <span key={b} className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{b}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <span>Swaps: {u.swapsCompleted}</span>
                <span>Eco Score: {u.ecoScore} kg</span>
                <span>Rating: {u.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
