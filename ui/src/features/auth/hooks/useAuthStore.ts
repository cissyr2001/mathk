// src/features/auth/hooks/useAuthStore.ts

import { create } from "zustand";
import type { IUser } from "../../forum/types/forumTypes"; // Import IUser

interface AuthState {
  user: IUser | null; // Null if not signed in
  isLoading: boolean; // To indicate if auth state is being loaded
  error: string | null; // To store any auth errors
  signIn: (user: IUser) => void; // Action to set the signed-in user
  signOut: () => void; // Action to sign out the user
  // You might add async signIn/signOut actions that call the API later
  // asyncSignIn: (username: string, password: string) => Promise<void>;
  // asyncSignOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null, // Initial state: no user signed in
  isLoading: false, // Not loading initially
  error: null, // No error initially

  // Action to set the signed-in user
  signIn: (user) => set({ user, error: null }),

  // Action to sign out the user
  signOut: () => set({ user: null, error: null }),

  // You would add async actions here that call your auth API
  // asyncSignIn: async (username, password) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const user = await signInMock(username, password); // Call your mock or real API
  //     if (user) {
  //       set({ user, isLoading: false });
  //       // In a real app, you'd store token/user info in localStorage/cookies here
  //     } else {
  //       set({ user: null, isLoading: false, error: 'Invalid credentials' });
  //     }
  //   } catch (err: any) {
  //     set({ user: null, isLoading: false, error: err.message || 'Sign in failed' });
  //   }
  // },

  // asyncSignOut: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     await signOutMock(); // Call your mock or real API
  //     set({ user: null, isLoading: false });
  //     // In a real app, you'd clear token/user info from localStorage/cookies here
  //   } catch (err: any) {
  //      set({ isLoading: false, error: err.message || 'Sign out failed' });
  //   }
  // },
}));

export default useAuthStore;
