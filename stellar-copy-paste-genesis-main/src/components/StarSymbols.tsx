
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const StarSymbols = () => {
  const { toast } = useToast();

  const classicStars = [
    "★", "☆", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "✱", "✲", "✳", "✴", "✵", "✶", "✷", "✸", "✹", "✺", "✻", "✼"
  ];

  const solidStars = [
    "⭐", "🌟", "✨", "💫", "⭐️", "🌠", "⚡", "💥", "✴️", "🔯", "🎆", "🎇"
  ];

  const outlineStars = [
    "☆", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "✱", "✲", "✳", "✵", "✶", "✷", "✸", "✹", "✺", "✻", "✼"
  ];

  const copyToClipboard = async (symbol: string) => {
    try {
      await navigator.clipboard.writeText(symbol);
      toast({
        title: "Copied!",
        description: `"${symbol}" has been copied to your clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const StarGrid = ({ stars }: { stars: string[] }) => (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
      {stars.map((star, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-16 w-16 text-2xl hover:bg-purple-50 hover:border-purple-300 hover:scale-110 transition-all duration-200 star-glow"
          onClick={() => copyToClipboard(star)}
        >
          {star}
        </Button>
      ))}
    </div>
  );

  return (
    <section id="symbols" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Star Copy and Paste - All Star Symbols
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Click any star symbol to copy it instantly. Perfect for social media, documents, and creative projects.
          </p>
        </div>

        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-8">
            <Tabs defaultValue="classic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="classic" className="text-lg py-3">Classic Stars</TabsTrigger>
                <TabsTrigger value="solid" className="text-lg py-3">Solid Stars</TabsTrigger>
                <TabsTrigger value="outline" className="text-lg py-3">Outline Stars</TabsTrigger>
              </TabsList>
              
              <TabsContent value="classic" className="space-y-6">
                <StarGrid stars={classicStars} />
              </TabsContent>
              
              <TabsContent value="solid" className="space-y-6">
                <StarGrid stars={solidStars} />
              </TabsContent>
              
              <TabsContent value="outline" className="space-y-6">
                <StarGrid stars={outlineStars} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StarSymbols;
