import { filtersAtom } from '@/lib/store/filters.atom'
import { TOption } from '@/types'
import { Checkbox, ColorSwatch, Group, Stack } from '@mantine/core'
import { useAtom } from 'jotai'
import { FilterLayout } from '../layouts/FilterLayout'

export const ColourFilter = ({
    options,
}: {
    options: TOption<{ hex: string }>[]
}) => {
    const [{ colours }, setFilters] = useAtom(filtersAtom)

    return (
        <FilterLayout value="colour" title="Colour">
            <Checkbox.Group
                value={colours}
                onChange={(v) =>
                    setFilters((prev) => ({ ...prev, colours: v }))
                }
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
