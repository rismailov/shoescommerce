import useFiltersStore from '@/lib/store/filters.store'
import { TOption } from '@/types'
import { Checkbox, ColorSwatch, Group, Stack } from '@mantine/core'
import { FilterLayout } from '../layouts/FilterLayout'

export const ColourFilter = ({
    options,
}: {
    options: TOption<{ hex: string }>[]
}) => {
    const colours = useFiltersStore((s) => s.colours)
    const setColours = useFiltersStore((s) => s.setColours)

    return (
        <FilterLayout value="colour" title="Colour">
            <Checkbox.Group
                value={colours}
                onChange={setColours}
                size="xs"
                sx={{
                    '.mantine-Stack-root': {
                        paddingTop: 0,
                    },
                }}
            >
                <Stack spacing="xs">
                    {options.map(({ value, label, hex }) => (
                        <Checkbox
                            key={value}
                            size="xs"
                            w="100%"
                            styles={{
                                body: {
                                    width: '100%',
                                },
                                labelWrapper: {
                                    width: '100%',
                                },
                            }}
                            label={
                                <Group spacing={8}>
                                    <ColorSwatch size={17} color={hex} />

                                    {label}
                                </Group>
                            }
                            value={value}
                        />
                    ))}
                </Stack>
            </Checkbox.Group>
        </FilterLayout>
    )
}
