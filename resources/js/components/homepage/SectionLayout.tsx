import { PropsWithChildren } from 'react'

export const SectionLayout = ({
    title,
    children,
}: PropsWithChildren<{ title: string }>) => {
    return (
        <section className="w-full">
            <div className="container flex flex-col space-y-5">
                <h1 className="text-2xl xs:text-3xl tracking-tight font-semibold">
                    {title}
                </h1>

                {children}
            </div>
        </section>
    )
}
