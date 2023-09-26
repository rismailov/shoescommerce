import { TFilterOptions } from '@/pages/shop/products'
import { Accordion, Divider, Stack, Title } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './Filters.styles'
import { CategoryFilter } from './filters/CategoryFilter'
import { ColourFilter } from './filters/ColourFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'

export const Filters = ({ options }: { options: TFilterOptions }) => {
    const { t } = useTranslation()
    const { classes } = useStyles()

    return (
        <Stack
            w="25%"
            spacing="xs"
            sx={{
                position: 'sticky',
                height: 'calc(100vh - 140px)',
                overflowY: 'auto',
                top: 90,
                paddingRight: 10,
            }}
        >
            <Title order={2}>{t('Filters')}</Title>

            <Accordion
                defaultValue={['price', 'category', 'size', 'colour']}
                multiple
                variant="separated"
                chevron={<IconChevronDown size={18} strokeWidth={1.85} />}
                classNames={{
                    item: classes.item,
                    content: classes.content,
                    control: classes.control,
                    chevron: classes.chevron,
                }}
            >
                <CategoryFilter />
                <Divider />
                <PriceFilter />
                <Divider />
                <SizeFilter options={options.sizes} />
                <Divider />
                <ColourFilter options={options.colours} />
            </Accordion>
        </Stack>
    )
}
