import Link from 'next/link';
import { playfair_display } from '@/app/ui/fonts';

export default function SideNav () {
    return (
        <div className='h-full bg-neutral-800 p-2 flex flex-col overflow-hidden'>
            <Link href="/">
                <div className={`${playfair_display.className} h-64 bg-violet-700 rounded-xl text-3xl p-4 flex items-end`}>Purse</div>
            </Link>
            <div className="flex flex-col justify-between grow">
                <div>
                    {/* <NavLinks /> */}
                </div>
                <div className='bg-neutral-900 h-12 rounded-xl'>Logout</div>
            </div>
        </div>
    )
}