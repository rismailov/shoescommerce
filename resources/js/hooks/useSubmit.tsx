/**
 * A simple wrapper around Inertia & plain Axios requests to reduce the boilerplate code.
 */
// import { setErrorAlertAtom, setSuccessAlertAtom } from '@/store/alert.atom'
import { Errors, PageProps } from '@/types/inertia'
import { sleep } from '@/utils'
import { router } from '@inertiajs/react'
import { UseFormReturnType } from '@mantine/form'
import { useSetAtom } from 'jotai'
import { Dispatch, SetStateAction, useState } from 'react'
import { useToast } from './useToast'

interface SubmitFunctionParams {
    // mantine form instance
    form?: UseFormReturnType<any>

    // request URL
    url: string

    // success request callback
    onSuccess?:
        | ((props: PageProps) => void)
        | ((props: PageProps) => Promise<void>)

    // failed request callback
    onError?: ((errors: Errors) => void) | ((errors: Errors) => Promise<void>)

    // this fake delay is only needed for animation and smoothness
    // if things happen too quickly, user doesn't believe it worked
    delay?: boolean | number

    // sometimes user is redirected after form submission
    // in cases like this there's no need to stop the loading
    stopLoadingOnSuccess?: boolean

    // request method
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'

    // request payload
    data?: any

    // whether or not to reset the form on successful request
    resetFormOnSuccess?: boolean

    // slug: if there are multiple submit() calls, slug needed to differentiate them
    slug?: string

    // router options
    options?: {
        preserveScroll?: boolean
        preserveState?: boolean
    }

    // notification or toast
    showToastOnError?: boolean
}

interface UseSubmitReturnType {
    submit: (args: SubmitFunctionParams) => Promise<void>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    slug: string | undefined
}

export function useSubmit(): UseSubmitReturnType {
    const [actionSlug, setSlug] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    // alerts
    // const setSuccessAlert = useSetAtom(setSuccessAlertAtom)
    // const setErrorAlert = useSetAtom(setErrorAlertAtom)

    // toasts (notifications)
    const { showSuccess, showError } = useToast()

    async function submit({
        form,
        onSuccess,
        onError,
        delay = true,
        stopLoadingOnSuccess = true,
        method = 'get',
        url,
        data,
        resetFormOnSuccess = false,
        slug,
        options,
        showToastOnError = false,
    }: SubmitFunctionParams) {
        slug && setSlug(slug)

        setIsLoading(true)

        if (isLoading) {
            return
        }

        // if number was passed, use it as a timeout
        if (delay) {
            await sleep(typeof delay === 'boolean' ? undefined : delay)
        }

        router[method](url, data ?? {}, {
            ...(options && options),
            // @ts-ignore: Couldn't properly type "onSuccess" callback
            onSuccess: async ({ props }: PageProps) => {
                const { message, error, success } = props.flash

                // alert (use "message" on backend for success alerts)
                // message && setSuccessAlert(message)
                // error && !showToastOnError && setErrorAlert(error)

                // toast (use "success" on backend for success toasts)
                success && showSuccess(success)
                error && showToastOnError && showError(error)

                form && resetFormOnSuccess && form.reset()

                onSuccess && (await onSuccess(props))

                stopLoadingOnSuccess && setIsLoading(false)
            },
            onError: async (errors) => {
                form && form.setErrors(errors)
                onError && (await onError(errors))
                setIsLoading(false)
            },
        })
    }

    return {
        submit,
        isLoading,
        setIsLoading,
        slug: actionSlug,
    }
}
