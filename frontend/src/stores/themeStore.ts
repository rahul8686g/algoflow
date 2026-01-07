import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeColor = 'zinc' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'indigo' | 'violet' | 'purple' | 'pink' | 'rose'

interface ThemeStore {
    color: ThemeColor
    setColor: (color: ThemeColor) => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            color: 'blue',
            setColor: (color) => set({ color }),
        }),
        {
            name: 'theme-storage',
        }
    )
)
