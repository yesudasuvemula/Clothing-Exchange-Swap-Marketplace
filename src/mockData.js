export const INITIAL_USERS = [
  {
    id: "usr_yesudasu",
    name: "yesudasu",
    email: "yesudasuvemula@gmail.com",
    role: "admin",
    avatar: "https://cdn.phototourl.com/member/2026-10-13-b925d917-33fb-426e-aec6-fc4ee08f8064.jpg",
    city: "vijayawada, andhra pradesh",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    bio: "Passionate about circular fashion & vintage denim. Swapping since 2021!",
    joinedDate: "January 2023",
    ecoScore: 480, // kg CO2 saved
    swapsCompleted: 14,
    rating: 4.9,
    reviewsCount: 16,
    badges: ["Top Swapper", "Eco Pioneer", "Fast Shipper"]
  },
  {
    id: "usr_mahalakshmi",
    name: "mahalakshmi",
    email: "mahalakshmipenupothu@gmail.com",
    role: "user",
    avatar: "https://cdn.phototourl.com/anon/2026-11-14-a098d9b9-713c-4538-ac7c-3317deadab52.jpg",
    city: "vijayawada, andhra pradesh",
    coordinates: { lat: 16.5062, lng: 80.6480 },
    bio: "Streetwear collector trading jackets, hoodies, and sneakers. Zero waste advocate.",
    joinedDate: "March 2023",
    ecoScore: 320,
    swapsCompleted: 9,
    rating: 4.8,
    reviewsCount: 11,
    badges: ["Streetwear Pro", "Verified Wardrobe"]
  },
  {
    id: "usr_suryakiran",
    name: "surya kiran",
    email: "biyyalasuryakiran@gmail.com",
    role: "user",
    avatar: "https://cdn.phototourl.com/member/2026-10-13-6fbed4fe-a700-49fa-8321-5f4da8281d05.png",
    city: "vijayawada, andhra pradesh",
    coordinates: { lat: 16.5062, lng: 80.6480 },
    bio: "Minimalist capsule wardrobe lover. Looking to refresh my workwear & handloom coats.",
    joinedDate: "August 2023",
    ecoScore: 210,
    swapsCompleted: 6,
    rating: 5.0,
    reviewsCount: 8,
    badges: ["Careful Packer", "Fast Responder"]
  },
  {
    id: "usr_prakash",
    name: "prakash",
    email: "prakashvemula@gmail.com",
    role: "user",
    avatar: "https://cdn.phototourl.com/anon/2026-11-14-92e5a538-a560-40f6-bae7-07e0b0a96119.jpg",
    city: "vijayawada, andhra pradesh",
    coordinates: { lat: 16.5062, lng: 80.6480 },
    bio: "Marketplace Integrity Lead & Sustainability Auditor.",
    joinedDate: "November 2022",
    ecoScore: 890,
    swapsCompleted: 32,
    rating: 5.0,
    reviewsCount: 42,
    badges: ["Community Moderator", "Platform Staff"]
  }
];

