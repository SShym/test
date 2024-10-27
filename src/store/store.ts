import { create } from 'zustand';
import { getHeroDetails, getHeroes } from '../api';
import { Hero, HeroDetails } from '../components/hero-list/types';

export interface State {
  loading: boolean;
  error: boolean;
  heroes: Hero[];
  nextPage: boolean,

  fetchHeroes: (page: number) => Promise<void>;
  fetchHero: (heroId: number) => Promise<HeroDetails>; 
}

export const useStore = create<State>((set) => ({
  heroes: [],
  nextPage: true,
  error: false,
  loading: false,

  fetchHeroes: async (page: number) => {
    try {
      // Set loading state to true and reset error state before starting the request
      set({ loading: true, error: false });
  
      // Check if the page number is less than 1. If so, stop the function execution.
      if (page < 1) {
        set({ loading: false }); // Set loading state to false
        return; // Exit the function
      }
  
      // Perform an asynchronous API call to fetch heroes for the specified page
      const response = await getHeroes(page);
  
      // Set the nextPage value from the API response, indicating the next available page
      set({ nextPage: response.data.next }); 
      // Set the list of heroes retrieved from the API response
      set({ heroes: response.data.results });
    } catch (error) {
      // In case of an error, set the error state to true
      set({ error: true });
    } finally {
      // Regardless of the outcome, after the request completes, set loading state to false
      set({ loading: false });
    }
  },
  
  fetchHero: async (heroId: number) => {
    try {
      set({ loading: true, error: false });
      const response = await getHeroDetails(heroId);
      return response.data
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
