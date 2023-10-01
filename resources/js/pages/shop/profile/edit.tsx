// import { useSubmit } from '@/hooks/useSubmit'
import { Head, usePage } from '@inertiajs/react'
import { Button, Container, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    fname: string
    lname: string
    email: string
}

const isLoading = false

export default function EditProfile() {
    const { t } = useTranslation()
    const { profileData } = usePage<{ profileData: TFormValues }>().props
    const ref = useFocusTrap()

    // const { submit, isLoading } = useSubmit()
    const form = useForm<TFormValues>({
        initialValues: profileData,
    })

    const onSubmit = async (data: TFormValues) => {
        console.log(data)

        // await submit({
        //     form,
        //     method: 'patch',
        //     url: route('profile.update'),
        //     data,
        // })
    }

    return (
        <Container>
            <Head title={t('Profile')} />

            <Title order={2}>{t('Edit profile')}</Title>

            <form
                onSubmit={form.onSubmit(onSubmit)}
                className={clsx(isLoading && 'disabled')}
            >
                <Stack mt="xl" align="start" sx={{ input: { minWidth: 350 } }}>
                    <TextInput
                        ref={ref}
                        label={t('First name')}
                        placeholder="John"
                        {...form.getInputProps('fname')}
                    />

                    <TextInput
                        label={t('Last name')}
                        placeholder="Doe"
                        {...form.getInputProps('lname')}
                    />

                    <TextInput
                        label={t('E-mail')}
                        placeholder="johndoe@gmail.com"
                        {...form.getInputProps('email')}
                    />

                    <Button
                        type="submit"
                        mt="xs"
                        color="dark"
                        loading={isLoading}
                    >
                        {t('Update')}
                    </Button>
                </Stack>
            </form>
        </Container>
    )
}
