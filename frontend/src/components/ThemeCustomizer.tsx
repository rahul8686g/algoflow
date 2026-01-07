import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useThemeStore, ThemeColor } from "@/stores/themeStore"
import { themes } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export function ThemeCustomizer() {
    const { color: activeColorName, setColor } = useThemeStore()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Paintbrush className="h-4 w-4" />
                    <span className="sr-only">Customize theme</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] p-6" align="end">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Theme Customizer</h4>
                        <p className="text-sm text-muted-foreground">
                            Customize the look of levels and buttons.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                            Theme Color
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {themes.map((theme) => {
                                const isActive = activeColorName === theme.name
                                return (
                                    <Button
                                        key={theme.name}
                                        variant="outline"
                                        size="sm"
                                        className={cn(
                                            "justify-start font-normal",
                                            isActive && "border-2 border-primary bg-accent/50"
                                        )}
                                        onClick={() => setColor(theme.name as ThemeColor)}
                                    >
                                        <span
                                            className="mr-2 flex h-4 w-4 shrink-0 -translate-x-1 items-center justify-center rounded-full"
                                            style={{ backgroundColor: theme.activeColor }}
                                        >
                                            {isActive && (
                                                <Check className="h-3 w-3 text-white" />
                                            )}
                                        </span>
                                        {theme.label}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
