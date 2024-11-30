import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, loginMess } from "@/database/loginMess"
import client from "@/database/client"
import { login } from "@/assets"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
            toast({
                title: "Active session detected",
                description: "Logging you in automatically...",
            })
            navigate("/dashboard")
        }
    }, [navigate])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Check if email exists in mess type
        const existingUser = await client.fetch(
            `*[_type == "mess" && email == $email][0]`,
            { email: values.email }
        );

        if (!existingUser) {
            toast({
                variant: "destructive",
                description: "No account found with this email"
            })
            return;
        }

        const result = await loginMess(values as User);
        if (result instanceof Error) {
            toast({
                variant: "destructive",
                description: result.message,
            })
        } else {
            // Store the token in localStorage
            localStorage.setItem("authToken", result.token)

            toast({
                variant: "success",
                title: "Login successful",
                description: "Welcome back!",
            })

            setTimeout(() => {
                navigate("/dashboard")
            }, 1000);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container relative grid items-center justify-center gap-8 mx-auto pt-44 lg:grid-cols-2 lg:px-0"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-col items-center justify-center hidden p-8 lg:flex"
            >
                <h1 className="mb-4 text-4xl font-bold">Welcome Back!</h1>
                <img
                    src={login}
                    alt="Login illustration"
                    className="w-full max-w-md"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-md mx-auto"
            >
                <div>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Login to your account
                        </CardTitle>
                        <CardDescription>
                            Enter your email and password to login
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name@example.com" type="email" {...field} />
                                            </FormControl>
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
                                                        placeholder="Enter your password"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Button
                                variant="link"
                                className="p-0"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </div>
                    </CardFooter>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Login
