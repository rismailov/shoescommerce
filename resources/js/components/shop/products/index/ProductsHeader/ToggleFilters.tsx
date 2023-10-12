import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export const ToggleFilters = ({
    showFilters,
    setShowFilters,
}: {
    showFilters: boolean
    setShowFilters: Dispatch<SetStateAction<boolean>>
}) => {
    const { t } = useTranslation()

    return (
        <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="hidden lg:flex items-center space-x-1 hover:text-muted-foreground"
        >
            <span>{showFilters ? t('Hide Filters') : t('Show Filters')}</span>

            <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="18"
                height="18"
                className="stroke-2 rotate-90 pt-px"
                fill="none"
            >
                <path stroke="currentColor" d="M21 8.25H10m-5.25 0H3"></path>
                <path
                    stroke="currentColor"
                    d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                    clipRule="evenodd"
                ></path>
                <path stroke="currentColor" d="M3 15.75h10.75m5 0H21"></path>
                <path
                    stroke="currentColor"
                    d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                    clipRule="evenodd"
                ></path>
            </svg>
        </button>
    )
}
