export type Theme = {
    name: string
    label: string
    activeColor: string
    cssVars: {
        '--primary': string
        '--primary-foreground': string
        '--ring': string
    }
}

export const themes: Theme[] = [
    {
        name: 'zinc',
        label: 'Zinc',
        activeColor: 'hsl(240 5.9% 10%)',
        cssVars: {
            '--primary': '0 0% 98%',
            '--primary-foreground': '240 5.9% 10%',
            '--ring': '240 5% 64.9%',
        },
    },
    {
        name: 'red',
        label: 'Red',
        activeColor: 'hsl(0 72.2% 50.6%)',
        cssVars: {
            '--primary': '0 72.2% 50.6%',
            '--primary-foreground': '0 85.7% 97.3%',
            '--ring': '0 72.2% 50.6%',
        },
    },
    {
        name: 'orange',
        label: 'Orange',
        activeColor: 'hsl(20.5 90.2% 48.2%)',
        cssVars: {
            '--primary': '20.5 90.2% 48.2%',
            '--primary-foreground': '60 9.1% 97.8%',
            '--ring': '20.5 90.2% 48.2%',
        },
    },
    {
        name: 'yellow',
        label: 'Yellow',
        activeColor: 'hsl(47.9 95.8% 53.1%)',
        cssVars: {
            '--primary': '47.9 95.8% 53.1%',
            '--primary-foreground': '26 83.3% 14.1%',
            '--ring': '47.9 95.8% 53.1%',
        },
    },
    {
        name: 'green',
        label: 'Green',
        activeColor: 'hsl(142.1 76.2% 36.3%)',
        cssVars: {
            '--primary': '142.1 76.2% 36.3%',
            '--primary-foreground': '355.7 100% 97.3%',
            '--ring': '142.1 76.2% 36.3%',
        },
    },
    {
        name: 'blue',
        label: 'Blue',
        activeColor: 'hsl(221.2 83.2% 53.3%)',
        cssVars: {
            '--primary': '221.2 83.2% 53.3%',
            '--primary-foreground': '210 40% 98%',
            '--ring': '221.2 83.2% 53.3%',
        },
    },
    {
        name: 'violet',
        label: 'Violet',
        activeColor: 'hsl(262.1 83.3% 57.8%)',
        cssVars: {
            '--primary': '262.1 83.3% 57.8%',
            '--primary-foreground': '210 40% 98%',
            '--ring': '262.1 83.3% 57.8%',
        },
    },
    {
        name: 'rose',
        label: 'Rose',
        activeColor: 'hsl(346.8 77.2% 49.8%)',
        cssVars: {
            '--primary': '346.8 77.2% 49.8%',
            '--primary-foreground': '355.7 100% 97.3%',
            '--ring': '346.8 77.2% 49.8%',
        },
    },
]
