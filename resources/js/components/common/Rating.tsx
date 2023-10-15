import tailwindTheme from '@/lib/tailwind-theme.js'
import {
    RatingProps,
    Rating as ReactRating,
    Star,
} from '@smastrom/react-rating'

const getItemStyles = (isPrimaryColor: boolean) => ({
    activeFillColor:
        tailwindTheme.theme?.colors && isPrimaryColor
            ? // @ts-ignore: property DEFAULT doesn't exist
              (tailwindTheme.theme.colors.primary.DEFAULT as string)
            : // @ts-ignore: property foreground doesn't exist
              (tailwindTheme.theme.colors.accent.foreground as string),
    inactiveFillColor: '#DEE2E6',
    itemShapes: Star,
})

export const Rating = ({
    isPrimaryColor = true,
    ...rest
}: RatingProps & { isPrimaryColor?: boolean }) => {
    const itemStyles = getItemStyles(isPrimaryColor)

    return <ReactRating {...rest} itemStyles={itemStyles} />
}
