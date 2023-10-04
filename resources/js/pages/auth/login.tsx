import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

export default function Login() {
    const { t } = useTranslation()
    const { submit, isLoading } = useSubmit()

    const schema = z.object({
        email: z.string().email(t('validation.email_invalid')),
        password: z
            .string()
            .min(8, t('validation.min', { label: t('Password'), count: 8 })),
        remember: z.boolean(),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const { setFocus } = form
    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    const onSubmit = async (data: z.infer<typeof schema>) =>
        await submit({
            setError: form.setError,
            reset: form.reset,
            method: 'post',
            url: route('auth.login.store'),
            data,
            stopLoadingOnSuccess: false,
        })

    return (
        <Form {...form}>
            <Head title={t('Login')} />

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx(['space-y-4', isLoading && 'disabled'])}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    required
                                    type="email"
                                    placeholder={t('E-mail')}
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
                            <FormControl>
                                <Input
                                    required
                                    type="password"
                                    placeholder={t('Password')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem>
                            <div className="pt-1 flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        id="remember"
                                        label={t('Remember me')}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-1">
                    <Button
                        type="submit"
                        className="w-full h-12"
                        variant="accent"
                        size="lg"
                        loading={isLoading}
                    >
                        {t('Login')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
