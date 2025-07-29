import React from 'react'
import ModeToggle from '../Workers/ModeToggle'
import Link from 'next/link'

const AuthNav = () => {
    return (
        <div className="w-full px-3 md:px-18 py-4 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 ">
            <Link href={"/"} className="text-3xl  font-extrabold tracking-tight text-orange-600 ">
                JUNCTION
            </Link>
            <ModeToggle />
        </div>
    )
}

export default AuthNav