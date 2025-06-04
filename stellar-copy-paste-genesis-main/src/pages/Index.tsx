
import Header from "@/components/Header";
import StarSymbols from "@/components/StarSymbols";
import ImageGallery from "@/components/ImageGallery";
import TextGenerator from "@/components/TextGenerator";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-star-pattern opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-float">
              ⭐ StarCopy ⭐
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              The ultimate collection of star symbols, copy-paste tools, and aesthetic text generators. 
              Make your content shine with beautiful Unicode stars! ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-4xl md:text-6xl animate-twinkle">
              <span>★</span>
              <span>✦</span>
              <span>✨</span>
              <span>⭐</span>
              <span>🌟</span>
              <span>💫</span>
              <span>✧</span>
              <span>⚡</span>
            </div>
          </div>
        </div>
      </section>

      <StarSymbols />
      <ImageGallery />
      <TextGenerator />
      <HowToUse />
      <FAQ />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Index;
