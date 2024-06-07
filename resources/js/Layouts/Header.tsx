import NavLink  from "@/Components/Link";

const Header = () => {
    return (
        <header className="flex w-full justify-between items-center">
            <h1 className="font-raleway font-bold text-2xl">Hello World!</h1>
            <nav className="flex gap-6 items-center">
                <NavLink href={'/login/'} text={'Sign In'} />
                <NavLink isButton={true} href={'/signup'} text={'Sign Up'} />
            </nav>
        </header>
    )
}

export default Header;