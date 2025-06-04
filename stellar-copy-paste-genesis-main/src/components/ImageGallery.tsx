
const ImageGallery = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      alt: "Beautiful star constellation"
    },
    {
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop", 
      alt: "Night sky with stars"
    },
    {
      src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop",
      alt: "Galaxy and stars"
    },
    {
      src: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=400&h=300&fit=crop",
      alt: "Starry night landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=300&fit=crop",
      alt: "Cosmic stars"
    },
    {
      src: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop",
      alt: "Shooting stars"
    },
    {
      src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop",
      alt: "Star patterns"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Milky way stars"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Stunning Star Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get inspired by these beautiful star-themed images perfect for your creative projects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
