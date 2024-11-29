import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className="relative min-h-[80vh] flex items-center">
            <div className="container mx-auto px-4 z-10 flex justify-between items-center">
                <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Find Your Favorite Dishes Nearby
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                        Discover what's cooking at local mess halls in real-time. Check menu updates and find your favorite dishes available near you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="text-lg">
                            <Link to="/register">Register Your Mess</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg">
                            <Link to="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:block w-1/2">
                    <img 
                        src="/src/assets/hero-bg.png" 
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
