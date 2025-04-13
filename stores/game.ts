import { defineStore } from 'pinia';

export interface Game {
  id: string;
  name: string;
  description: string;
  genre: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  price: string;
  discount: number;
  rating: number;
  size: string;
  coverImage: string;
  screenshots: string[];
  status: 'installed' | 'not_installed' | 'downloading' | 'updating';
  version: string;
  installPath?: string;
  lastPlayed?: string;
  playTime?: number;
}

export interface Download {
  id: string;
  gameId: string;
  name: string;
  size: string;
  downloaded: string;
  progress: number;
  speed: string;
  timeLeft: string;
  status: 'downloading' | 'paused' | 'completed' | 'error';
  image: string;
  error?: string;
}

export interface GameState {
  games: Game[];
  featuredGames: string[];
  recentlyPlayed: string[];
  downloads: Download[];
  activeFilters: {
    genre: string | null;
    status: string | null;
    sortBy: 'name' | 'releaseDate' | 'rating' | 'playTime';
    sortOrder: 'asc' | 'desc';
  };
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    games: [],
    featuredGames: [],
    recentlyPlayed: [],
    downloads: [],
    activeFilters: {
      genre: null,
      status: null,
      sortBy: 'releaseDate',
      sortOrder: 'desc',
    },
  }),
  
  getters: {
    getGames: (state) => state.games,
    
    getGameById: (state) => (id: string) => {
      return state.games.find(game => game.id === id);
    },
    
    getInstalledGames: (state) => {
      return state.games.filter(game => game.status === 'installed');
    },
    
    getDownloadingGames: (state) => {
      return state.games.filter(game => game.status === 'downloading');
    },
    
    getActiveDownloads: (state) => {
      return state.downloads.filter(download => download.status === 'downloading');
    },
    
    getFeaturedGames: (state) => {
      return state.featuredGames.map(id => state.games.find(game => game.id === id)).filter(Boolean);
    },
    
    getRecentlyPlayedGames: (state) => {
      return state.recentlyPlayed
        .map(id => state.games.find(game => game.id === id))
        .filter(Boolean);
    },
    
    getFilteredGames: (state) => {
      let result = [...state.games];
      
      // 应用类型筛选
      if (state.activeFilters.genre) {
        result = result.filter(game => game.genre === state.activeFilters.genre);
      }
      
      // 应用状态筛选
      if (state.activeFilters.status) {
        result = result.filter(game => game.status === state.activeFilters.status);
      }
      
      // 应用排序
      const { sortBy, sortOrder } = state.activeFilters;
      result.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'releaseDate':
            comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
            break;
          case 'rating':
            comparison = a.rating - b.rating;
            break;
          case 'playTime':
            comparison = (a.playTime || 0) - (b.playTime || 0);
            break;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
      
      return result;
    },
  },
  
  actions: {
    setGames(games: Game[]) {
      this.games = games;
    },
    
    addGame(game: Game) {
      const existingIndex = this.games.findIndex(g => g.id === game.id);
      if (existingIndex >= 0) {
        this.games[existingIndex] = game;
      } else {
        this.games.push(game);
      }
    },
    
    updateGame(id: string, updates: Partial<Game>) {
      const index = this.games.findIndex(game => game.id === id);
      if (index >= 0) {
        this.games[index] = { ...this.games[index], ...updates };
      }
    },
    
    removeGame(id: string) {
      this.games = this.games.filter(game => game.id !== id);
    },
    
    setGameStatus(id: string, status: Game['status']) {
      const index = this.games.findIndex(game => game.id === id);
      if (index >= 0) {
        this.games[index].status = status;
      }
    },
    
    addDownload(download: Download) {
      const existingIndex = this.downloads.findIndex(d => d.id === download.id);
      if (existingIndex >= 0) {
        this.downloads[existingIndex] = download;
      } else {
        this.downloads.push(download);
      }
      
      // 更新相关游戏状态
      this.setGameStatus(download.gameId, 'downloading');
    },
    
    updateDownload(id: string, updates: Partial<Download>) {
      const index = this.downloads.findIndex(download => download.id === id);
      if (index >= 0) {
        this.downloads[index] = { ...this.downloads[index], ...updates };
        
        // 如果下载完成，更新游戏状态
        if (updates.status === 'completed') {
          this.setGameStatus(this.downloads[index].gameId, 'installed');
        }
      }
    },
    
    removeDownload(id: string) {
      const download = this.downloads.find(d => d.id === id);
      if (download) {
        // 如果下载未完成，将游戏状态设置为未安装
        if (download.status !== 'completed') {
          this.setGameStatus(download.gameId, 'not_installed');
        }
        
        this.downloads = this.downloads.filter(d => d.id !== id);
      }
    },
    
    addToRecentlyPlayed(gameId: string) {
      // 从列表中移除该游戏（如果存在）
      this.recentlyPlayed = this.recentlyPlayed.filter(id => id !== gameId);
      
      // 将游戏添加到列表开头
      this.recentlyPlayed.unshift(gameId);
      
      // 限制列表长度为10
      if (this.recentlyPlayed.length > 10) {
        this.recentlyPlayed = this.recentlyPlayed.slice(0, 10);
      }
      
      // 更新游戏的最后游玩时间
      const game = this.games.find(g => g.id === gameId);
      if (game) {
        game.lastPlayed = new Date().toISOString();
      }
    },
    
    setFeaturedGames(gameIds: string[]) {
      this.featuredGames = gameIds;
    },
    
    updateFilters(filters: Partial<GameState['activeFilters']>) {
      this.activeFilters = { ...this.activeFilters, ...filters };
    },
  },
});