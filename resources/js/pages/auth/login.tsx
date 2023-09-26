import { useSubmit } from '@/hooks/useSubmit'
import { Head } from '@inertiajs/react'
import {
    Button,
    Checkbox,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    email: string
    password: string
    remember: boolean
}

export default function Login() {
    const { t } = useTranslation()
    const ref = useFocusTrap()

    const { submit, isLoading } = useSubmit()
    const form = useForm<TFormValues>({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const onSubmit = async (data: TFormValues) =>
        await submit({
            form,
            method: 'post',
            data,
            url: route('auth.login.store'),
        })

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            {isLoading && <LoadingOverlay visible={true} />}

            <Head title={t('Login')} />

            <Stack>
                <TextInput
                    ref={ref}
                    required
                    size="md"
                    type="email"
                    placeholder={t('E-mail')}
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    required
                    size="md"
                    placeholder={t('Password')}
                    {...form.getInputProps('password')}
                />

                <Checkbox
                    label={t('Remember me')}
                    {...form.getInputProps('remember')}
                />

                <Button
                    type="submit"
                    size="md"
                    color="dark"
                    disabled={Object.values(form.values).some((v) => v === '')}
                    fullWidth
                >
                    {t('Login')}
                </Button>
            </Stack>
        </form>
    )
}
