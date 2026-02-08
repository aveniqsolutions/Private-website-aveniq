import React, { useEffect, useMemo, useRef, useState } from "react";

// Logo URLs from user assets
export const LOGO_URLS = {
  main: "https://customer-assets.emergentagent.com/job_c5c5fb7d-d1cc-44e0-a158-a80c55348ee2/artifacts/104jed3s_Blue%20%26%20Black%20Technology%20Logo.png",
  alt: "https://customer-assets.emergentagent.com/job_c5c5fb7d-d1cc-44e0-a158-a80c55348ee2/artifacts/9ax4sj8a_Blue%20%26%20Black%20Technology%20Logo.png"
};

// Professional business images from vision expert
export const IMAGES = {
  // Hero section
  hero_main: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NzAzMDI0MDB8MA&ixlib=rb-4.1.0&q=85",
  hero_professional: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8fDE3NzAzMDI0MDd8MA&ixlib=rb-4.1.0&q=85",
  
  // Services
  service_websites: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwyfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NzAzMDI0MDB8MA&ixlib=rb-4.1.0&q=85",
  service_mobile: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHx0ZWNobm9sb2d5fGVufDB8fHx8MTc3MDIxMDM5NHww&ixlib=rb-4.1.0&q=85",
  service_landing: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg",
  
  // Portfolio
  portfolio_1: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwzfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NzAzMDI0MDB8MA&ixlib=rb-4.1.0&q=85",
  portfolio_2: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NzAzMDI0MDB8MA&ixlib=rb-4.1.0&q=85",
  portfolio_3: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  
  // Team/About
  team_main: "https://images.unsplash.com/photo-1758518729371-5ee28c4ddf60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwwfHx8fDE3NzAzMDI0MDd8MA&ixlib=rb-4.1.0&q=85",
  workspace: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
};

// Navigation Component with Neon Green Shadows
export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800"
         style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={LOGO_URLS.main} 
              alt="Aveniq Solutions Logo" 
              className="h-8 w-auto"
              style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.3))' }}
            />
            <span className="text-xl font-bold text-white">Aveniq Solutions</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-green-400 shadow-sm'
                    : 'text-gray-300 hover:text-green-400'
                }`}
                style={{
                  textShadow: activeSection === item.id ? '0 0 10px rgba(34, 197, 94, 0.5)' : 'none'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-green-400 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 rounded-lg mt-2 border border-gray-800"
                 style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)' }}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-green-400 bg-gray-800 shadow-md'
                      : 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  }`}
                  style={{
                    boxShadow: activeSection === item.id ? '0 0 10px rgba(34, 197, 94, 0.3)' : 'none'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section with Neon Green Shadows
export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.hero_main} 
          alt="Web Development" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}>
            Bring Your Business
            <span className="block text-green-400" style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}>Online Today</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional websites, fast landing pages, functional mobile apps, and stunning video content 
            that help businesses establish a strong digital presence they can afford.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:transform hover:scale-105 border border-green-500"
              style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
            >
              View Our Services
            </button>
            <button 
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="border border-gray-600 hover:border-green-400 text-white hover:text-green-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/20"
            >
              See Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section with Bento Layout
