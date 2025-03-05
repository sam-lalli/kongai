import { Brain, Calendar, Smartphone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import ScrollReveal from "@/components/ScrollReveal"



export default function WhyUs() {

    return (
        <ScrollReveal>
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-black to-zinc-900">
                <div className="container mx-auto text-center mb-12">
                    <Badge variant="outline" className="mb-4 border-green-500 text-green-500">
                    WHY CHOOSE KONG AI
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Become the King of Your Fitness Journey</h2>
                    <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
                    Our AI-powered fitness coach texts you personalized workouts, adapting to your unique needs and helping
                    you dominate your fitness goals like King Kong dominates the jungle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300">
                    <CardHeader>
                        <Smartphone className="h-12 w-12 text-green-500 mb-4" />
                        <CardTitle>Daily Workout Texts</CardTitle>
                        <CardDescription className="text-zinc-400">
                        Receive personalized workouts directly to your phone, right when you need them.
                        </CardDescription>
                    </CardHeader>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300">
                    <CardHeader>
                        <Calendar className="h-12 w-12 text-green-500 mb-4" />
                        <CardTitle>Adaptive Scheduling</CardTitle>
                        <CardDescription className="text-zinc-400">
                        Flexible workout schedules that adapt to your lifestyle and availability.
                        </CardDescription>
                    </CardHeader>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-all duration-300">
                    <CardHeader>
                        <Brain className="h-12 w-12 text-green-500 mb-4" />
                        <CardTitle>AI-Powered Progress</CardTitle>
                        <CardDescription className="text-zinc-400">
                        Advanced AI that learns from your performance to optimize future workouts.
                        </CardDescription>
                    </CardHeader>
                    </Card>
                </div>
            </section>
        </ScrollReveal>
    )
}
