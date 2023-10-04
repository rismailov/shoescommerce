import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { IconCheck } from '@tabler/icons-react'
import { Label } from './label'

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label: string
    /**
     * Making id required so that checkbox is checked when label clicked.
     *
     * In shadcn <Form /> this is done automatically using <FormLabel /> component, but
     * in this project checkboxes used more oftenly outside of forms so this approach is justified.
     */
    id: string
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, label, ...props }, ref) => (
    <div className="flex items-center space-x-2">
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'peer h-[17px] w-[17px] shrink-0 rounded-[4px] border-[1.5px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('flex items-center justify-center text-current')}
            >
                <IconCheck className="h-3 w-3" strokeWidth={4} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <Label {...(props.id && { htmlFor: props.id })}>{label}</Label>
    </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
