import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
    wrapper: {
        width: '100%',
        height: '100%',
        minHeight: 500,
        position: 'relative',
        justifyContent: 'space-between',
        overflow: 'hidden',
        padding: '50px 80px',
        borderRadius: theme.radius.xl,
        background: theme.fn.linearGradient(
            180,
            theme.colors.dark[9],
            theme.colors.dark[5],
        ),
    },
}))
