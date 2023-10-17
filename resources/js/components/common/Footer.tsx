import { useTranslation } from 'react-i18next'

export const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer className="mt-14 bg-white border-t">
            <div className="container py-8 flex items-center justify-center">
                <p className="text-center text-accent-foreground text-lg">
                    {`${t('Shop by')} `}
                    <a
                        href="https://github.com/rismailov"
                        className="text-primary link-underline-hover"
                    >
                        rismailov
                    </a>
                    {`. ${t('All product images taken from')} `}
                    <a
                        href="https://nike.com"
                        className="text-primary link-underline-hover"
                    >
                        nike.com
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
