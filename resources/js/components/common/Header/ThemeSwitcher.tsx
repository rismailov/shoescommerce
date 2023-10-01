import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/theme-provider'
import { IconMoon, IconSun } from '@tabler/icons-react'

export const ThemeSwitcher = () => {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? (
                <IconSun className="sprite sprite-md" />
            ) : (
                <IconMoon className="sprite sprite-md" />
            )}
        </Button>
    )
}
