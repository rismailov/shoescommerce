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
import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    fname: string
    lname: string
    email: string
}

export default function EditProfile() {
    const { t } = useTranslation()
    const { profileData } = usePage<{ profileData: TFormValues }>().props

    const { submit, isLoading } = useSubmit()

    const form = useForm({
        defaultValues: profileData,
    })

    const { setFocus } = form
    useEffect(() => {
        setFocus('fname')
    }, [setFocus])

    const onSubmit = async (data: TFormValues) =>
        await submit({
            setError: form.setError,
            method: 'patch',
            url: route('settings.profile.update'),
            data,
        })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx([
                    'space-y-4',
                    'sm:max-w-sm md:max-w-md',
                    isLoading && 'disabled',
                ])}
            >
                <FormField
                    control={form.control}
                    name="fname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('First name')}</FormLabel>

                            <FormControl>
                                <Input required placeholder="John" {...field} />
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
                                <Input required placeholder="Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('E-mail')}</FormLabel>

                            <FormControl>
                                <Input
                                    type="email"
                                    required
                                    placeholder="johndoe@gmail.com"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-2">
                    <Button type="submit" variant="accent" loading={isLoading}>
                        {t('Update')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
