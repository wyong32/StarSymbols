
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">About StarCopy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your ultimate destination for star symbols and aesthetic text generation
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We believe that creativity should be accessible to everyone. StarCopy was created to provide 
                    a simple, elegant solution for anyone looking to add a touch of magic to their digital content 
                    with beautiful star symbols.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Whether you're a social media enthusiast, content creator, designer, or just someone who 
                    loves beautiful typography, our platform offers the tools you need to make your text shine.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">What We Offer</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Extensive collection of Unicode star symbols</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>One-click copy functionality</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Aesthetic text generator with multiple styles</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Mobile-friendly responsive design</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Cross-platform compatibility</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg transform rotate-3"></div>
                <Card className="relative bg-white p-8">
                  <CardContent className="p-0 text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">100% Free</h3>
                    <p className="text-gray-600">
                      All our star symbols and tools are completely free to use. No registration required, 
                      no hidden fees, just pure creative freedom.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg transform -rotate-3"></div>
                <Card className="relative bg-white p-8">
                  <CardContent className="p-0 text-center">
                    <div className="text-6xl mb-4">⚡</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Lightning Fast</h3>
                    <p className="text-gray-600">
                      Instant copying, no loading times, no complicated interfaces. Get your perfect 
                      star symbols in seconds, not minutes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg transform rotate-1"></div>
                <Card className="relative bg-white p-8">
                  <CardContent className="p-0 text-center">
                    <div className="text-6xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Always Updated</h3>
                    <p className="text-gray-600">
                      We continuously expand our symbol collection and improve our tools based on 
                      user feedback and the latest Unicode standards.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
