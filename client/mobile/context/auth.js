import { useRouter, useSegments } from "expo-router";
import React from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/Home");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/dashboard/Dashboard");
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Check if user data already exists in SecureStore.
    SecureStore.getItemAsync("user")
      .then(userData => {
        if (userData) {
          const data = JSON.parse(userData);
          const timestamp = data.timestamp;
          const expiry = timestamp + (10 * 24 * 60 * 60 * 1000); // 10 days in ms
          
          if (Date.now() > expiry) {
            // Delete expired data
            SecureStore.deleteItemAsync("user");
          } else {
            // Data not expired yet, update state
            setUser(data);
          }
        } 
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useProtectedRoute(user);  

  const login = async (token, user) => {
    const data = {
      token, 
      ...user,
      timestamp: Date.now()
    };
    
    try {
      await SecureStore.setItemAsync("user", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      console.log(err); 
    }   
  };
  
  const update = async (newUser) => {
    setLoading(true);
    setUser(newUser);
    try {
      await SecureStore.setItemAsync("user", JSON.stringify({ user }));
    } catch (err) {
      console.log(err); 
    }
    setLoading(false);
  }

  const logout = () => {
    setLoading(true);
    // Remove user data from SecureStore.
    SecureStore.deleteItemAsync("user")
      .then(() => {
        // Set the user state to null.
        setUser(null);
      })
      .catch(err => {
        console.log(err); 
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider value={{ user, login, update, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}