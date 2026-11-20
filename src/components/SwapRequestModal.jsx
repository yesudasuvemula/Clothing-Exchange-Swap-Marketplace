import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { 
  X, 
  ArrowRightLeft, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Truck, 
  Handshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SwapRequestModal = ({ targetItem, onClose, onNavigateToChat }) => {
  const { currentUser, items, createSwapRequest } = useMarketplace();

  // Find current user's available items to offer
  const myAvailableItems = items.filter(
    i => i.ownerId === currentUser.id && i.status === 'available'
  );

  const [selectedOfferId, setSelectedOfferId] = useState(
    myAvailableItems.length > 0 ? myAvailableItems[0].id : ''
  );
  const [exchangeMethod, setExchangeMethod] = useState('In-Person Meetup');
  const [meetingLocation, setMeetingLocation] = useState('Local Verified Eco Hub / Metro Station');
  const [customNotes, setCustomNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!targetItem) return null;

  const offeredItem = myAvailableItems.find(i => i.id === selectedOfferId);

  // Valuation fairness check
  const valueDifference = offeredItem 
    ? Math.abs(offeredItem.estimatedValue - targetItem.estimatedValue) 
    : 0;
  const isFairTrade = valueDifference <= 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOfferId) return;

    const newSwap = createSwapRequest({
      offeredItemId: selectedOfferId,
      requestedItemId: targetItem.id,
      exchangeMethod,
      meetingLocation: exchangeMethod === 'In-Person Meetup' ? meetingLocation : 'Insured Carbon-Neutral Courier',
      notes: customNotes || `Hi ${targetItem.ownerName.split(' ')[0]}, I'd love to swap my ${offeredItem?.title} for your ${targetItem.title}!`
    });

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onClose();
      if (onNavigateToChat) {
        onNavigateToChat(newSwap.id);
      }
    }, 1800);
  };

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

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              border: '2px solid var(--emerald-400)'
            }}>
              <CheckCircle size={40} color="var(--emerald-400)" />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>Swap Proposal Dispatched!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              We notified <strong>{targetItem.ownerName}</strong> and opened a direct negotiation chat room for both of you.
            </p>
            <span className="badge badge-emerald">Opening Negotiation Chat...</span>
          </div>
        ) : (
          <div>
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
                <ArrowRightLeft size={20} color="var(--emerald-400)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Initiate Clothing Swap</h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Propose an item from your wardrobe to swap with {targetItem.ownerName}
                </p>
              </div>
            </div>

            {/* Comparison Visualizer */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '1rem',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '1.2rem',
              borderRadius: '16px',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-subtle)'
            }}>
              {/* Desired Item */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>
                  You Receive
                </span>
                <img 
                  src={targetItem.images[0]} 
                  alt={targetItem.title} 
                  style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', margin: '8px auto', display: 'block' }} 
                />
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {targetItem.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
                  Est. ₹{targetItem.estimatedValue?.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Middle Icon */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--emerald-400)'
              }}>
                <ArrowRightLeft size={18} />
              </div>

              {/* Offered Item */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>
                  You Offer
                </span>
                {offeredItem ? (
                  <>
                    <img 
                      src={offeredItem.images[0]} 
                      alt={offeredItem.title} 
                      style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', margin: '8px auto', display: 'block' }} 
                    />
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {offeredItem.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
                      Est. ₹{offeredItem.estimatedValue?.toLocaleString('en-IN')}
                    </div>
                  </>
                ) : (
                  <div style={{ height: '115px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                    Select an item below
                  </div>
                )}
              </div>
            </div>

            {/* Valuation Balance Bar */}
            {offeredItem && (
              <div style={{
                background: isFairTrade ? 'rgba(16, 185, 129, 0.12)' : 'rgba(251, 191, 36, 0.12)',
                border: `1px solid ${isFairTrade ? 'rgba(16, 185, 129, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`,
                padding: '10px 14px',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                {isFairTrade ? (
                  <Sparkles size={18} color="var(--emerald-400)" />
                ) : (
                  <AlertCircle size={18} color="var(--amber-400)" />
                )}
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                  {isFairTrade ? (
                    <span><strong>Fair Value Match:</strong> Values differ by only ₹{valueDifference.toLocaleString('en-IN')}. Highly likely to be accepted!</span>
                  ) : (
                    <span><strong>Value Imbalance:</strong> Valuation differs by ₹{valueDifference.toLocaleString('en-IN')}. You can discuss a bundle or multi-item swap in chat.</span>
                  )}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Select from user's wardrobe */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  1. Choose Garment from Your Wardrobe to Offer:
                </label>
                {myAvailableItems.length === 0 ? (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#fca5a5'
                  }}>
                    You don't have any available garments listed in your wardrobe yet! Please click "List Garment" in the navigation bar to add an item first.
                  </div>
                ) : (
                  <select
                    value={selectedOfferId}
                    onChange={(e) => setSelectedOfferId(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  >
                    {myAvailableItems.map(item => (
                      <option key={item.id} value={item.id} style={{ background: '#131926' }}>
                        {item.title} ({item.brand}, Size {item.size}) — Est. ₹{item.estimatedValue?.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Delivery / Exchange Method */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  2. Preferred Exchange Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setExchangeMethod('In-Person Meetup')}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center',
                      background: exchangeMethod === 'In-Person Meetup' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.3)',
                      border: exchangeMethod === 'In-Person Meetup' ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    <Handshake size={16} color="var(--emerald-400)" />
                    Local Meetup (NYC)
                  </button>

                  <button
                    type="button"
                    onClick={() => setExchangeMethod('Courier Delivery')}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center',
                      background: exchangeMethod === 'Courier Delivery' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.3)',
                      border: exchangeMethod === 'Courier Delivery' ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    <Truck size={16} color="var(--cyan-500)" />
                    Courier Shipping
                  </button>
                </div>
              </div>

              {exchangeMethod === 'In-Person Meetup' && (
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                    Proposed Meeting Spot:
                  </label>
                  <input 
                    type="text"
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    placeholder="e.g. Union Square, Coffee Shop, Subway Station..."
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              )}

              {/* Personal Negotiation Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  3. Note for {targetItem.ownerName.split(' ')[0]}:
                </label>
                <textarea 
                  rows="3"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Introduce yourself, mention why you love the piece, and propose convenient dates/times..."
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    resize: 'none'
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
                  disabled={myAvailableItems.length === 0}
                  className="glow-btn"
                  style={{ flex: 2, opacity: myAvailableItems.length === 0 ? 0.5 : 1 }}
                >
                  <ArrowRightLeft size={18} />
                  Send Swap Proposal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
