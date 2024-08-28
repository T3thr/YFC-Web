import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Initial state for layout
const initialState = {
  theme: 'system',
  drawerOpen: false,
};

// Create the layout store with persistence
export const layoutStore = create(
  persist(
    () => initialState,
    {
      name: 'layoutStore',
    }
  )
);

// Layout service hook
export default function useLayoutService() {
  const { theme, drawerOpen } = layoutStore();

  return {
    theme,
    drawerOpen,
    toggleTheme: () => {
      layoutStore.setState({
        theme: theme === 'dark' ? 'light' : 'dark',
      });
    },
    toggleDrawer: () => {
      layoutStore.setState({
        drawerOpen: !drawerOpen,
      });
    },
  };
}
