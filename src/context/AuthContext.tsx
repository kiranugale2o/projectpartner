import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────

interface UserType {
  id: number;
  name: string;
  contact: string;
  email: string;
  userimage: string | null;
  username: string;
  password: string;
  role: string;
  address: string;
  city: string;
  adharno: string;
  panno: string;
  rerano: string;
  experience: string;
  adharimage: string;
  panimage: string;
  status: string;
  loginstatus: string;
  paymentStatus: string | null;
  paymentId: string | null;
  registrationAmount: number | null;
  updated_at: string;
  created_at: string;
}

interface DateRangeType {
  startDate: Date | string | null;
  endDate: Date | string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoding: boolean;
  isPaymentSuccess: boolean;
  flatName: string | null;
  token: string | null;
  user: UserType | null;
  image: string | null;
  propertyinfoId: number | null;
  siteVisitModel: boolean;
  dateRange: DateRangeType;
  ticketNumber: number | null;

  setUser: (user: UserType | null) => void;
  setToken: (token: string | null) => void;
  setFlatName: (flatName: string | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setIsPaymentSuccess: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  setImage: (image: string | null) => void;
  setPropertyinfoId: (value: number | null) => void;
  setSiteVisitModel: (value: boolean) => void;
  setDateRange: (range: DateRangeType) => void;
  setTicketNumber: (value: number | null) => void;
}

// ────────────────────────────────────────────────
// Context + Provider
// ────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoding, setLoading] = useState(false);
  const [siteVisitModel, setSiteVisitModel] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [flatName, setFlatName] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [propertyinfoId, setPropertyinfoId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
  });
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const login = () => {
    setToken('');
    setIsLoggedIn(true);
  };

  const logout = () => {
    AsyncStorage.removeItem('salesPersonToken');
    AsyncStorage.removeItem('salesPersonInfo');
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
    setDateRange({ startDate: null, endDate: null });
  };

  const isLoggedInUser = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('salesPersonToken');
      const userInfo = await AsyncStorage.getItem('salesPersonInfo');

      if (userToken) {
        setToken(userToken);
        setIsLoggedIn(true);
      }

      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.log(`login error ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoding,
        setLoading,
        token,
        flatName,
        setFlatName,
        user,
        ticketNumber,
        setUser,
        setToken,
        setIsLoggedIn,
        login,
        logout,
        dateRange,
        setDateRange,
        isPaymentSuccess,
        setIsPaymentSuccess,
        image,
        setImage,
        propertyinfoId,
        setPropertyinfoId,
        siteVisitModel,
        setSiteVisitModel,
        setTicketNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
