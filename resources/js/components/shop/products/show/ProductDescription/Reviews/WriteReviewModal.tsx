import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useSubmit } from '@/hooks/use-submit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, usePage } from '@inertiajs/react'
import { Rating, Star } from '@smastrom/react-rating'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export const WriteReviewModal = ({
    open,
    setOpen,
    productID,
}: {
    productID: number
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const { t } = useTranslation()
    const { toast } = useToast()
    const { user } = usePage().props

    const schema = z.object({
        title: z
            .string()
            .min(
                2,
                t('validation.min', { label: t('Review title'), count: 2 }),
            ),
        text: z
            .string()
            .min(2, t('validation.min', { label: t('Review text'), count: 2 })),
        stars: z
            .number()
            .min(1, t('Please rate this product') + '.')
            .max(5),
    })

    const { submit, isLoading } = useSubmit()
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            text: '',
            stars: 0,
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) =>
        await submit({
            form,
            method: 'post',
            url: route('products.reviews.store', {
                product: productID,
            }),
            data,
            options: {
                preserveScroll: true,
                preserveState: true,
            },
            resetFormOnSuccess: true,
            onSuccess: () => setOpen(false),
            onError: (errors) => {
                toast({ variant: 'error', description: errors[0] })
            },
        })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    form.setFocus('title')
                }}
            >
                <DialogHeader>
                    <DialogTitle>{t('Write a Review')}</DialogTitle>
                </DialogHeader>

                {user ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={clsx(isLoading && 'disabled')}
                        >
                            <div className="flex flex-col space-y-5">
                                {/* rate with stars */}
                                <FormField
                                    control={form.control}
                                    name="stars"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Rating
                                                style={{ maxWidth: 150 }}
                                                value={field.value}
                                                onChange={field.onChange}
                                                itemStyles={{
                                                    activeFillColor: '#000',
                                                    inactiveFillColor:
                                                        '#DEE2E6',
                                                    itemShapes: Star,
                                                }}
                                            />

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* title */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('Review title')}
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder={t(
                                                        'Enter review title',
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* text */}
                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('Review text')}
                                            </FormLabel>

                                            <FormControl>
                                                <Textarea
                                                    placeholder={t(
                                                        'Enter review text',
                                                    )}
                                                    className="resize-none"
                                                    rows={5}
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    variant="accent"
                                    loading={isLoading}
                                    className="self-start"
                                >
                                    {t('Submit')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div className="flex flex-col space-y-4">
                        <p>
                            {t('You need to be authorized to write a review.')}
                        </p>

                        <div className="flex items-center">
                            <Button variant="link" asChild>
                                <Link href={route('auth.login.create')}>
                                    {t('Login')}
                                </Link>
                            </Button>

                            <Separator
                                orientation="vertical"
                                className="mx-3"
                            />

                            <Button variant="link" asChild>
                                <Link href={route('auth.register.create')}>
                                    {t('Register')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
