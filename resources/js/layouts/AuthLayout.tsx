import { PropsWithChildren } from 'react'
import AppLayout from './AppLayout'

export default function AuthLayout({ children }: PropsWithChildren) {
    return <AppLayout>{children}</AppLayout>
}
