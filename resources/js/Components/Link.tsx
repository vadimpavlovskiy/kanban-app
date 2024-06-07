import { Link } from '@inertiajs/react'

interface INavLink {
    href: string;
    text: string;
    isButton?: boolean;
}

const NavigationLink = ({text, href, isButton}:INavLink) => {
    return (
            <Link className={isButton ? 'bg-blue-500 rounded-xl text-white px-4 py-2' : 'border-gray-500 border rounded-xl px-4 py-2'} href={href}>
                {text}
            </Link>
    )
}

export default NavigationLink;