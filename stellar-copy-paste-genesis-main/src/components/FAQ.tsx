
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "Are these star symbols compatible with all devices?",
      answer: "Yes! Our star symbols are Unicode characters that work across all modern devices, operating systems, and applications. They display consistently on Windows, Mac, iOS, Android, and web browsers."
    },
    {
      question: "Can I use these stars commercially?",
      answer: "Absolutely! These are standard Unicode symbols that are free to use for any purpose, including commercial projects, social media, websites, and printed materials."
    },
    {
      question: "Do the star symbols work on social media platforms?",
      answer: "Yes, all major social media platforms (Instagram, Facebook, Twitter, TikTok, LinkedIn) support these Unicode star symbols. They're perfect for enhancing your posts and profiles."
    },
    {
      question: "How do I copy multiple star symbols at once?",
      answer: "You can click on individual stars to copy them one by one, or use our Text Generator to create custom text with multiple star decorations that you can copy all at once."
    },
    {
      question: "Why aren't the symbols copying on my device?",
      answer: "Make sure your browser supports the clipboard API and you've granted permission. Try clicking the symbol again, or manually select and copy (Ctrl+C) the symbol from the button."
    },
    {
      question: "Can I suggest new star symbols to add?",
      answer: "We're always looking to expand our collection! While we focus on widely-supported Unicode symbols, feel free to reach out with suggestions for new symbols or categories."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about using star symbols
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-purple-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;
