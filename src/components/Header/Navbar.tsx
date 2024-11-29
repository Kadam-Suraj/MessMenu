import { Link, useLocation } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const navLinks = [
        { path: '/', label: 'Home', showOnHome: false },
        { path: '/register', label: 'Register', showOnHome: true },
        { path: '/contact', label: 'Contact', showOnHome: true },
        { path: '/about', label: 'About', showOnHome: true }
    ] as const

    const { pathname } = useLocation()
    const isHome = pathname === '/'

    const navVariants = {
        initial: {
            opacity: 0,
            y: -20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const linkVariants = {
        initial: {
            opacity: 0,
            y: -20,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.9,
            transition: {
                duration: 0.2
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.nav 
            className="flex items-center gap-4 p-4"
            initial="initial"
            animate="animate"
            variants={navVariants}
        >
            <AnimatePresence mode="sync">
                {navLinks
                    .filter(link => !isHome || link.showOnHome)
                    .map(({ path, label }) => (
                        <motion.div
                            key={path}
                            variants={linkVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            whileHover="hover"
                            layout
                        >
                            <Link
                                to={path}
                                className="overflow-hidden text-sm font-medium transition-colors duration-200 hover:text-primary"
                            >
                                {label}
                            </Link>
                        </motion.div>
                    ))}
            </AnimatePresence>
            <motion.div variants={linkVariants}>
                <ModeToggle />
            </motion.div>
        </motion.nav>
    )
}

export default Navbar