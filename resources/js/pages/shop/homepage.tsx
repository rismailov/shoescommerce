// import { ShopByCategory } from '@/components/home-page/ShopByCategory'
import { Hero } from '@/components/homepage/Hero'
import { Head } from '@inertiajs/react'

export default function Homepage() {
    return (
        <>
            <Head title="Home" />

            {/* Sections */}
            <Hero />
            {/* <ShopByCategory /> */}
        </>
    )
}
