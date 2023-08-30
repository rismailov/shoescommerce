import { MantineThemeOverride } from '@mantine/core'
import * as components from './components'

const theme: MantineThemeOverride = {
    primaryColor: 'orange',
    primaryShade: 8,
    loader: 'oval',
    cursorType: 'pointer',
    defaultGradient: { from: 'red', to: 'yellow', deg: 45 },
    fontSizes: { md: '15px' },
    // @ts-ignore
    components,
}

export default theme
