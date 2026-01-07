import { useEffect } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { themes } from '@/lib/themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { color } = useThemeStore()

    useEffect(() => {
        const theme = themes.find((t) => t.name === color)
        if (theme) {
            const root = document.documentElement
            Object.entries(theme.cssVars).forEach(([key, value]) => {
                root.style.setProperty(key, value)
            })
        }
    }, [color])

    return <>{children}</>
}
