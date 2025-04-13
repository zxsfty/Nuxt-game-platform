import { defineStore } from 'pinia';

export interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  isLoggedIn: boolean;
  token: string | null;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
  };
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    username: null,
    email: null,
    avatar: null,
    isLoggedIn: false,
    token: null,
    preferences: {
      darkMode: true,
      notifications: true,
    },
  }),
  
  getters: {
    getUser: (state) => state,
    isAuthenticated: (state) => state.isLoggedIn && !!state.token,
    getUserPreferences: (state) => state.preferences,
  },
  
  actions: {
    setUser(userData: Partial<UserState>) {
      if (userData.id) this.id = userData.id;
      if (userData.username) this.username = userData.username;
      if (userData.email) this.email = userData.email;
      if (userData.avatar) this.avatar = userData.avatar;
      if (userData.token) this.token = userData.token;
      if (userData.isLoggedIn !== undefined) this.isLoggedIn = userData.isLoggedIn;
    },
    
    updatePreferences(preferences: Partial<UserState['preferences']>) {
      this.preferences = { ...this.preferences, ...preferences };
    },
    
    login(token: string, userData: Partial<UserState>) {
      this.token = token;
      this.isLoggedIn = true;
      this.setUser(userData);
      // 在实际应用中，这里可能会存储token到localStorage或cookie
    },
    
    logout() {
      this.id = null;
      this.username = null;
      this.email = null;
      this.avatar = null;
      this.isLoggedIn = false;
      this.token = null;
      // 在实际应用中，这里可能会清除localStorage或cookie中的token
    },
  },
});