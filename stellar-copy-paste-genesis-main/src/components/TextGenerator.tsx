
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TextGenerator = () => {
  const [text, setText] = useState("");
  const [style, setStyle] = useState("classic");
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const starStyles = {
    classic: { prefix: "★", suffix: "★", separator: " ✦ " },
    sparkle: { prefix: "✨", suffix: "✨", separator: " ⭐ " },
    decorative: { prefix: "✧･ﾟ: *", suffix: "*:･ﾟ✧", separator: " ✩ " },
    elegant: { prefix: "⋆｡‧˚ʚ", suffix: "ɞ˚‧｡⋆", separator: " ★ " },
    cosmic: { prefix: "🌟", suffix: "🌟", separator: " 💫 " }
  };

  const generateStarText = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to generate.",
        variant: "destructive"
      });
      return;
    }

    const selectedStyle = starStyles[style as keyof typeof starStyles];
    const words = text.split(' ');
    const decoratedWords = words.map(word => `${selectedStyle.prefix} ${word} ${selectedStyle.suffix}`);
    const result = decoratedWords.join(selectedStyle.separator);
    
    setGeneratedText(result);
  };

  const copyResult = async () => {
    if (!generatedText) return;
    
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Copied!",
        description: "Generated text copied to clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section id="generator" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Aesthetic Text Generator with Stars
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your text into beautiful star-decorated messages perfect for social media and creative content.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Your Star Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-medium">Your Text</label>
                <Textarea
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-medium">Star Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">★ Classic ★</SelectItem>
                    <SelectItem value="sparkle">✨ Sparkle ✨</SelectItem>
                    <SelectItem value="decorative">✧ Decorative ✧</SelectItem>
                    <SelectItem value="elegant">⋆ Elegant ⋆</SelectItem>
                    <SelectItem value="cosmic">🌟 Cosmic 🌟</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="p-3 bg-gray-50 rounded border text-sm">
                    {starStyles[style as keyof typeof starStyles].prefix} Your Text {starStyles[style as keyof typeof starStyles].suffix}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={generateStarText}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                Generate Star Text ✨
              </Button>
            </div>

            {generatedText && (
              <div className="space-y-4">
                <label className="text-sm font-medium">Generated Text</label>
                <div className="relative">
                  <Textarea
                    value={generatedText}
                    readOnly
                    className="min-h-[120px] bg-gray-50"
                  />
                  <Button
                    onClick={copyResult}
                    className="absolute top-2 right-2"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TextGenerator;
