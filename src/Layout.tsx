import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { Toaster } from "@/components/ui/toaster"

const Layout = () => {
    return (
        <div>
            <Header />
            <Toaster />
            <Outlet />
        </div>
    )
}

export default Layout