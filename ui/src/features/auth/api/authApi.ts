// src/features/auth/api/authApi.ts

import type { IUser } from '../../forum/types/forumTypes'; // Import IUser
import { findMockUser } from '../../forum/api/mockData'; // Import mock user data function

// Helper function to add a delay (re-used from forumApi)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API call to sign in a user.
 * In a real application, this would make a POST request to your backend
 * with credentials and receive a token or user data.
 * @param username The username to sign in.
 * @param password The password for the user.
 * @returns Promise resolving with the user object or null if sign-in fails.
 */
export const signInMock = async (username: string, password: string): Promise<IUser | null> => {
    console.log(`Attempting to sign in user: ${username} (mock)`);
    await delay(500); // Simulate network delay

    // Find the user in mock data
    const user = findMockUser(username, password);

    if (user) {
        console.log(`Mock sign in successful for user: ${username}`);
        // In a real app, you might strip the password here before returning
        // For mock, we'll just return the found user object
        return user;
    } else {
        console.log(`Mock sign in failed for user: ${username}`);
        return null; // Indicate sign-in failure
    }
};

// You would add other auth-related API calls here (e.g., signUp, signOut, checkAuth)
// export const signOutMock = async (): Promise<void> => { ... }
// export const checkAuthMock = async (): Promise<IUser | null> => { ... }
