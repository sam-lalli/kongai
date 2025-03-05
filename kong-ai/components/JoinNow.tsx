import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ScrollReveal from "./ScrollReveal";


export default function JoinNow() {

    return (
        <ScrollReveal>
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-black">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Unleash Your Inner Kong?</h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-8">
              Join thousands of fitness enthusiasts who have transformed their bodies and dominated their fitness goals
              with Kong AI&apos;s text-based workouts.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-lg">
              Start Your Free Trial <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-zinc-500">No credit card required. 14-day free trial.</p>
          </div>
        </section>
      </ScrollReveal>
    )}