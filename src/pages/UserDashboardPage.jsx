import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { 
  MapPin, 
  Layers, 
  ArrowRightLeft, 
  Trash2, 
  PlusCircle, 
  Leaf,
  Calendar,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

export const UserDashboardPage = ({ onOpenUploadModal, onNavigateToChat }) => {
  const { 
    currentUser, 
    items, 
    swaps, 
    deleteItem 
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState('wardrobe'); // wardrobe, incoming, outgoing, history

  // User's wardrobe items
  const myItems = items.filter(i => i.ownerId === currentUser.id);

  // Incoming swap requests
  const incomingSwaps = swaps.filter(s => s.receiverId === currentUser.id);

  // Outgoing swap requests
  const outgoingSwaps = swaps.filter(s => s.initiatorId === currentUser.id);

  // Completed swaps
  const completedSwaps = swaps.filter(
    s => (s.initiatorId === currentUser.id || s.receiverId === currentUser.id) && s.status === 'completed'
  );

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem' }} className="animate-fade-in">
      {/* Top Profile Banner */}
      <div className="glass-panel" style={{
        padding: '2.5rem',
        borderRadius: '24px',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--emerald-400)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {currentUser.name}
              </h1>
              <span className="badge badge-emerald">Verified Wardrobe</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 8px 0', maxWidth: '520px' }}>
              {currentUser.bio}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="var(--emerald-400)" /> {currentUser.city}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> Member since {currentUser.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Eco Metrics & Stats */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '1.2rem 1.8rem',
          borderRadius: '18px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              <Leaf size={16} color="var(--emerald-400)" />
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-400)' }}>
                {currentUser.ecoScore} kg
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CO₂ Diverted</div>
          </div>

          <div style={{ width: '1px', background: 'var(--border-subtle)' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              {currentUser.swapsCompleted}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Swaps Completed</div>
          </div>

          <div style={{ width: '1px', background: 'var(--border-subtle)' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan-500)' }}>
              {currentUser.rating} ★
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Member Trust</div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '2rem',
        paddingBottom: '8px'
      }}>
        <button
          onClick={() => setActiveTab('wardrobe')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'wardrobe' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'wardrobe' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border: activeTab === 'wardrobe' ? '1px solid var(--emerald-500)' : '1px solid transparent'
          }}
        >
          My Listed Wardrobe ({myItems.length})
        </button>

        <button
          onClick={() => setActiveTab('incoming')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'incoming' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'incoming' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border: activeTab === 'incoming' ? '1px solid var(--emerald-500)' : '1px solid transparent'
          }}
        >
          Incoming Proposals ({incomingSwaps.length})
        </button>

        <button
          onClick={() => setActiveTab('outgoing')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'outgoing' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'outgoing' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border: activeTab === 'outgoing' ? '1px solid var(--emerald-500)' : '1px solid transparent'
          }}
        >
          My Sent Requests ({outgoingSwaps.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: activeTab === 'history' ? '#fff' : 'var(--text-muted)',
            background: activeTab === 'history' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border: activeTab === 'history' ? '1px solid var(--emerald-500)' : '1px solid transparent'
          }}
        >
          Swap History ({completedSwaps.length})
        </button>
      </div>

      {/* Tab: My Listed Wardrobe */}
      {activeTab === 'wardrobe' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Active Clothing Inventory
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                Items available to other members for exchange proposals
              </p>
            </div>
            <button 
              onClick={onOpenUploadModal}
              className="glow-btn"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <PlusCircle size={16} /> Add Garment
            </button>
          </div>

          {myItems.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <Layers size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>You haven't listed any clothes yet.</p>
              <button onClick={onOpenUploadModal} className="glow-btn">List an item now</button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {myItems.map(item => (
                <div key={item.id} className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', fontWeight: 600 }}>{item.brand}</span>
                      <span className="badge badge-emerald">{item.status}</span>
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
                        Est. ₹{item.estimatedValue?.toLocaleString('en-IN')}
                      </span>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        style={{ color: 'var(--rose-500)', padding: '6px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.1)' }}
                        title="Delete listing"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Incoming Proposals */}
      {activeTab === 'incoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {incomingSwaps.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <ArrowRightLeft size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>No incoming swap requests currently.</p>
            </div>
          ) : (
            incomingSwaps.map(swap => (
              <div 
                key={swap.id}
                className="glass-panel"
                style={{ padding: '1.5rem', borderRadius: '18px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={swap.offeredItemImage} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
                      Proposed by {swap.initiatorName}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                      Offered: {swap.offeredItemTitle} (₹{swap.offeredItemValue?.toLocaleString('en-IN')})
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      In exchange for your: <strong>{swap.requestedItemTitle}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => onNavigateToChat(swap.id)}
                    className="glow-btn"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <MessageSquare size={16} />
                    Open Chat & Negotiate
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Outgoing Requests */}
      {activeTab === 'outgoing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {outgoingSwaps.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <ArrowRightLeft size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>You haven't sent any swap requests yet.</p>
            </div>
          ) : (
            outgoingSwaps.map(swap => (
              <div 
                key={swap.id}
                className="glass-panel"
                style={{ padding: '1.5rem', borderRadius: '18px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={swap.requestedItemImage} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--cyan-500)', fontWeight: 600 }}>
                      Sent to {swap.receiverName}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                      Target: {swap.requestedItemTitle}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Offering your: <strong>{swap.offeredItemTitle}</strong> • Status: {swap.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToChat(swap.id)}
                  className="secondary-btn"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <MessageSquare size={16} /> Check Discussion
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Swap History */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {completedSwaps.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <CheckCircle size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>No completed swaps in history yet.</p>
            </div>
          ) : (
            completedSwaps.map(swap => (
              <div 
                key={swap.id}
                className="glass-panel"
                style={{ padding: '1.2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                    Successfully swapped: {swap.offeredItemTitle} ↔ {swap.requestedItemTitle}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--emerald-400)' }}>
                    Completed on {new Date(swap.createdAt).toLocaleDateString()} • Verified Zero Waste Trade
                  </div>
                </div>
                <span className="badge badge-emerald">Completed</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
