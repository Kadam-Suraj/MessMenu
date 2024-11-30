import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"

const sampleMenu = [
    {
        day: "Monday",
        breakfast: "Poha, Tea",
        lunch: "Dal, Rice, Roti, Sabzi",
        dinner: "Pulao, Dal Fry, Papad"
    },
    {
        day: "Tuesday",
        breakfast: "Upma, Coffee",
        lunch: "Rajma, Rice, Roti, Salad",
        dinner: "Chole, Rice, Roti"
    },
    // Add more days as needed
]

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'menu' | 'profile'>('menu')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token) {
            toast({
                variant: "destructive",
                title: "Authentication required",
                description: "Please login to access the dashboard"
            })
            navigate("/login")
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container px-4 py-8 mx-auto"
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Mess Dashboard</h1>
                <div className="space-x-4 space-y-4 sm:space-y-0">
                    <Button
                        variant={activeTab === 'menu' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('menu')}
                    >
                        Menu
                    </Button>
                    <Button
                        variant={activeTab === 'profile' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Logout</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You will need to login again to access the dashboard.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {activeTab === 'menu' ? (
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Menu</CardTitle>
                            <CardDescription>
                                Manage your mess menu for the week
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Day</TableHead>
                                        <TableHead>Breakfast</TableHead>
                                        <TableHead>Lunch</TableHead>
                                        <TableHead>Dinner</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sampleMenu.map((item) => (
                                        <TableRow key={item.day}>
                                            <TableCell className="font-medium">{item.day}</TableCell>
                                            <TableCell>{item.breakfast}</TableCell>
                                            <TableCell>{item.lunch}</TableCell>
                                            <TableCell>{item.dinner}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button className="mt-4">
                                Edit Menu
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                            <CardDescription>
                                Overview of your mess operations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="text-lg font-medium">Total Students</h3>
                                    <p className="text-3xl font-bold">150</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="text-lg font-medium">Today's Attendance</h3>
                                    <p className="text-3xl font-bold">142</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="text-lg font-medium">Revenue</h3>
                                    <p className="text-3xl font-bold">₹45,000</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Mess Profile</CardTitle>
                        <CardDescription>
                            Your mess details and settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Mess Name</h3>
                                <p className="text-gray-600">Student Mess Service</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Owner Details</h3>
                                <p className="text-gray-600">John Doe</p>
                                <p className="text-gray-600">john@example.com</p>
                                <p className="text-gray-600">+91 9876543210</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Address</h3>
                                <p className="text-gray-600">123 College Road, University Campus</p>
                                <p className="text-gray-600">City, State - 400001</p>
                            </div>
                            <Button>
                                Edit Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    )
}

export default Dashboard
