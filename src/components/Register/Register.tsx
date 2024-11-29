import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    messname: z.string().min(2, "Mess name must be at least 2 characters").max(100, "Mess name must be less than 100 characters"),
    firstname: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
    mail: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messname: localStorage.getItem('register_messname') || "",
            firstname: localStorage.getItem('register_firstname') || "",
            lastname: localStorage.getItem('register_lastname') || "",
            mail: localStorage.getItem('register_mail') || "",
            phone: localStorage.getItem('register_phone') || "",
            password: "",
        },
    })

    // Save form values to localStorage whenever they change
    useEffect(() => {
        const subscription = form.watch((value) => {
            Object.entries(value).forEach(([key, val]) => {
                if (key !== 'password' && val) {
                    localStorage.setItem(`register_${key}`, val)
                }
            })
        })
        return () => subscription.unsubscribe()
    }, [form.watch])

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    function onReset() {
        Object.keys(formSchema.shape).forEach(key => {
            localStorage.removeItem(`register_${key}`)
        })
        form.reset({
            messname: "",
            firstname: "",
            lastname: "",
            mail: "",
            phone: "",
            password: "",
        })
    }

    return (
        <div className="flex flex-col lg:flex-row overflow-x-hidden">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2 flex flex-col items-center justify-center p-8 space-y-8"
            >
                <h1 className="text-4xl lg:text-6xl font-bold">Register</h1>
                <img
                    src="/src/assets/register.png"
                    alt="Registration Illustration"
                    className="w-full max-w-md"
                    width={500}
                    height={500}
                />
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-1/2 p-8"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
                        <FormField
                            control={form.control}
                            name="messname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mess Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Spice & Delight Tiffin Service" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your mess or tiffin service name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rajesh" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sharma" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="user@messmenu.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide your mail address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="9876543210" maxLength={10} onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your 10-digit mobile number
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Create a strong password with minimum 8 characters, including uppercase, lowercase, number and special character
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex gap-4"
                        >
                            <Button type="submit" className="w-full">Register Now</Button>
                            <Button type="button" variant="outline" onClick={onReset} className="w-full">Clear Form</Button>
                        </motion.div>
                    </form>
                </Form>
            </motion.div>
        </div>
    )
}

export default Register