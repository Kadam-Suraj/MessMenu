import { Link, useLocation } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'

const Navbar = () => {
    const navLinks = [
        { path: '/', label: 'Home', showOnHome: false },
        { path: '/register', label: 'Register', showOnHome: true },
        { path: '/contact', label: 'Contact', showOnHome: true },
        { path: '/about', label: 'About', showOnHome: true }
    ] as const

    const { pathname } = useLocation()
    const isHome = pathname === '/'

    return (
        <nav className="flex items-center gap-4 p-4">
            {navLinks
                .filter(link => !isHome || link.showOnHome)
                .map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        {label}
                    </Link>
                ))}
            <ModeToggle />
        </nav>
    )
}

export default Navbar