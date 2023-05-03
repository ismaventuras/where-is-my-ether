import { ReactNode } from "react"
import { Roboto } from 'next/font/google'
import dynamic from 'next/dynamic'
const DarkModeButton = dynamic(() => import("./DarkModeButton"), {
    ssr: false,
    // loading: () =>       <div className='flex justify-end mx-4'><button> 🌞/🌙</button></div>
})
const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

type Props = {
    children: ReactNode
}

function Navbar() {
    return (
        <div className="flex justify-end">
            <DarkModeButton />
        </div>
    )
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Navbar />
            <main className={`container mx-auto mt-12 md:mt-24  ${roboto.className} text-slate-800 dark:text-slate-100`}>{children}</main>
        </>
    )
}