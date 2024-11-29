import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const About = () => {
    return (
        <div className="min-h-screen py-16 overflow-x-hidden">
            <div className="container px-4 mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">About MessMenu</h1>
                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                        Connecting hungry students with local mess halls, making it easier than ever to find your next delicious meal.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid gap-12 mb-16 md:grid-cols-2"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-muted-foreground">
                            We're on a mission to revolutionize how students find and choose their meals.
                            By providing real-time menu updates and detailed information about local mess halls,
                            we help students make informed decisions about their daily meals.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Why Choose Us</h2>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>✓ Real-time menu updates</li>
                            <li>✓ Easy-to-use interface</li>
                            <li>✓ Comprehensive mess hall listings</li>
                            <li>✓ Detailed reviews and ratings</li>
                        </ul>
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="mb-8 text-3xl font-bold text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How does MessMenu work?</AccordionTrigger>
                            <AccordionContent>
                                MessMenu connects students with local mess halls by providing real-time menu updates,
                                reviews, and detailed information about each establishment. Mess owners can register
                                and update their menus, while students can easily find and compare different options.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>How can I register my mess?</AccordionTrigger>
                            <AccordionContent>
                                Simply click on the "Register Your Mess" button and fill out the registration form.
                                You'll need to provide basic information about your mess, including location,
                                contact details, and menu items.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is MessMenu free to use?</AccordionTrigger>
                            <AccordionContent>
                                Yes, MessMenu is completely free for both students and mess owners. Our goal is
                                to create a helpful platform that benefits the entire community.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger>How often are menus updated?</AccordionTrigger>
                            <AccordionContent>
                                Mess owners can update their menus in real-time. We encourage regular updates
                                to ensure students always have access to the most current information.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </div>
        </div>
    )
}

export default About
