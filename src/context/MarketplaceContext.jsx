import React, { useState, useEffect } from 'react';
import { MarketplaceContext } from './marketplaceContext';
import { 
  INITIAL_USERS, 
  INITIAL_ITEMS, 
  INITIAL_SWAP_REQUESTS, 
  INITIAL_MESSAGES,
  CATEGORY_BASE_VALUES,
  BRAND_TIERS,
  CONDITION_MULTIPLIERS
} from '../mockData';

export const MarketplaceProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('swapstyle_users');
      const savedUsers = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(savedUsers)) return INITIAL_USERS;

      const savedUsersById = new Map(
        savedUsers.filter(user => user && typeof user.id === 'string').map(user => [user.id, user])
      );
      const initialUserIds = new Set(INITIAL_USERS.map(user => user.id));
      const refreshedUsers = INITIAL_USERS.map(user => ({
        ...savedUsersById.get(user.id),
        ...user
      }));
      const additionalUsers = savedUsers.filter(
        user => user && typeof user.id === 'string' && !initialUserIds.has(user.id)
      );

      return [...refreshedUsers, ...additionalUsers];
    } catch {
      return INITIAL_USERS;
    }
  });

  // Resolve the saved selection against refreshed account details.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('swapstyle_current_user');
      const savedUser = saved ? JSON.parse(saved) : null;
      return users.find(user => user.id === savedUser?.id) || users[0] || INITIAL_USERS[0];
    } catch {
      return users[0] || INITIAL_USERS[0];
    }
  });

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('swapstyle_items');
      const savedItems = saved ? JSON.parse(saved) : INITIAL_ITEMS;
      if (!Array.isArray(savedItems)) return INITIAL_ITEMS;

      return savedItems.map(item => {
        const owner = users.find(user =>
          user.id === item.ownerId || user.name === item.ownerId || user.name === item.ownerName
        );
        return owner ? { ...item, ownerAvatar: owner.avatar } : item;
      });
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [swaps, setSwaps] = useState(() => {
    try {
      const saved = localStorage.getItem('swapstyle_swaps');
      const savedSwaps = saved ? JSON.parse(saved) : INITIAL_SWAP_REQUESTS;
      if (!Array.isArray(savedSwaps)) return INITIAL_SWAP_REQUESTS;

      return savedSwaps.map(swap => {
        const initiator = users.find(user =>
          user.id === swap.initiatorId || user.name === swap.initiatorId || user.name === swap.initiatorName
        );
        const receiver = users.find(user =>
          user.id === swap.receiverId || user.name === swap.receiverId || user.name === swap.receiverName
        );
        return {
          ...swap,
          ...(initiator && { initiatorAvatar: initiator.avatar }),
          ...(receiver && { receiverAvatar: receiver.avatar })
        };
      });
    } catch {
      return INITIAL_SWAP_REQUESTS;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('swapstyle_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: "surya kiran proposed a swap for your Everlane Cashmere", time: "10m ago", read: false },
    { id: 2, text: "mahalakshmi accepted your swap proposal! Check chat.", time: "1h ago", read: true }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('swapstyle_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('swapstyle_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('swapstyle_swaps', JSON.stringify(swaps));
  }, [swaps]);

  useEffect(() => {
    localStorage.setItem('swapstyle_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('swapstyle_users', JSON.stringify(users));
  }, [users]);

  // Valuation algorithm function (in Rupees ₹)
  const calculateSwapValue = (category, brand, condition, originalRetail = 0) => {
    const baseCatVal = CATEGORY_BASE_VALUES[category] || 1800;
    
    // Find brand tier
    let brandMultiplier = 1.0;
    for (const [, info] of Object.entries(BRAND_TIERS)) {
      if (info.brands.some(b => b.toLowerCase() === (brand || '').toLowerCase())) {
        brandMultiplier = info.baseMultiplier;
        break;
      }
    }

    const condMultiplier = CONDITION_MULTIPLIERS[condition] || 0.85;

    let computed = Math.round(baseCatVal * brandMultiplier * condMultiplier);
    
    // If retail price is provided, factor 35-50% retain rate depending on condition
    if (originalRetail && Number(originalRetail) > 0) {
      const retailFactor = (Number(originalRetail) * 0.42) * condMultiplier;
      computed = Math.round((computed * 0.4) + (retailFactor * 0.6));
    }

    return Math.max(500, computed);
  };

  // Add Item
  const addItem = (itemData) => {
    const newItem = {
      id: `item_${Date.now()}`,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerAvatar: currentUser.avatar,
      location: currentUser.city,
      distanceKm: (Math.random() * 5 + 0.5).toFixed(1),
      status: 'available',
      views: 1,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      ...itemData
    };
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  // Delete item
  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Update item
  const updateItem = (itemId, updatedFields) => {
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, ...updatedFields } : item));
  };

  // Create Swap Request
  const createSwapRequest = ({ offeredItemId, requestedItemId, exchangeMethod, meetingLocation, notes }) => {
    const offeredItem = items.find(i => i.id === offeredItemId);
    const requestedItem = items.find(i => i.id === requestedItemId);

    if (!offeredItem || !requestedItem) return null;

    const newSwap = {
      id: `swap_${Date.now()}`,
      initiatorId: currentUser.id,
      initiatorName: currentUser.name,
      initiatorAvatar: currentUser.avatar,
      receiverId: requestedItem.ownerId,
      receiverName: requestedItem.ownerName,
      receiverAvatar: requestedItem.ownerAvatar,
      offeredItemId: offeredItem.id,
      offeredItemTitle: offeredItem.title,
      offeredItemImage: offeredItem.images[0],
      offeredItemValue: offeredItem.estimatedValue,
      requestedItemId: requestedItem.id,
      requestedItemTitle: requestedItem.title,
      requestedItemImage: requestedItem.images[0],
      requestedItemValue: requestedItem.estimatedValue,
      exchangeMethod: exchangeMethod || "In-Person Meetup",
      meetingLocation: meetingLocation || "Central Station Green Zone",
      status: 'pending',
      valueDifference: Math.abs(offeredItem.estimatedValue - requestedItem.estimatedValue),
      createdAt: new Date().toISOString(),
      notes: notes || "Hey, I would love to trade this item with you!"
    };

    setSwaps(prev => [newSwap, ...prev]);

    // Add first chat message
    const initialMsg = {
      id: `msg_${Date.now()}`,
      swapId: newSwap.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: notes || `Hi! I created a swap request: "${offeredItem.title}" for your "${requestedItem.title}".`,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, initialMsg]);

    return newSwap;
  };

  // Update swap status
  const updateSwapStatus = (swapId, newStatus) => {
    setSwaps(prev => prev.map(s => {
      if (s.id === swapId) {
        // If accepted or completed, mark items accordingly
        if (newStatus === 'completed') {
          setItems(itemsList => itemsList.map(item => {
            if (item.id === s.offeredItemId || item.id === s.requestedItemId) {
              return { ...item, status: 'swapped' };
            }
            return item;
          }));
        }
        return { ...s, status: newStatus };
      }
      return s;
    }));

    // Add notification
    const swap = swaps.find(s => s.id === swapId);
    if (swap) {
      const msg = `Swap #${swapId.slice(-4)} status updated to: ${newStatus.toUpperCase()}`;
      setNotifications(prev => [{ id: Date.now(), text: msg, time: 'Just now', read: false }, ...prev]);
    }
  };

  // Send Chat Message
  const sendMessage = (swapId, text) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      swapId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
    return newMsg;
  };

  // Switch current user demo profile
  const switchUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  // Reset to initial mock data
  const resetDemoData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setItems(INITIAL_ITEMS);
    setSwaps(INITIAL_SWAP_REQUESTS);
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <MarketplaceContext.Provider value={{
      currentUser,
      users,
      items,
      swaps,
      messages,
      notifications,
      calculateSwapValue,
      addItem,
      deleteItem,
      updateItem,
      createSwapRequest,
      updateSwapStatus,
      sendMessage,
      switchUser,
      resetDemoData,
      setCurrentUser
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
