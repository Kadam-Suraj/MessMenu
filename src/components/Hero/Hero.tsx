import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { hero_bg } from "@/assets"

const Hero = () => {
    return (
        <div className="relative min-h-[80vh] flex items-center">
            <div className="container z-10 grid items-center justify-between gap-5 px-4 mx-auto lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 text-5xl font-bold md:text-7xl"
                    >
                        Find Your Favorite Dishes Nearby
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-8 text-xl md:text-2xl text-muted-foreground"
                    >
                        Discover what's cooking at local mess halls in real-time. Check menu updates and find your favorite dishes available near you.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col gap-4 sm:flex-row"
                    >
                        <Button asChild size="lg" className="text-lg">
                            <Link to="/register">Register Your Mess</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg">
                            <Link to="/about">Learn More</Link>
                        </Button>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-10/12 mx-auto"
                >
                    <img
                        src={hero_bg}
                        alt="Hero Background"
                        className="object-cover w-full h-full"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