export const INITIAL_ITEMS = [
  {
    id: "item_01",
    title: "Vintage Levi's 70500 Sherpa Denim Trucker Jacket",
    category: "Jackets & Coats",
    gender: "Unisex",
    brand: "Levi's",
    size: "M",
    color: "Indigo Wash",
    material: "100% Cotton / Faux Sherpa",
    condition: "Good",
    conditionRating: 4,
    estimatedValue: 3800,
    ownerId: "usr_yesudasu",
    ownerName: "yesudasu",
    ownerAvatar: "https://cdn.phototourl.com/member/2026-10-13-b925d917-33fb-426e-aec6-fc4ee08f8064.jpg",
    location: "vijayawada, Andhra Pradesh",
    distanceKm: 2.1,
    coordinates: { lat: 16.5062, lng: 80.6480 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic vintage Levi's sherpa trucker jacket with warm fleece lining. Super cozy, sturdy hardware, slight authentic fading along elbows. Ready for swapping!",
    swapPreferences: "Interested in trench coats, heavyweight chore jackets, or wool knits in sizes M/L.",
    views: 142,
    likes: 28,
    createdAt: "2026-03-28"
  },
  {
    id: "item_02",
    title: "Patagonia Synchilla Snap-T Fleece Pullover",
    category: "Sweaters & Hoodies",
    gender: "Men",
    brand: "Patagonia",
    size: "L",
    color: "Forest Green / Teal",
    material: "Recycled Polyester Fleece",
    condition: "Like New",
    conditionRating: 5,
    estimatedValue: 4200,
    ownerId: "usr_mahalakshmi",
    ownerName: "mahalakshmi",
    ownerAvatar: "https://cdn.phototourl.com/anon/2026-11-14-a098d9b9-713c-4538-ac7c-3317deadab52.jpg",
    location: "Koramangala, Bengaluru",
    distanceKm: 4.8,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Iconic Snap-T pullover fleece. Made from 100% recycled polyester. Barely worn twice, elastic cuffs and collar are crisp and fluffy. Non-smoking home.",
    swapPreferences: "Looking for base layers, hiking trousers, or Carhartt jackets in Large.",
    views: 215,
    likes: 47,
    createdAt: "2026-04-01"
  },
  {
    id: "item_03",
    title: "Reformation A-Line Linen Midi Summer Dress",
    category: "Dresses",
    gender: "Women",
    brand: "Reformation",
    size: "S",
    color: "Sage Floral",
    material: "100% Organic Linen",
    condition: "Brand New",
    conditionRating: 5,
    estimatedValue: 5500,
    ownerId: "usr_suryakiran",
    ownerName: "surya kiran",
    ownerAvatar: "https://cdn.phototourl.com/member/2026-10-13-6fbed4fe-a700-49fa-8321-5f4da8281d05.png",
    location: "Connaught Place, Delhi",
    distanceKm: 7.2,
    coordinates: { lat: 28.6315, lng: 77.2167 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Stunning floral midi dress with square neckline and side slit. Tags still attached. Sustainable luxury piece perfect for brunches or weddings.",
    swapPreferences: "Seeking structured blazer (Theory, Cos) or silk shirts in XS/S.",
    views: 310,
    likes: 62,
    createdAt: "2026-04-02"
  },
  {
    id: "item_04",
    title: "Carhartt WIP Michigan Chore Coat in Hamilton Brown",
    category: "Jackets & Coats",
    gender: "Unisex",
    brand: "Carhartt",
    size: "M",
    color: "Hamilton Brown",
    material: "Heavyweight Cotton Canvas",
    condition: "Good",
    conditionRating: 4,
    estimatedValue: 4800,
    ownerId: "usr_mahalakshmi",
    ownerName: "mahalakshmi",
    ownerAvatar: "https://cdn.phototourl.com/anon/2026-11-14-a098d9b9-713c-4538-ac7c-3317deadab52.jpg",
    location: "Koramangala, Bengaluru",
    distanceKm: 4.8,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic utility jacket with corduroy collar, blanket lining, and triple-stitched seams. Great rugged patina that will last another decade.",
    swapPreferences: "Swap for leather boots size 10 UK/India, denim jackets or wool outerwear.",
    views: 188,
    likes: 39,
    createdAt: "2026-04-03"
  },
  {
    id: "item_05",
    title: "Everlane The Cashmere Boxy Crewneck",
    category: "Sweaters & Hoodies",
    gender: "Women",
    brand: "Everlane",
    size: "M",
    color: "Oatmeal Heather",
    material: "100% Grade-A Mongolian Cashmere",
    condition: "Like New",
    conditionRating: 5,
    estimatedValue: 3600,
    ownerId: "usr_yesudasu",
    ownerName: "yesudasu",
    ownerAvatar: "https://cdn.phototourl.com/member/2026-10-13-b925d917-33fb-426e-aec6-fc4ee08f8064.jpg",
    location: "vijayawada, Andhra Pradesh",
    distanceKm: 2.1,
    coordinates: { lat: 16.5062, lng: 80.6480 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Buttery soft cashmere sweater. Flattering boxy silhouette that pairs effortlessly with high-waisted jeans. Hand-washed in organic wool wash once.",
    swapPreferences: "Open to knit cardigans, leather accessories, or wide-leg linen trousers.",
    views: 160,
    likes: 31,
    createdAt: "2026-04-05"
  },
  {
    id: "item_06",
    title: "COS Relaxed Wool-Blend Tailored Trousers",
    category: "Pants & Trousers",
    gender: "Women",
    brand: "COS",
    size: "38 (Medium)",
    color: "Charcoal Melange",
    material: "96% Wool, 4% Elastane",
    condition: "Like New",
    conditionRating: 4.5,
    estimatedValue: 3400,
    ownerId: "usr_suryakiran",
    ownerName: "surya kiran",
    ownerAvatar: "https://cdn.phototourl.com/member/2026-10-13-6fbed4fe-a700-49fa-8321-5f4da8281d05.png",
    location: "Connaught Place, Delhi",
    distanceKm: 7.2,
    coordinates: { lat: 28.6315, lng: 77.2167 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Contemporary minimal trousers with crisp front pleats and adjustable inner waist tabs. Premium Scandinavian silhouette.",
    swapPreferences: "Looking for silk blouses, loafers size 5/6, or midi skirts.",
    views: 120,
    likes: 19,
    createdAt: "2026-04-07"
  },
  {
    id: "item_07",
    title: "Dr. Martens 1460 Smooth Leather 8-Eye Boots",
    category: "Shoes & Boots",
    gender: "Unisex",
    brand: "Dr. Martens",
    size: "UK 8 / EU 42",
    color: "Black",
    material: "Smooth Genuine Leather",
    condition: "Good",
    conditionRating: 4,
    estimatedValue: 4600,
    ownerId: "usr_mahalakshmi",
    ownerName: "mahalakshmi",
    ownerAvatar: "https://cdn.phototourl.com/anon/2026-11-14-a098d9b9-713c-4538-ac7c-3317deadab52.jpg",
    location: "Koramangala, Bengaluru",
    distanceKm: 4.8,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Authentic AirWair bouncing soles with yellow welt stitch. Already softened and broken in nicely with zero blister discomfort.",
    swapPreferences: "Sneakers (New Balance 990v5, Salomon XT-6) or chore coats in L.",
    views: 295,
    likes: 54,
    createdAt: "2026-04-08"
  },
  {
    id: "item_08",
    title: "Sézane Gaspard Jumper Knit Cardigan",
    category: "Sweaters & Hoodies",
    gender: "Women",
    brand: "Sézane",
    size: "S",
    color: "Vintage Rose",
    material: "Mohair & Alpaca blend",
    condition: "Like New",
    conditionRating: 5,
    estimatedValue: 3900,
    ownerId: "yesudasu",
    ownerName: "yesudasu",
    ownerAvatar: "https://cdn.phototourl.com/member/2026-10-13-b925d917-33fb-426e-aec6-fc4ee08f8064.jpg",
    location: "vijayawada, Andhra Pradesh",
    distanceKm: 2.1,
    coordinates: { lat: 16.5062, lng: 80.6480 },
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Reversible knit cardigan with mother-of-pearl buttons. Can be worn with buttons in front or at back as a feminine jumper. Luxurious softness.",
    swapPreferences: "French fashion pieces (Rouje, Musier) or high-rise denim 27.",
    views: 175,
    likes: 38,
    createdAt: "2026-04-09"
  }
];

export const INITIAL_SWAP_REQUESTS = [
  {
    id: "swap_101",
    initiatorId: "mahalakshmi",
    initiatorName: "mahalakshmi",
    initiatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    receiverId: "usr_yesudasu",
    receiverName: "yesudasu",
    receiverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    offeredItemId: "item_02",
    offeredItemTitle: "Patagonia Synchilla Snap-T Fleece Pullover",
    offeredItemImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    offeredItemValue: 4200,
    requestedItemId: "item_01",
    requestedItemTitle: "Vintage Levi's 70500 Sherpa Denim Trucker Jacket",
    requestedItemImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    requestedItemValue: 3800,
    exchangeMethod: "In-Person Meetup",
    meetingLocation: "Bandra Carter Road Promenade, Mumbai",
    status: "accepted",
    valueDifference: 400,
    createdAt: "2026-04-10T10:15:00Z",
    notes: "Hey Elena! Love your Levi's Sherpa. My Patagonia fleece is pristine, let me know if this works for you."
  },
  {
    id: "swap_102",
    initiatorId: "usr_suryakiran",
    initiatorName: "surya kiran",
    initiatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    receiverId: "usr_yesudasu",
    receiverName: "yesudasu",
    receiverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    offeredItemId: "item_03",
    offeredItemTitle: "Reformation A-Line Linen Midi Summer Dress",
    offeredItemImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    offeredItemValue: 5500,
    requestedItemId: "item_05",
    requestedItemTitle: "Everlane The Cashmere Boxy Crewneck",
    requestedItemImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    requestedItemValue: 3600,
    exchangeMethod: "Courier Delivery",
    meetingLocation: "Postal Swap (Courier)",
    status: "pending",
    valueDifference: 1900,
    createdAt: "2026-04-11T09:30:00Z",
    notes: "Hi Elena, interested in your Everlane cashmere! Happy to send my brand-new Reformation dress. Let me know what you think!"
  }
];

export const INITIAL_MESSAGES = [
  {
    id: "msg_1",
    swapId: "swap_101",
    senderId: "usr_mahalakshmi",
    senderName: "mahalakshmi",
    text: "Hey Elena! Saw your Levi's Sherpa trucker. I sent over a swap proposal with my Patagonia fleece.",
    timestamp: "2026-04-10T10:20:00Z"
  },
  {
    id: "msg_2",
    swapId: "swap_101",
    senderId: "yesudasu",
    senderName: "yesudasu",
    text: "Hi Marcus! Oh I love that forest green colorway! The fit looks perfect for chilly evenings.",
    timestamp: "2026-04-10T10:32:00Z"
  },
  {
    id: "msg_3",
    swapId: "swap_101",
    senderId: "usr_mahalakshmi",
    senderName: "mahalakshmi",
    text: "Awesome! Would you prefer doing a local handoff at Carter Road or courier delivery?",
    timestamp: "2026-04-10T10:45:00Z"
  },
  {
    id: "msg_4",
    swapId: "swap_101",
    senderId: "usr_yesudasu",
    senderName: "yesudasu",
    text: "Carter Road Promenade this Saturday at 5 PM works great for me! Zero carbon emissions too 🌿",
    timestamp: "2026-04-10T11:00:00Z"
  }
];

export const CATEGORIES = [
  "All Categories",
  "Jackets & Coats",
  "Sweaters & Hoodies",
  "Dresses",
  "Tops & Shirts",
  "Pants & Trousers",
  "Shoes & Boots",
  "Bags & Accessories"
];

export const BRANDS = [
  "All Brands",
  "Levi's",
  "Patagonia",
  "Reformation",
  "Carhartt",
  "Everlane",
  "COS",
  "Dr. Martens",
  "Sézane",
  "Zara",
  "Nike",
  "Fabindia",
  "Vintage / Unbranded"
];

export const CONDITIONS = [
  "Brand New",
  "Like New",
  "Good",
  "Fair"
];

export const BRAND_TIERS = {
  luxury: { brands: ["Reformation", "Sézane", "Acne Studios", "Ganni"], baseMultiplier: 1.6 },
  heritage: { brands: ["Patagonia", "Carhartt", "Dr. Martens", "Levi's"], baseMultiplier: 1.3 },
  premiumMinimal: { brands: ["COS", "Everlane", "Arket", "Massimo Dutti", "Fabindia"], baseMultiplier: 1.15 },
  highStreet: { brands: ["Zara", "H&M", "Mango", "Uniqlo", "Vintage / Unbranded"], baseMultiplier: 0.9 }
};

export const CATEGORY_BASE_VALUES = {
  "Jackets & Coats": 3200,
  "Shoes & Boots": 3000,
  "Dresses": 2600,
  "Sweaters & Hoodies": 2200,
  "Pants & Trousers": 1900,
  "Tops & Shirts": 1400,
  "Bags & Accessories": 1600
};

export const CONDITION_MULTIPLIERS = {
  "Brand New": 1.25,
  "Like New": 1.05,
  "Good": 0.85,
  "Fair": 0.60
};
