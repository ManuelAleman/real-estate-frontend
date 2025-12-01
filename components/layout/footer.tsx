import { Separator } from '@/components/ui/shadcn/separator'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <Separator />
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-6'>
                
                <Link href='#' className='flex-1 flex justify-center md:justify-start'> 
                    <div className='flex items-center gap-3'>
                        <p className='gap-3 font-bold'> TuVecindario.com </p>
                    </div>
                </Link>

                <div className='flex items-center justify-center gap-4 flex-1'>
                    <Link href='#'>
                        <Facebook className='size-5' />
                    </Link>
                    <Link href='#'>
                        <Instagram className='size-5' />
                    </Link>
                    <Link href='#'>
                        <Twitter className='size-5' />
                    </Link>
                    <Link href='#'>
                        <Youtube className='size-5' />
                    </Link>
                </div>

                <div className='flex flex-1 justify-center md:justify-end px-4 py-4 sm:px-6'>
                    <p className='text-center font-medium text-balance'>
                        {`©${new Date().getFullYear()}`} <Link href='#'>TuVecindario/Catalogo</Link>.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer