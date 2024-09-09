import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Beaker, Book, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col mt-3">  
      <main className="flex-grow container mx-auto py-16 px-4">
        <section className="text-center mb-24 relative">
          <div className="absolute inset-0 -z-10">
            <Image src="/assets/images/abstractHeader.svg" alt="logo" width={300} height={300}/>
          </div>
          <div className="bg-white bg-opacity-90 py-12 px-6 rounded-lg shadow-lg">
            <h1 className="text-6xl font-bold mb-6 text-gray-900">Welcome to Juno</h1>
            <p className="text-2xl text-gray-700 mb-12 max-w-2xl mx-auto">
              The all-in-one platform for streamlined AI customization and interaction.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <Link href="/quickstart">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        <section className="mb-24 text-center -mt-3">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">What is Juno?</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Juno allows you to seamlessly interact with tailor-made AI directly within your web browser, 
            revolutionizing the way you work with artificial intelligence.
          </p>
        </section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Rocket,
              title: "Getting Started",
              description: "Explore Juno's Quick Start guide for step-by-step instructions on integrating your personalized AI.",
              link: "/quickstart",
              linkText: "Quick Start Guide"
            },
            {
              icon: Book,
              title: "Explore the Library",
              description: "Discover a vast collection of AI components, including profiles, prompts, and extensions.",
              link: "/library/profiles",
              linkText: "Browse Library"
            },
            {
              icon: Beaker,
              title: "Create in the Lab",
              description: "Visit the Lab to create your own AI from the ground up, tailoring every detail to your preferences.",
              link: "/lab/profile-creation",
              linkText: "Go to Lab"
            }
          ].map((card, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center space-x-4 bg-gray-50 rounded-t-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  <card.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-700 text-lg mb-6">
                  {card.description}
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link href={card.link}>{card.linkText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}