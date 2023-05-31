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
  const [user, setAuth] = React.useState(null);

  React.useEffect(() => {
    // Check if user data already exists in SecureStore.
    SecureStore.getItemAsync("user").then((userData) => {
      if (userData) {
        // If user data exists, set the user state to the retrieved data.
        setAuth(JSON.parse(userData));
      }
    });
  }, []);
  
  useProtectedRoute(user);


  const login = async (token, user) => {
    await SecureStore.setItemAsync("user", JSON.stringify({ token, ...user }));
    setAuth({ token, ...user });
  };

  const update = async (newUser) => {
    setAuth(newUser, ...user)
    await SecureStore.setItemAsync("user", JSON.stringify({ user }));
  }

  const logout = () => {
    // Remove user data from SecureStore.
    SecureStore.deleteItemAsync("user").then(() => {
      // Set the user state to null.
      setAuth(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, update, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
