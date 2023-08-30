import { PropsWithChildren } from 'react'
import AppLayout from './AppLayout'

export default function AdminLayout({ children }: PropsWithChildren) {
    return <AppLayout>{children}</AppLayout>
}
