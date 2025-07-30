import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import SignIn from './src/auth/signIn';
import ForgotPassword from './src/auth/ForgetPassword';
import EmailVerification from './src/auth/EmailVarification';
import PasswordResetMessage from './src/auth/PasswordResetMessage';
import SetNewPassword from './src/auth/SetPassword';
import PasswordChangedSuccess from './src/auth/PasswordChangedSuccess';
import AuthStack from './src/navigation/AuthStack';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import AppStack from './src/navigation/AppStack';
import Loader from './src/component/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';

// import {requestUserPermission} from './src/firebaseNotification';

// import BellIcon from './src/component/Bellicon'; // unused in this code

// App Entry Point
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </AuthProvider>
  );
}

// Separate component that consumes the context safely
// function MainApp() {
//   const auth = useContext(AuthContext);
//   const [userData, setUserData] = useState<any>(null);
//   const [isFetching, setIsFetching] = useState(true);

//   // Fetch user details from API
//   const showDetails = async () => {
//     try {
//       setIsFetching(true);
//       const res = await fetch(
//         `https://api.reparv.in/admin/salespersons/get/${auth?.user?.id}`,
//         {
//           method: 'GET',
//           credentials: 'include',
//           headers: { 'Content-Type': 'application/json' },
//         },
//       );
//       const data = await res.json();
//       console.log('Fetched user data:', data);
//       setUserData(data);
//     } catch (e) {
//       console.log('Error fetching user data:', e);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (auth?.user?.id) {
//       showDetails();
//     }
//   }, [auth?.user?.id]);

//   // Handle loading states
//   if (!auth || auth.isLoding || isFetching) {
//     return <Loader />;
//   }

//   // Not authenticated
//   if (auth.token === null) {
//     return <AuthStack />;
//   }

//   // Wait until userData is fetched
//   if (!userData) {
//     return <Loader />;
//   }

//   // Check if KYC is incomplete (adharno missing or empty)
//   const isKYCIncomplete =
//     !userData.adharno || userData.adharno.trim().length === 0;

//   // Return AppStack with initialRouteName based on KYC status
//   return <AppStack initialRouteName={isKYCIncomplete ? 'KYC' : 'MainTabs'} />;
// }

function MainApp() {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth?.user?.id && auth.token) {
        try {
          const res = await fetch(
            `https://api.reparv.in/admin/salespersons/get/${auth.user.id}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            },
          );
          const data = await res.json();
          setUserData(data);
        } catch (err) {
          console.log('Error fetching user details:', err);
        } finally {
          setIsFetching(false);
        }
      } else {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, [auth?.user?.id, auth?.token]);

  if (auth?.isLoding || isFetching) return <Loader />;
  if (!auth?.token || !auth?.user) return <AuthStack />;
  if (!userData) return <Loader />;

  const isKYCIncomplete =
    !userData.adharno || userData.adharno.trim().length === 0;

  return <AppStack initialRouteName={isKYCIncomplete ? 'KYC' : 'MainTabs'} />;
}

