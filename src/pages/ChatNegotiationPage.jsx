import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { 
  MessageSquare, 
  Send, 
  ArrowRightLeft, 
  CheckCircle2, 
  MapPin, 
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChatNegotiationPage = ({ initialSwapId }) => {
  const { 
    currentUser, 
    swaps, 
    messages, 
    sendMessage, 
    updateSwapStatus 
  } = useMarketplace();

  // Find active swaps related to current user
  const userSwaps = swaps.filter(
    s => s.initiatorId === currentUser.id || s.receiverId === currentUser.id
  );

  const [activeSwapId, setActiveSwapId] = useState(() => {
    if (initialSwapId && userSwaps.some(s => s.id === initialSwapId)) {
      return initialSwapId;
    }
    return userSwaps.length > 0 ? userSwaps[0].id : null;
  });

  const [inputText, setInputText] = useState('');

  const currentSwap = swaps.find(s => s.id === activeSwapId);

  // Filter messages for current active swap
  const swapMessages = messages.filter(m => m.swapId === activeSwapId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSwapId) return;

    sendMessage(activeSwapId, inputText.trim());
    setInputText('');
  };

  const handleAcceptSwap = () => {
    if (!activeSwapId) return;
    updateSwapStatus(activeSwapId, 'accepted');
    confetti({ particleCount: 70, spread: 60 });
    sendMessage(activeSwapId, `🤝 Swap proposal accepted! Let's coordinate pickup/shipping details.`);
  };

  const handleCompleteSwap = () => {
    if (!activeSwapId) return;
    updateSwapStatus(activeSwapId, 'completed');
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    sendMessage(activeSwapId, `🎉 Swap successfully completed! Items exchanged and garments renewed.`);
  };

  const handleRejectSwap = () => {
    if (!activeSwapId) return;
    updateSwapStatus(activeSwapId, 'rejected');
    sendMessage(activeSwapId, `I won't be able to proceed with this exchange. Thank you for your interest!`);
  };

  // Determine counterpart
  const isInitiator = currentSwap?.initiatorId === currentUser.id;
  const counterpartName = isInitiator ? currentSwap?.receiverName : currentSwap?.initiatorName;
  const counterpartAvatar = isInitiator ? currentSwap?.receiverAvatar : currentSwap?.initiatorAvatar;

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem' }} className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>
          Swap Negotiation & Direct Messaging
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Coordinate handoffs, discuss sizing nuances, verify conditions, and seal swaps in real-time.
        </p>
      </div>

      {userSwaps.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <MessageSquare size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>No Active Negotiations</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Browse clothing listings to initiate your first clothing swap proposal!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr 340px',
          gap: '1.5rem',
          minHeight: '680px',
          height: 'calc(100vh - 220px)'
        }}>
          {/* Left: Swaps List Sidebar */}
          <div className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '18px'
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Your Active Conversations ({userSwaps.length})
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
              {userSwaps.map(swap => {
                const otherName = swap.initiatorId === currentUser.id ? swap.receiverName : swap.initiatorName;
                const otherAvatar = swap.initiatorId === currentUser.id ? swap.receiverAvatar : swap.initiatorAvatar;
                const isSelected = swap.id === activeSwapId;

                const getStatusBadge = () => {
                  switch (swap.status) {
                    case 'accepted': return <span className="badge badge-emerald">Accepted</span>;
                    case 'completed': return <span className="badge badge-indigo">Completed</span>;
                    case 'rejected': return <span className="badge badge-rose">Declined</span>;
                    default: return <span className="badge badge-amber">Pending</span>;
                  }
                };

                return (
                  <div
                    key={swap.id}
                    onClick={() => setActiveSwapId(swap.id)}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={otherAvatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{otherName}</span>
                      </div>
                      {getStatusBadge()}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {swap.offeredItemTitle} ↔ {swap.requestedItemTitle}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Middle: Chat Feed & Controls */}
          {currentSwap && (
            <div className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '18px'
            }}>
              {/* Header */}
              <div style={{
                padding: '1rem 1.2rem',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={counterpartAvatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{counterpartName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>
                      ● Online & Ready to Negotiate
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div>
                  <span className={`badge ${
                    currentSwap.status === 'completed' ? 'badge-indigo' :
                    currentSwap.status === 'accepted' ? 'badge-emerald' :
                    currentSwap.status === 'rejected' ? 'badge-rose' : 'badge-amber'
                  }`}>
                    {currentSwap.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {/* System notification notice */}
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: 'var(--text-dim)',
                  margin: '0 auto',
                  maxWidth: '85%'
                }}>
                  🔒 Safe Swap Environment: Meet in public spaces or use tracked carbon-neutral couriers. Never share private payment information.
                </div>

                {swapMessages.map(msg => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div 
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMe ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        maxWidth: '75%',
                        padding: '10px 14px',
                        borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        background: isMe 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                          : 'rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        fontSize: '0.88rem',
                        lineHeight: 1.45,
                        boxShadow: isMe ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
                      }}>
                        {msg.text}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '4px', padding: '0 4px' }}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <form 
                onSubmit={handleSendMessage}
                style={{
                  padding: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '10px',
                  background: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <input 
                  type="text"
                  placeholder={`Reply to ${counterpartName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  type="submit"
                  className="glow-btn"
                  style={{ padding: '10px 16px' }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* Right: Swap Overview & Resolution Actions */}
          {currentSwap && (
            <div className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.2rem',
              borderRadius: '18px',
              overflowY: 'auto'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
                Exchange Agreement Details
              </h3>

              {/* The Items in Exchange */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '12px',
                borderRadius: '14px',
                marginBottom: '1rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '6px' }}>
                  Offered Item
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                  <img src={currentSwap.offeredItemImage} alt="" style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{currentSwap.offeredItemTitle}</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>Est. ₹{currentSwap.offeredItemValue?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0' }}>
                  <ArrowRightLeft size={16} color="var(--emerald-400)" />
                </div>

                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '6px' }}>
                  Requested Item
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <img src={currentSwap.requestedItemImage} alt="" style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{currentSwap.requestedItemTitle}</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>Est. ₹{currentSwap.requestedItemValue?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Handover Specifications */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '10px 12px',
                borderRadius: '12px',
                marginBottom: '1.2rem',
                fontSize: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
                  {currentSwap.exchangeMethod === 'In-Person Meetup' ? <MapPin size={14} color="var(--emerald-400)" /> : <Truck size={14} color="var(--cyan-500)" />}
                  {currentSwap.exchangeMethod}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  Location: {currentSwap.meetingLocation}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentSwap.status === 'pending' && (
                  <>
                    <button
                      onClick={handleAcceptSwap}
                      className="glow-btn"
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    >
                      <CheckCircle2 size={16} />
                      Accept Swap Proposal
                    </button>
                    <button
                      onClick={handleRejectSwap}
                      style={{
                        padding: '8px',
                        borderRadius: '10px',
                        background: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: 'var(--rose-500)',
                        fontSize: '0.82rem',
                        fontWeight: 600
                      }}
                    >
                      Decline Proposal
                    </button>
                  </>
                )}

                {currentSwap.status === 'accepted' && (
                  <button
                    onClick={handleCompleteSwap}
                    className="glow-btn"
                    style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', fontSize: '0.85rem' }}
                  >
                    <CheckCircle2 size={16} />
                    Confirm Items Received (Complete Swap)
                  </button>
                )}

                {currentSwap.status === 'completed' && (
                  <div style={{
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    textAlign: 'center',
                    color: 'var(--emerald-400)',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}>
                    ✓ Garment Swap Finalized! +25 Eco-Credits Awarded.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
