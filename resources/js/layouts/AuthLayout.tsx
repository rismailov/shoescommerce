import { Separator } from '@/components/ui/separator'
import { Link, usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import AppLayout from './AppLayout'

export default function AuthLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation()
    const { url } = usePage()

    return (
        <AppLayout>
            <div className="container">
                <div className="flex flex-col items-center justify-center pt-20 pb-[40px]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={url}
                            className="text-center text-xl text-muted-foreground"
                            initial={{ y: 3, opacity: 0 }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: { duration: 0.5 },
                            }}
                            exit={{
                                y: -3,
                                opacity: 0,
                                transition: { duration: 0.1 },
                            }}
                            transition={{
                                type: 'tween',
                                ease: 'easeIn',
                            }}
                        >
                            {url.includes('login')
                                ? t('Login to enjoy full services.')
                                : t(
                                      'Join us to get our newsletters, discounts and more!',
                                  )}
                        </motion.span>
                    </AnimatePresence>

                    <Separator className="max-w-lg my-5" />

                    <div className="flex flex-col relative rounded-md min-w-[400px]">
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight transition-colors">
                                {url.includes('login')
                                    ? t('Login')
                                    : t('Register')}
                            </h1>

                            <p className="text-xl">
                                <span className="text-secondary-foreground">
                                    {t('or') + ' '}
                                </span>

                                <Link
                                    href={route(
                                        `auth.${
                                            url.includes('login')
                                                ? 'register'
                                                : 'login'
                                        }.create`,
                                    )}
                                    className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                                >
                                    {url.includes('login')
                                        ? t('create a free account')
                                        : t('login with your account')}
                                </Link>
                            </p>

                            <div className="pt-3 px-5 w-full">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