export function Services() {
  const services = [
    {
      title: "Landing Pages",
      description: "Fast, responsive landing pages to capture leads and drive conversions",
      features: ["Mobile Responsive", "Fast Loading", "SEO Optimized", "Lead Capture Forms"],
      highlight: "Perfect for marketing campaigns and lead generation",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Professional Websites",
      description: "Custom websites tailored to your business needs",
      features: ["Custom Design", "CMS Integration", "E-commerce Ready", "Analytics Setup"],
      highlight: "Complete business solutions with modern functionality",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      title: "Mobile Apps",
      description: "Simple functional mobile apps to enhance user engagement",
      features: ["Cross-Platform", "User-Friendly", "Push Notifications", "Offline Support"],
      highlight: "Extend your reach with mobile applications",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    },
    {
      title: "Video & Content Creation",
      description: "Professional video editing and animation for engaging content",
      features: ["Adobe Premiere Pro", "After Effects", "CapCut", "Canva Design", "2D & 3D Animation"],
      highlight: "Bring your brand to life with stunning visual content",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive online
          </p>
        </div>

        {/* Bento Grid Layout with Neon Green Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-400 transition-all duration-300 reveal-up shadow-lg hover:shadow-green-400/20 ${
                index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.1), inset 0 0 20px rgba(34, 197, 94, 0.05)'
              }}
            >
              {/* Service Header */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-400/30">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
              </div>

              {/* Highlight */}
              <div className="mb-6 p-4 bg-green-400/10 border border-green-400/20 rounded-xl shadow-inner shadow-green-400/10">
                <p className="text-green-300 font-medium">{service.highlight}</p>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0 shadow-sm shadow-green-400/50"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gray-800 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 border border-gray-700 hover:border-green-400"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section with Neon Green Shadows */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 reveal-left hover:border-green-400 transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.1), inset 0 0 20px rgba(34, 197, 94, 0.05)'
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Why Choose Our Services?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 shadow-sm shadow-green-400/50">•</span>
                <span>Affordable pricing without compromising quality</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 shadow-sm shadow-green-400/50">•</span>
                <span>Fast delivery and responsive communication</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 shadow-sm shadow-green-400/50">•</span>
                <span>Modern, professional designs that convert</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 shadow-sm shadow-green-400/50">•</span>
                <span>Ongoing support and maintenance included</span>
              </li>
            </ul>
          </div>
          
          <div 
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 reveal-up hover:border-green-400 transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.1), inset 0 0 20px rgba(34, 197, 94, 0.05)'
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Our Process</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-lg shadow-green-400/30">1</div>
                <span className="text-gray-300">Consultation & Planning</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-lg shadow-green-400/30">2</div>
                <span className="text-gray-300">Design & Development</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-lg shadow-green-400/30">3</div>
                <span className="text-gray-300">Testing & Launch</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-lg shadow-green-400/30">4</div>
                <span className="text-gray-300">Support & Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Portfolio Section with Interactive Content
export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  // Portfolio items - you can replace these URLs with your actual content
  const portfolioItems = [
    // Videos (4 items)
    {
      id: 1,
      type: 'video',
      category: 'content-creation',
      title: 'Brand Promotional Video',
      description: 'Dynamic promotional video with motion graphics',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // Replace with your video
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500',
      tools: ['Adobe Premiere Pro', 'After Effects']
    },
    {
      id: 2,
      type: 'video',
      category: 'content-creation',
      title: 'Product Animation',
      description: '3D product showcase with smooth animations',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', // Replace with your video
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500',
      tools: ['After Effects', 'Cinema 4D']
    },
    {
      id: 3,
      type: 'video',
      category: 'content-creation',
      title: 'Social Media Content',
      description: 'Engaging social media video content',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4', // Replace with your video
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500',
      tools: ['CapCut', 'Canva']
    },
    {
      id: 4,
      type: 'video',
      category: 'content-creation',
      title: 'Corporate Presentation',
      description: 'Professional corporate video presentation',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // Replace with your video
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
      tools: ['Adobe Premiere Pro', 'Canva']
    },
    
    // Images (4 items)
    {
      id: 5,
      type: 'image',
      category: 'content-creation',
      title: 'Brand Identity Design',
      description: 'Complete brand identity and logo design',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
      tools: ['Canva', 'Photoshop']
    },
    {
      id: 6,
      type: 'image',
      category: 'content-creation',
      title: 'Social Media Graphics',
      description: 'Eye-catching social media post designs',
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      tools: ['Canva', 'Illustrator']
    },
    {
      id: 7,
      type: 'image',
      category: 'content-creation',
      title: 'Marketing Materials',
      description: 'Professional marketing and promotional materials',
      imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800',
      tools: ['Canva', 'InDesign']
    },
    {
      id: 8,
      type: 'image',
      category: 'content-creation',
      title: 'Digital Illustrations',
      description: 'Custom digital illustrations and artwork',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800',
      tools: ['Illustrator', 'Procreate']
    },
    
    // Websites (3 items)
    {
      id: 9,
      type: 'website',
      category: 'web-development',
      title: 'E-commerce Platform',
      description: 'Modern e-commerce solution with payment integration',
      websiteUrl: 'https://example-ecommerce.com', // Replace with your actual website
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 10,
      type: 'website',
      category: 'web-development',
      title: 'Corporate Website',
      description: 'Professional corporate website with CMS',
      websiteUrl: 'https://example-corporate.com', // Replace with your actual website
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      tech: ['Vue.js', 'Laravel', 'MySQL']
    },
    {
      id: 11,
      type: 'website',
      category: 'web-development',
      title: 'Portfolio Website',
      description: 'Creative portfolio website with animations',
      websiteUrl: 'https://example-portfolio.com', // Replace with your actual website
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      tech: ['React', 'Framer Motion', 'Tailwind CSS']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-development', label: 'Websites' },
    { id: 'content-creation', label: 'Content Creation' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleItemClick = (item) => {
    if (item.type === 'website') {
      window.open(item.websiteUrl, '_blank');
    } else {
      setSelectedItem(item);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Showcasing our latest projects and successful digital transformations
          </p>
        </div>

        {/* Filter Buttons with Neon Green Shadows */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                activeFilter === category.id
                  ? 'bg-green-600 text-white border-green-400 shadow-lg shadow-green-400/30'
                  : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-green-400 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20'
              }`}
              style={{
                boxShadow: activeFilter === category.id 
                  ? '0 0 20px rgba(34, 197, 94, 0.3)' 
                  : '0 0 10px rgba(34, 197, 94, 0.1)'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid with Neon Green Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer reveal-up bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-green-400 transition-all duration-300"
              onClick={() => handleItemClick(item)}
              style={{
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.1), inset 0 0 20px rgba(34, 197, 94, 0.05)'
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.type === 'video' ? item.thumbnail : item.imageUrl} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Type Indicator */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.type === 'video' ? 'bg-red-600/80 text-white' :
                    item.type === 'website' ? 'bg-blue-600/80 text-white' :
                    'bg-purple-600/80 text-white'
                  }`}>
                    {item.type === 'video' ? '▶ Video' : 
                     item.type === 'website' ? '🌐 Website' : 
                     '🎨 Design'}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-sm font-medium">
                        {item.type === 'website' ? 'Click to Visit' : 'Click to View'}
                      </span>
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(item.tools || item.tech)?.map((tool, idx) => (
                    <span key={idx} className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs border border-green-400/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Videos and Images */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-green-400/30" 
                 style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {selectedItem.type === 'video' ? (
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    poster={selectedItem.thumbnail}
                  >
                    <source src={selectedItem.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={selectedItem.imageUrl} 
                    alt={selectedItem.title}
                    className="w-full rounded-lg"
                  />
                )}
                
                <div className="mt-4">
                  <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tools?.map((tool, idx) => (
                      <span key={idx} className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-400/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// About Section
export function About() {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              About Aveniq Solutions
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              We specialize in helping businesses, startups, and individuals establish 
              a strong online presence with professional, modern, and affordable digital solutions.
            </p>
            <p className="text-gray-300 mb-6">
              Our mission is to make high-quality web development accessible to everyone. 
              We believe that every business deserves a professional digital presence that 
              communicates trust, innovation, and professionalism.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-400 mb-2">50+</h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-400 mb-2">100%</h3>
                <p className="text-gray-300">Client Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="reveal-up">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Quality First</h4>
                    <p className="text-gray-300 text-sm">Every project is built with attention to detail and modern best practices.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Fast Delivery</h4>
                    <p className="text-gray-300 text-sm">Quick turnaround times without compromising on quality.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Ongoing Support</h4>
                    <p className="text-gray-300 text-sm">Continuous support and maintenance for your digital presence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Form Component
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus('');
      return;
    }
    
    setIsLoading(true);
    setStatus('');
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
        throw new Error('Backend URL not configured. Please contact support.');
      }
      
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus(data.message || 'Message sent successfully! We will contact you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setStatus('Error: ' + (data.detail || data.message || 'Failed to send message'));
      }
    } catch (error) {
      setStatus('Error: Unable to send message. Please try again later.');
      console.error('Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black rounded-xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.subject ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="What is this about?"
          />
          {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Tell us about your project..."
          ></textarea>
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {status && (
        <div className={`mt-4 p-4 rounded-lg ${
          status.includes('Error') 
            ? 'bg-red-900/50 text-red-300 border border-red-800' 
            : 'bg-green-900/50 text-green-300 border border-green-800'
        }`}>
          {status}
        </div>
      )}
    </div>
  );
}

// Contact Section
export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to bring your business online? Let's discuss your project and 
            create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal-left">
            <div className="space-y-8">
              <div className="bg-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">contact@aveniq-solutions.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Response within 24 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {[
                    "Affordable pricing for quality work",
                    "Fast turnaround times",
                    "Modern, responsive designs",
                    "Ongoing support and maintenance",
                    "SEO-optimized solutions"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="reveal-up">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={LOGO_URLS.main} 
                alt="Aveniq Solutions Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white">Aveniq Solutions</span>
            </div>
            <p className="text-gray-400">
              Professional web development services to help your business thrive online.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Landing Pages</li>
              <li>Professional Websites</li>
              <li>Mobile Applications</li>
              <li>E-commerce Solutions</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contact@aveniq-solutions.com</li>
              <li>Professional Support</li>
              <li>Quick Response Time</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Aveniq Solutions. All rights reserved. Built with modern technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
