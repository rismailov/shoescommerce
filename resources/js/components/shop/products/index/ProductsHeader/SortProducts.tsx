import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useFiltersStore, { TSortValue } from '@/lib/store/filters.store'
import { IconArrowsDownUp } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const sortOptions: { value: TSortValue; label: string }[] = [
    { value: 'date-desc', label: 'Date: New to old' },
    { value: 'date-asc', label: 'Date: Old to new' },
    { value: 'price-desc', label: 'Price: High to low' },
    { value: 'price-asc', label: 'Price: Low to high' },
]

export const SortProducts = () => {
    const { t } = useTranslation()

    const sort = useFiltersStore((s) => s.sort)
    const setSort = useFiltersStore((s) => s.setSort)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 hover:text-muted-foreground">
                    <span>{t('Sort By')}</span>

                    <IconArrowsDownUp size={15} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {sortOptions.map((opt) => (
                    <DropdownMenuCheckboxItem
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        checked={opt.value === sort}
                    >
                        {opt.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
