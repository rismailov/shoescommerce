import { useSubmit } from '@/hooks/useSubmit'
import { Head } from '@inertiajs/react'
import {
    Button,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    fname: string
    lname: string
    email: string
    password: string
    password_confirmation: string
}

export default function Register() {
    const { t } = useTranslation()
    const ref = useFocusTrap()

    const { submit, isLoading } = useSubmit()
    const form = useForm<TFormValues>({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validate: {
            fname: (value) =>
                value.length < 2
                    ? t('validation.min', {
                          label: t('First name'),
                          count: 2,
                      })
                    : null,
            lname: (value) =>
                value.length < 2
                    ? t('validation.min', {
                          label: t('Last name'),
                          count: 2,
                      })
                    : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : t('validation.email_invalid'),
        },
    })

    const onSubmit = async (data: TFormValues) =>
        await submit({
            form,
            method: 'post',
            url: route('auth.register.store'),
            data,
        })

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            {isLoading && <LoadingOverlay visible={true} />}

            <Head title={t('Register')} />

            <Stack>
                <TextInput
                    required
                    ref={ref}
                    name="fname"
                    placeholder={t('First name')}
                    size="md"
                    {...form.getInputProps('fname')}
                />

                <TextInput
                    required
                    name="lname"
                    placeholder={t('Last name')}
                    size="md"
                    {...form.getInputProps('lname')}
                />

                <TextInput
                    required
                    type="email"
                    placeholder={t('E-mail')}
                    size="md"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    required
                    placeholder={t('Password')}
                    size="md"
                    {...form.getInputProps('password')}
                />

                <PasswordInput
                    required
                    placeholder={t('Confirm password')}
                    size="md"
                    {...form.getInputProps('password_confirmation')}
                />

                <Button
                    type="submit"
                    color="dark"
                    h={50}
                    size="md"
                    disabled={Object.values(form.values).some((v) => v === '')}
                    fullWidth
                >
                    {t('Register')}
                </Button>
            </Stack>
        </form>
    )
}
