import { useSubmit } from '@/hooks/useSubmit'
import {
    Button,
    Modal,
    ModalProps,
    Rating,
    Stack,
    Text,
    TextInput,
    Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    title: string
    text: string
    credentials: string
    stars: number
}

export const WriteReviewModal = ({
    opened,
    onClose,
    productID,
}: { productID: number } & ModalProps) => {
    const { t } = useTranslation()
    const { submit, isLoading } = useSubmit()
    const form = useForm<TFormValues>({
        initialValues: {
            title: '',
            text: '',
            credentials: '',
            stars: 0,
        },
    })

    const onSubmit = async (data: TFormValues) =>
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
            onSuccess: () => onClose(),
        })

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={t('Write a review')}
            padding={30}
            styles={(theme) => ({
                title: {
                    fontWeight: 'bold',
                    fontSize: theme.fontSizes.xl,
                },
            })}
        >
            <form
                onSubmit={form.onSubmit(onSubmit)}
                className={clsx(isLoading && 'disabled')}
            >
                <Stack>
                    <Stack spacing="xs" align="center">
                        <Rating size="lg" {...form.getInputProps('stars')} />

                        {form.errors.stars && (
                            <Text color="red" align="center" size="sm">
                                {t('Please rate this product with stars.')}
                            </Text>
                        )}
                    </Stack>

                    <TextInput
                        data-autofocus
                        required
                        placeholder={t('Your name')}
                        {...form.getInputProps('credentials')}
                    />

                    <TextInput
                        required
                        placeholder={t('Review title')}
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        required
                        placeholder={t('Review text')}
                        minRows={10}
                        {...form.getInputProps('text')}
                    />

                    <Button
                        type="submit"
                        mt="xs"
                        h={45}
                        size="md"
                        color="dark"
                        fz={15}
                        loading={isLoading}
                    >
                        {t('Submit')}
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}
