import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Head, Link } from '@inertiajs/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import ShopLayout from './ShopLayout'

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { t } = useTranslation()

    const routes = [
        {
            href: route('settings.profile.edit'),
            match: 'settings.profile.edit',
            label: t('Profile'),
            description: t('Update your profile information.'),
        },
        {
            href: route('settings.account.edit'),
            match: 'settings.account.edit',
            label: t('Account'),
            description: t('Update your account settings.'),
        },
    ]
    return (
        <ShopLayout>
            <div className="container">
                <Head title={t('Settings')} />

                <Card className="lg:p-2">
                    <CardHeader>
                        <CardTitle>{t('Settings')}</CardTitle>

                        <CardDescription className="text-lg">
                            {t(
                                'Manage your profile settings and set account preferences.',
                            )}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Separator className="mb-6" />

                        <div className="flex flex-col md:flex-row items-start space-y-10 md:space-y-0 md:space-x-10">
                            {/* sidebar navigation */}
                            <nav className="w-full flex flex-col space-y-1 sm:w-auto sm:flex-row sm:space-y-0 md:flex-col md:space-y-1 sm:min-w-[15rem]">
                                {routes.map(({ href, label, match }) => (
                                    <Button
                                        key={href}
                                        variant="ghost"
                                        asChild
                                        className={clsx([
                                            'justify-start',
                                            route().current(match)
                                                ? 'bg-muted hover:bg-muted'
                                                : 'hover:bg-transparent hover:underline',
                                        ])}
                                    >
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                ))}
                            </nav>

                            <div className="w-full flex flex-col">
                                {/* title */}
                                <h1 className="font-medium text-2xl">
                                    {routes.find((r) =>
                                        route().current(r.match),
                                    )?.label ?? t('Profile')}
                                </h1>

                                {/* description */}
                                <p className="text-muted-foreground">
                                    {routes.find((r) =>
                                        route().current(r.match),
                                    )?.description ??
                                        t('Update your profile information.')}
                                </p>

                                <Separator className="my-5 lg:max-w-lg" />

                                {children}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ShopLayout>
    )
}
