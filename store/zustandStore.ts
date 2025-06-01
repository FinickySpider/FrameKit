import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for selection context
export type SelectionContext = {
  type: string; // e.g., 'asset', 'object', etc.
  id: string;
  [key: string]: any;
} | null;

// Zustand state interface
interface UIState {
  activeToolKey: string | null;
  setActiveToolKey: (key: string | null) => void;
  selection: SelectionContext;
  setSelection: (selection: SelectionContext) => void;
  reset: () => void;
}

// AsyncStorage wrapper for zustand persist
const zustandAsyncStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeToolKey: null,
      setActiveToolKey: (key: string | null) => set({ activeToolKey: key }),
      selection: null,
      setSelection: (selection: SelectionContext) => set({ selection }),
      reset: () => set({ activeToolKey: null, selection: null }),
    }),
    {
      name: 'ui-store',
      storage: zustandAsyncStorage as any,
      partialize: (state: any) => ({
        activeToolKey: state.activeToolKey,
        selection: state.selection,
      }),
      version: 1,
    }
  )
);

// Usage example:
// const { activeToolKey, setActiveToolKey, selection, setSelection } = useUIStore();
