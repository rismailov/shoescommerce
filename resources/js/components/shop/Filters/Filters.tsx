import { TOption } from '@/types'
import { Accordion, Divider, Stack, Title } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useStyles } from './Filters.styles'
import { CategoryFilter } from './filters/CategoryFilter'
import { ColourFilter } from './filters/ColourFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'
import axios from '@/lib/axios'

type TOptionsResponse = {
    size: TOption[]
    colour: TOption<{ hex: string }>[]
}

export const Filters = () => {
    const { classes } = useStyles()

    const { data: options, isSuccess } = useQuery({
        queryKey: ['product_property_options'],
        queryFn: async (): Promise<TOptionsResponse> => {
            const resp = await axios.get(route('options.product-property'))
            return resp.data
        },
    })

    return (
        <Stack
            w="25%"
            spacing="xs"
            sx={{
                position: 'sticky',
                height: 'calc(100vh - 120px)',
                overflowY: 'auto',
                top: 90,
                paddingRight: 10,
            }}
        >
            <Title order={2}>Filters</Title>
            <Accordion
                defaultValue={['price', 'category']}
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

                {isSuccess && (
                    <>
                        <Divider />

                        <SizeFilter options={options.size} />

                        <Divider />

                        <ColourFilter options={options.colour} />
                    </>
                )}
            </Accordion>
        </Stack>
    )
}
