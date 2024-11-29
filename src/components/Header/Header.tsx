import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4">
            <Link to="/" className="text-2xl font-bold">MessMenu</Link>
            <Navbar />
        </header>
    )
}

export default Header