import { Hero } from '@/components/homepage/Hero'
import { Head } from '@inertiajs/react'

export default function Homepage() {
    return (
        <div className="mt-10">
            <Head title="Home" />

            {/* Sections */}
            <Hero />
        </div>
    )
}
