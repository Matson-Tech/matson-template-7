import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import type { User, WeddingData, WeddingWish } from "@/types/wedding";
import { WeddingContext } from "./WeddingContext";

// Mock Supabase functions for demo
const mockSupabase = {
  auth: {
    onAuthStateChange: (callback: any) => {
      // Mock implementation
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async (credentials: any) => ({ error: null }),
    signOut: async () => {},
  },
  from: (table: string) => ({
    select: (fields: string) => ({
      eq: (field: string, value: string) => ({
        maybeSingle: async () => ({ data: null, error: null }),
        order: (field: string, options: any) => ({
          limit: (count: number) => Promise.resolve({ data: [], error: null }),
        }),
      }),
    }),
    insert: async (data: any) => ({ error: null }),
    upsert: async (data: any, options: any) => ({ error: null }),
  }),
  channel: (name: string) => ({
    on: (event: string, config: any, callback: any) => ({ subscribe: () => {} }),
  }),
  removeChannel: (channel: any) => {},
};

const defaultWeddingData: WeddingData = {
  couple: {
    groomName: "Alec Richelieu",
    brideName: "Zola Bekker",
    weddingQuote: "Together We Journey – Two souls, one path, endless love.",
    image: "https://cdn.builder.io/api/v1/assets/c79c01ca17d34fecb5c1bc4d1f4c3383/image-438959?format=webp&width=800",
  },
  story: {
    title: "The A to Z's of Alec & Zola",
    content: "We met on a beautiful autumn day in the local coffee shop. What started as a chance encounter over spilled coffee became the beginning of our forever love story. After three wonderful years together, Alec proposed during a romantic sunset at our favorite beach, and Zola said yes with tears of joy.",
    image: "https://cdn.builder.io/api/v1/assets/c79c01ca17d34fecb5c1bc4d1f4c3383/image-438959?format=webp&width=800",
  },
  weddingDetails: {
    event1: {
      title: "Ceremony",
      date: "June 10, 2030",
      time: "5:00 PM",
      venue: "Spring Events Patio",
      address: "123 Spring Events Street, City, State 12345",
      addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
    },
    event2: {
      title: "Reception",
      date: "June 10, 2030",
      time: "7:30 PM",
      venue: "Spring Events Ballroom",
      address: "123 Spring Events Street, City, State 12345",
      addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
    },
    toKnow1: {
      title: "Dress Code",
      description: "Semi-formal attire requested. Ladies: cocktail dresses or elegant separates. Gentlemen: suit and tie or dress shirt with slacks.",
    },
    toKnow2: {
      title: "Gift Registry",
      description: "Your presence is our present! If you wish to give a gift, we have a registry at Target and Amazon.",
    },
    toKnow3: {
      title: "Song Requests",
      description: "Help us create the perfect playlist! Send us your song requests and we'll make sure to play your favorites.",
    },
  },
  schedule: [
    {
      id: "1",
      time: "4:30 PM",
      event: "Guest Arrival",
      description: "Welcome drinks and mingling",
    },
    {
      id: "2",
      time: "5:00 PM",
      event: "Ceremony",
      description: "Wedding ceremony begins",
    },
    {
      id: "3",
      time: "6:00 PM",
      event: "Cocktail Hour",
      description: "Photos and cocktails",
    },
    {
      id: "4",
      time: "7:30 PM",
      event: "Reception",
      description: "Dinner and dancing",
    },
  ],
  gallery: [
    {
      id: "0",
      url: "https://cdn.builder.io/api/v1/assets/c79c01ca17d34fecb5c1bc4d1f4c3383/image-438959?format=webp&width=800",
      caption: null,
      name: null,
    },
    {
      id: "1",
      url: "https://cdn.builder.io/api/v1/assets/c79c01ca17d34fecb5c1bc4d1f4c3383/image-438959?format=webp&width=800",
      caption: null,
      name: null,
    },
    {
      id: "2",
      url: "https://cdn.builder.io/api/v1/assets/c79c01ca17d34fecb5c1bc4d1f4c3383/image-438959?format=webp&width=800",
      caption: null,
      name: null,
    },
  ],
  moreInfo: {
    title: "Additional Information",
    content: "For dietary restrictions, please contact us at least one week before the wedding. We will have vegetarian and gluten-free options available. Children are welcome at both the ceremony and reception.",
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "wedding@aleczola.com",
    address: "123 Main Street, City, State 12345",
    addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
  },
  jeweller: {
    title: "Our Wedding Jeweller",
    description: "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
    shopName: "Diamond Dreams Jewellers",
    website: "https://www.diamonddreamsjewellers.com",
  },
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [weddingWishes, setWeddingWishes] = useState<Array<WeddingWish>>([
    { id: "1", name: "Sarah Johnson", message: "Wishing you both a lifetime of love and happiness!" },
    { id: "2", name: "Michael Chen", message: "Congratulations on your special day. May your love story continue to inspire!" },
    { id: "3", name: "Emma Williams", message: "So happy for you both! Can't wait to celebrate with you." },
  ]);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [globalIsLoading, setGlobalIsLoading] = useState(false);

  const updateWeddingData = async (data: Partial<WeddingData>): Promise<boolean> => {
    const updated = { ...weddingData, ...data };
    setWeddingData(updated);
    return true; // Mock successful save
  };

  const updateGalleryImage = async (
    file: File | null,
    imageCaption: string | null,
    index: number,
  ) => {
    // Mock implementation
  };

  const loadAllWeddingWishes = useCallback(async () => {
    // Mock implementation
  }, []);

  const saveData = async (data: WeddingData): Promise<boolean> => {
    setWeddingData(data);
    return true; // Mock successful save
  };

  const addWish = async (wish: WeddingWish) => {
    setWeddingWishes(prev => [wish, ...prev]);
  };

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: "mock-user-id",
      email,
      isAuthenticated: true,
    };
    setUser(mockUser);
    setIsLoggedIn(true);
    return { error: null };
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <WeddingContext.Provider
      value={{
        weddingData,
        weddingWishes,
        setWeddingWishes,
        user,
        session,
        isLoggedIn,
        globalIsLoading,
        updateWeddingData,
        updateGalleryImage,
        loadAllWeddingWishes,
        saveData,
        addWish,
        login,
        logout,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};
