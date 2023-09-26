import { Header } from '@/components/common/Header/Header'
import { slideDown } from '@/lib/mantine/transitions'
import { usePage } from '@inertiajs/react'
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AppLayout({ children }: PropsWithChildren) {
    const [queryClient] = useState<QueryClient>(() => new QueryClient())

    /* Mantine color scheme */
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    /* Locale */
    const { locale } = usePage().props
    const { i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale])

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    primaryColor: 'orange',
                    cursorType: 'pointer',
                    defaultGradient: { from: 'red', to: 'yellow', deg: 45 },
                    fontSizes: { md: '15px' },
                    defaultRadius: 'md',
                    components: {
                        Input: {
                            defaultProps: {
                                variant: 'filled',
                                spellCheck: false,
                            },

                            styles: (theme) => {
                                return {
                                    input: {
                                        transition: 'none',

                                        '&:focus, &:focus-within': {
                                            borderColor:
                                                'transparent !important',
                                            '&:not([readonly])': {
                                                background:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.colors.dark[6]
                                                        : theme.white,
                                                boxShadow: `0 0 0 0.1rem ${theme.fn.primaryColor()}`,
                                            },
                                        },

                                        '&[data-invalid]': {
                                            background:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.dark[6]
                                                    : theme.white,
                                            boxShadow: `0 0 0 0.01rem ${theme.fn.themeColor(
                                                'red',
                                            )}`,

                                            ':focus': {
                                                boxShadow: `0 0 0 0.05rem ${theme.fn.themeColor(
                                                    'red',
                                                )}`,
                                            },
                                        },

                                        '&[data-with-icon="true"]': {
                                            paddingLeft: 40,
                                        },
                                    },

                                    icon: {
                                        marginLeft: 2,
                                    },
                                }
                            },
                        },

                        Container: {
                            defaultProps: {
                                size: 1200,
                            },

                            styles: (theme) => ({
                                root: {
                                    height: '100%',
                                },
                            }),
                        },

                        Checkbox: {
                            defaultProps: {
                                radius: 'sm',
                                size: 'sm',
                            },
                            styles: (theme) => ({
                                label: {
                                    paddingLeft: 8,
                                    fontSize: theme.fontSizes.md,
                                    display: 'inline-block',
                                    paddingBottom: 3,
                                },
                                inner: {
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    marginTop: 1,
                                },
                                input: {
                                    transition: 'none',
                                    width: '1.1rem',
                                    height: '1.1rem',
                                    '&:checked': {
                                        background:
                                            theme.colorScheme === 'light'
                                                ? theme.other.bgDark
                                                : undefined,
                                        '+ .___ref-icon': {
                                            color:
                                                theme.colorScheme === 'dark'
                                                    ? theme.black
                                                    : undefined,
                                        },
                                    },
                                },
                                icon: {
                                    transition: 'none',
                                    padding: 0.5,
                                },
                            }),
                        },

                        Table: {
                            defaultProps: {
                                fontSize: 'md',
                                verticalSpacing: 'md',
                            },
                        },

                        Overlay: {
                            defaultProps: {
                                zIndex: 10,
                            },
                        },

                        Menu: {
                            defaultProps: {
                                position: 'bottom-end',
                                transitionProps: {
                                    transition: slideDown,
                                    duration: 0,
                                },
                            },

                            styles: (theme) => ({
                                dropdown: {
                                    padding: theme.spacing.xs + ' !important',
                                },

                                item: {
                                    fontWeight: 500,
                                },
                            }),
                        },

                        ActionIcon: {
                            defaultProps: {
                                size: 'lg',
                            },

                            styles: (theme) => ({
                                root: {
                                    '&[data-expanded]': {
                                        background: theme.colors.gray[0],
                                    },
                                    color: theme.colors.dark[9],
                                },
                            }),
                        },
                    },
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <Header />

                    <Notifications color="dark" position="bottom-right" />

                    {children}
                </QueryClientProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
