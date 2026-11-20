import React, { useState } from 'react';
import { MarketplaceProvider } from './context/MarketplaceContext.jsx';
import { Navbar } from './components/Navbar';
import { ListingsPage } from './pages/ListingsPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { ChatNegotiationPage } from './pages/ChatNegotiationPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { UploadItemModal } from './components/UploadItemModal';
import { SwapRequestModal } from './components/SwapRequestModal';
import { Leaf, Heart, Shield, ArrowRightLeft } from 'lucide-react';

function MarketplaceApp() {
  const [activePage, setActivePage] = useState('listings'); // listings, detail, chat, calculator, dashboard, admin
  const [selectedItem, setSelectedItem] = useState(null);
  const [swapTargetItem, setSwapTargetItem] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeChatSwapId, setActiveChatSwapId] = useState(null);
  const [currentYear] = useState(() => new Date().getFullYear());

  // Handle item detail click
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open swap proposal modal
  const handleOpenSwapModal = (item) => {
    setSwapTargetItem(item);
  };

  // Navigate directly to negotiation room
  const handleNavigateToChat = (swapId) => {
    setActiveChatSwapId(swapId);
    setActivePage('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar 
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUploadModal={() => setIsUploadOpen(true)}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1 }}>
        {activePage === 'listings' && (
          <ListingsPage 
            onSelectItem={handleSelectItem}
            onOpenSwapModal={handleOpenSwapModal}
          />
        )}

        {activePage === 'detail' && (
          selectedItem ? (
            <ItemDetailPage 
              item={selectedItem}
              onBack={() => setActivePage('listings')}
              onOpenSwapModal={handleOpenSwapModal}
            />
          ) : (
            <ListingsPage 
              onSelectItem={handleSelectItem}
              onOpenSwapModal={handleOpenSwapModal}
            />
          )
        )}

        {activePage === 'chat' && (
          <ChatNegotiationPage 
            initialSwapId={activeChatSwapId}
          />
        )}

        {activePage === 'calculator' && (
          <CalculatorPage 
            onOpenUploadModal={() => setIsUploadOpen(true)}
          />
        )}

        {activePage === 'dashboard' && (
          <UserDashboardPage 
            onOpenUploadModal={() => setIsUploadOpen(true)}
            onNavigateToChat={handleNavigateToChat}
            onSelectItem={handleSelectItem}
          />
        )}

        {activePage === 'admin' && (
          <AdminPanelPage />
        )}
      </main>

      {/* Modals */}
      {isUploadOpen && (
        <UploadItemModal 
          onClose={() => setIsUploadOpen(false)}
        />
      )}

      {swapTargetItem && (
        <SwapRequestModal 
          targetItem={swapTargetItem}
          onClose={() => setSwapTargetItem(null)}
          onNavigateToChat={handleNavigateToChat}
        />
      )}

      {/* Modern Ecological Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(11, 15, 23, 0.95)',
        padding: '3rem 1.5rem 2rem'
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ArrowRightLeft size={16} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                SWAP<span style={{ color: 'var(--emerald-400)' }}>STYLE</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', margin: 0, maxWidth: '400px' }}>
              Sustainable Clothing Exchange & Barter Marketplace. Empowering communities to wear better with zero monetary waste.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Leaf size={14} color="var(--emerald-400)" /> 100% Circular Economy
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} color="var(--cyan-500)" /> Community Verified
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Heart size={14} color="#f43f5e" /> Zero Textile Waste
            </span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            © {currentYear} SwapStyle Circular Platform.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceApp />
    </MarketplaceProvider>
  );
}
