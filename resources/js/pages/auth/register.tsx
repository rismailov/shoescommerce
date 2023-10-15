import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSubmit } from '@/hooks/use-submit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Head } from '@inertiajs/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export default function Register() {
    const { t } = useTranslation()
    const { submit, isLoading } = useSubmit()

    const schema = z.object({
        fname: z
            .string()
            .min(2, t('validation.min', { label: t('First name'), count: 2 })),
        lname: z
            .string()
            .min(2, t('validation.min', { label: t('Last name'), count: 2 })),
        email: z.string().email(t('validation.email_invalid')),
        password: z
            .string()
            .min(8, t('validation.min', { label: t('Password'), count: 8 })),
        password_confirmation: z.string().min(
            8,
            t('validation.min', {
                label: t('Password confirmation'),
                count: 8,
            }),
        ),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    })

    const { setFocus } = form
    useEffect(() => {
        setFocus('fname')
    }, [setFocus])

    const onSubmit = async (data: z.infer<typeof schema>) =>
        await submit({
            form,
            method: 'post',
            url: route('auth.register.store'),
            data,
            stopLoadingOnSuccess: false,
        })

    return (
        <Form {...form}>
            <Head title={t('Register')} />

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx(['space-y-4', isLoading && 'disabled'])}
            >
                <div className="flex items-stretch space-x-3">
                    <FormField
                        control={form.control}
                        name="fname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('First name')}</FormLabel>

                                <FormControl>
                                    <Input
                                        required
                                        placeholder="John"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Last name')}</FormLabel>

                                <FormControl>
                                    <Input
                                        required
                                        placeholder="Doe"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('E-mail')}</FormLabel>

                            <FormControl>
                                <Input
                                    required
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Password')}</FormLabel>

                            <FormControl>
                                <Input
                                    required
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Confirm password')}</FormLabel>

                            <FormControl>
                                <Input
                                    required
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-12"
                    variant="accent"
                    size="lg"
                    loading={isLoading}
                >
                    {t('Register')}
                </Button>
            </form>
        </Form>
    )
}
