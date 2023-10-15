import { FeaturedSection } from '@/components/homepage/FeaturedSection'
import { HeroSection } from '@/components/homepage/HeroSection'
import { TrendingSection } from '@/components/homepage/TrendingSection'
import { Head } from '@inertiajs/react'

export default function Homepage() {
    return (
        <div className="py-5 md:py-10">
            <Head title="Home" />

            {/* Sections */}
            <div className="flex flex-col space-y-10 md:space-y-14">
                <HeroSection />
                <FeaturedSection />
                <TrendingSection />
            </div>
        </div>
    )
}
