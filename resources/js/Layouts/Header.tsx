import NavLink  from "@/Components/Link";
import { router, usePage } from "@inertiajs/react";

const Header = () => {
    const { auth } = usePage().props;
    console.log(auth.user)
    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <header className="flex w-full justify-between items-center">
            <h1 className="font-raleway font-bold text-2xl">Hello World!</h1>
            <nav className="flex gap-6 items-center">
                {
                   auth && auth.user ?
                <form method="POST" onSubmit={handleLogout}>
                    <button type="submit" className="border-gray-500 border rounded-xl px-4 py-2">Logout</button>
                </form>
                :
                <>
                    <NavLink href={'/login/'} text={'Sign In'} />
                    <NavLink isButton={true} href={'/signup'} text={'Sign Up'} />
                </>
                }
                
            </nav>
        </header>
    )
}

export default Header;