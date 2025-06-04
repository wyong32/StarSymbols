
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const HowToUse = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Star",
      description: "Browse through our extensive collection of star symbols organized in different categories - Classic, Solid, and Outline stars."
    },
    {
      number: "02", 
      title: "Click to Copy",
      description: "Simply click on any star symbol you like. It will be automatically copied to your clipboard with a confirmation message."
    },
    {
      number: "03",
      title: "Paste Anywhere",
      description: "Use Ctrl+V (or Cmd+V on Mac) to paste your copied star symbol into any application, document, or social media post."
    },
    {
      number: "04",
      title: "Create Star Text",
      description: "Use our Aesthetic Text Generator to create beautiful star-decorated messages for your social media posts and creative projects."
    }
  ];

  return (
    <section id="how-to-use" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">How to Use</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to start using star symbols in your content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  <Star className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-twinkle" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Pro Tips</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">✨ Creative Uses</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Social media posts and bios</li>
                    <li>• Email signatures</li>
                    <li>• Document headers</li>
                    <li>• Website content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⭐ Best Practices</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Use stars sparingly for impact</li>
                    <li>• Match star style to your content</li>
                    <li>• Test compatibility across platforms</li>
                    <li>• Combine with other symbols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
