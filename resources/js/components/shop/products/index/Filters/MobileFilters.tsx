import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { TFilterOptions } from '@/pages/shop/products'
import { useTranslation } from 'react-i18next'
import { FiltersBase } from './FiltersBase'

export const MobileFilters = ({ options }: { options: TFilterOptions }) => {
    const { t } = useTranslation()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="secondary"
                    size="sm"
                    className="lg:hidden rounded-full border bg-white"
                >
                    <span>{t('Filters')}</span>

                    <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 24 24"
                        role="img"
                        width="18"
                        height="18"
                        className="ml-1 stroke-2 rotate-90 pt-px"
                        fill="none"
                    >
                        <path
                            stroke="currentColor"
                            d="M21 8.25H10m-5.25 0H3"
                        ></path>
                        <path
                            stroke="currentColor"
                            d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                            clipRule="evenodd"
                        ></path>
                        <path
                            stroke="currentColor"
                            d="M3 15.75h10.75m5 0H21"
                        ></path>
                        <path
                            stroke="currentColor"
                            d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-2 w-full xs:w-auto max-w-sm">
                <SheetHeader className="py-3 px-6 border-b">
                    <SheetTitle>{t('Filters')}</SheetTitle>
                </SheetHeader>

                <ScrollArea className="w-full h-full pb-10">
                    <div className="p-6">
                        <FiltersBase options={options} />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
