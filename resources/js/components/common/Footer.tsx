import { useTranslation } from 'react-i18next'

export const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer className="mt-14 bg-accent-foreground">
            <div className="container py-10 flex flex-col items-center space-y-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 123 47"
                    fill="none"
                    className="w-14"
                >
                    <path
                        d="M122.397 0L32.8526 41.7402C25.4272 45.1795 19.19 46.9047 14.1462 46.9047C8.4343 46.9047 4.28807 44.7161 1.71772 40.3333C0.101049 37.5193 -0.373243 33.9516 0.289745 29.6246C0.952733 25.2976 2.7173 20.6915 5.57325 15.7894C7.95491 11.8253 11.8563 6.61613 17.2877 0.15633C15.4455 3.33132 14.0945 6.81745 13.2894 10.4741C11.8614 17.1461 13.1466 22.0426 17.1449 25.1692C19.0472 26.6264 21.6635 27.3578 24.9988 27.3578C27.6609 27.3578 30.6597 26.8888 33.995 25.9509L122.397 0Z"
                        fill="white"
                    />
                </svg>

                <p className="text-center text-accent/75 text-lg font-light">
                    {`${t('Shop by')} `}
                    <a
                        href="https://github.com/rismailov"
                        className="text-primary-lighter link-underline-hover"
                    >
                        rismailov
                    </a>
                    {`. ${t('All product images taken from')} `}
                    <a
                        href="nike.com"
                        className="text-primary-lighter link-underline-hover"
                    >
                        nike.com
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
