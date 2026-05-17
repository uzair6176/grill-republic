import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu as MenuIcon, X, ChevronRight, Phone, MapPin, Clock, 
  MessageCircle, Star, Flame, ArrowRight, Play, 
  CheckCircle, ChevronDown
} from 'lucide-react';

// Custom SVG Icons to replace missing Lucide brand icons
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const MENU_CATEGORIES = ['All', 'Soups', 'Starters/Rolls', 'Tandoori', 'Indian', 'Breads', 'Chinese'];

const MENU_ITEMS = [
  // Soups
  { id: 1, name: 'Chicken Manchow Soup', category: 'Soups', price: '₹160', desc: 'Classic Indo-Chinese soup with mixed veggies, chicken, and crispy fried noodles.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Hot And Sour Soup Chicken', category: 'Soups', price: '₹140', desc: 'Spicy and tangy broth with shredded chicken and fresh vegetables.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Sweet Corn Soup Veg', category: 'Soups', price: '₹120', desc: 'Comforting, thick sweet corn soup made with fresh kernels and mild herbs.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop' },
  
  // Starters/Rolls
  { id: 4, name: 'Chicken Kanti', category: 'Starters/Rolls', price: '₹370', desc: 'A local Srinagar favorite. Boneless chicken tossed with onions, tomatoes, and aromatic spices.', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Chicken Shawarma', category: 'Starters/Rolls', price: '₹220', desc: 'Juicy, marinated chicken roasted slowly, wrapped with garlic sauce and fresh veggies.', img: 'https://images.unsplash.com/photo-1676300187013-7540d4e9440d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, name: 'Chicken Lollipop Schezwan', category: 'Starters/Rolls', price: '₹270', desc: 'Crispy fried chicken wings tossed in our fiery house-made Schezwan sauce.', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop' },
  
  // Tandoori
  { id: 7, name: 'Afghani Chicken', category: 'Tandoori', price: '₹400', desc: 'Tender chicken marinated in a rich, creamy cashew and yogurt blend, grilled over charcoal.', img: 'https://plus.unsplash.com/premium_photo-1695931841253-1e17e7ed59b5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 8, name: 'Tandoori Chicken', category: 'Tandoori', price: '₹340', desc: 'Classic bone-in chicken marinated in yogurt and traditional tandoori spices.', img: 'https://images.unsplash.com/photo-1727280376746-b89107a5b0df?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, name: 'Chicken Malai Tikka', category: 'Tandoori', price: '₹430', desc: 'Melt-in-your-mouth boneless chicken bites marinated in malai, cheese, and mild spices.', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop' },
  
  // Indian
  { id: 10, name: 'Butter Chicken', category: 'Indian', price: '₹480', desc: 'Charcoal-grilled chicken simmered in a smooth, creamy tomato-butter gravy.', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnV0dGVyJTIwQ2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 11, name: 'Kadai Chicken', category: 'Indian', price: '₹450', desc: 'Spicy and flavorful chicken cooked with coarsely ground spices, onions, and capsicum.', img: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 12, name: 'Rara Chicken', category: 'Indian', price: '₹500', desc: 'Rich chicken curry slow-cooked with minced chicken (keema) and robust spices.', img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  
  // Breads
  { id: 13, name: 'Garlic Naan', category: 'Breads', price: '₹90', desc: 'Soft, fluffy tandoor-baked flatbread topped with freshly minced garlic and coriander.', img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop' },
  { id: 14, name: 'Butter Naan', category: 'Breads', price: '₹80', desc: 'Classic Indian bread cooked in a clay oven and brushed with rich butter.', img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop' },
  { id: 15, name: 'Rumali Roti', category: 'Breads', price: '₹40', desc: 'Paper-thin, soft roti that pairs perfectly with rich curries and kebabs.', img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop' },
  
  // Chinese
  { id: 16, name: 'Chilli Chicken Dry', category: 'Chinese', price: '₹360', desc: 'Crispy chicken chunks tossed in spicy soy-garlic sauce with bell peppers and onions.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop' },
  { id: 17, name: 'Chicken Manchurian Gravy', category: 'Chinese', price: '₹390', desc: 'Golden fried chicken bits in a savory, tangy, and mildly spicy dark soy sauce.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop' },
  { id: 18, name: 'Chilli Fish Dry', category: 'Chinese', price: '₹220', desc: 'Crispy fried fish tossed with green chillies, garlic, and scallions.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop' },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1652235192095-c252577b938a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdHJhdW50fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1728287506854-e3de67cbac24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RyYXVudHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdHJhdW50fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
];

const TESTIMONIALS = [
  { id: 1, name: 'Faizan Bhat', rating: 5, text: 'The Tandoori Chicken and Chicken Kanti here are unmatched in Srinagar. Perfect spot for a weekend dinner with friends. The ambiance is beautifully modern.' },
  { id: 2, name: 'Saima Wani', rating: 5, text: 'Great Chinese and Indian food! The service is quick and the vibe is perfect for family outings. The Garlic Naan and Kadai Chicken are a must-try.' },
  { id: 3, name: 'Aamir Dar', rating: 5, text: 'Best shawarma in Bemina! The atmosphere is incredibly warm and premium, totally unexpected but very welcome. Highly recommend their Butter Chicken too.' }
];

const FAQS = [
  { q: "Do I need to make a reservation?", a: "Walk-ins are always welcome! However, we highly recommend making a reservation for dinner and weekends to guarantee a table at our Bemina location." },
  { q: "Do you offer delivery or takeout?", a: "Yes, you can easily place an order for takeout or delivery via our WhatsApp number. We ensure fast and fresh packaging." },
  { q: "Do you have vegetarian options?", a: "Absolutely! We offer a wide variety of vegetarian Indian curries, fresh Tandoori breads, vegetarian Chinese options, and soups." }
];

const EmberParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full blur-[1px]"
          initial={{
            opacity: 0,
            x: Math.random() * dimensions.width,
            y: dimensions.height + 100
          }}
          animate={{
            opacity: [0, Math.random() * 0.8 + 0.2, 0],
            y: -100,
            x: `calc(${Math.random() * 100}vw)`
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            boxShadow: '0 0 10px 2px rgba(249, 115, 22, 0.6)'
          }}
        />
      ))}
    </div>
  );
};

const InitialLoader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <Flame size={64} className="text-orange-500 mx-auto mb-4 animate-pulse" />
        <motion.div 
          className="absolute inset-0 bg-orange-500 blur-3xl opacity-20"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl font-bold tracking-widest text-white uppercase"
      >
        Igniting Flavor
      </motion.h1>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Menu', 'Gallery', 'Reservations', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-zinc-950/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl' 
        : 'bg-transparent py-6 lg:py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="flex items-center gap-2 group"
        >
          <Flame className="text-orange-500 group-hover:scale-110 transition-transform" />
          <div className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
            The Grill <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Republic</span>
          </div>
        </motion.a>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((item, i) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors uppercase tracking-widest relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a 
            href="#reservations"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 rounded-full text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-md"
          >
            Book Table
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navLinks.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)} 
                  className="text-lg font-medium text-gray-300 hover:text-orange-500 uppercase tracking-widest flex items-center justify-between border-b border-white/5 pb-4"
                >
                  {item}
                  <ChevronRight size={16} className="text-orange-500 opacity-50" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image with Parallax & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_60%)] z-10" />
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transform scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599487405712-3150bbe36f1b?q=80&w=2000&auto=format&fit=crop')" }}
        />
      </div>
      
      <EmberParticles />
      
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <Flame size={16} className="text-orange-500" />
          <span className="text-sm font-medium tracking-widest text-gray-300 uppercase">Premium Casual Dining</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight"
        >
          WHERE FLAVOR <br className="hidden md:block"/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            MEETS FIRE
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Experience premium authentic grills, rich Indian curries, and modern Chinese cuisine at Srinagar's finest dining destination.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
        >
          <a href="#menu" className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)]">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center justify-center gap-2 text-white">
              View Menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="#reservations" className="px-8 py-4 bg-zinc-950/50 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all backdrop-blur-md">
            Reserve a Table
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-orange-600 to-red-600 opacity-20 blur-2xl rounded-3xl" />
          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant Interior" 
              className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
            
            {/* Overlay stats card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <Star className="text-white fill-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Award Winning</h4>
                  <p className="text-gray-400 text-sm">Voted Best Grillhouse in Srinagar 2024</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-orange-500" />
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Our Story</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
            Mastering The Art <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Of The Flame</span>
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed text-lg">
            At The Grill Republic, we believe that fire transforms great ingredients into extraordinary experiences. Born in Srinagar, our kitchen blends the rich heritage of authentic Indian curries, traditional Tandoori, and zesty Chinese flavors into a modern dining experience.
          </p>
          <p className="text-gray-400 mb-10 leading-relaxed text-lg">
            Whether you are here for a family gathering, a business lunch in Bemina, or just grabbing our signature shawarma, enjoy fast service, the freshest ingredients, and a warm, inviting ambiance.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Authentic Tandoori & Grills', 
              'Premium Casual Dining', 
              'Fresh Local Ingredients',
              'Fast & Friendly Service',
              'Family-Friendly Environment',
              'Signature Shawarmas'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <CheckCircle size={20} className="text-orange-500 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <button className="mt-12 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all flex items-center gap-2 group">
            Discover More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 lg:py-32 bg-zinc-900 relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-orange-500" />
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Culinary Excellence</h2>
            <div className="h-px w-12 bg-orange-500" />
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-10">Signature Menu</h3>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {MENU_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' 
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
                className="group bg-zinc-950 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-colors flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute top-4 right-4 z-20 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                    <span className="text-orange-500 font-bold tracking-wider">{item.price}</span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.category}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">{item.name}</h4>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">{item.desc}</p>
                  
                  <button className="w-full py-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-[#25D366] hover:text-white border border-white/10 hover:border-[#25D366] text-gray-300 rounded-xl transition-all duration-300 font-bold uppercase tracking-wider text-sm">
                    <MessageCircle size={18} />
                    Order via WhatsApp
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-orange-500" />
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Atmosphere</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white">Visual Experience</h3>
          </div>
          {/* Fixed: replaced lucide Instagram with custom InstagramIcon */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-widest text-sm font-bold pb-2">
            <InstagramIcon size={20} /> Follow our Instagram
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              onClick={() => setSelectedImage(img)}
            >
              <div className="aspect-[4/3] w-full">
                <img 
                  src={img} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/80 backdrop-blur-sm flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Play size={20} className="ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Expanded Gallery" 
              className="max-w-full max-h-full rounded-lg shadow-2xl border border-white/10" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TestimonialsFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
        
        {/* Testimonials */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-orange-500" />
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Reviews</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-12">Guest Experiences</h3>
          
          <div className="relative h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative h-full flex flex-col justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-8 right-8 text-6xl text-orange-500/20 font-serif leading-none">"</div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, j) => (
                      <Star key={j} size={18} className="fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light italic leading-relaxed relative z-10">
                    {TESTIMONIALS[activeIndex].text}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
                      {TESTIMONIALS[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-white tracking-wide">{TESTIMONIALS[activeIndex].name}</h5>
                      <span className="text-xs text-orange-500 uppercase tracking-widest">Verified Guest</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={false}
                animate={{ backgroundColor: openFAQ === idx ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0)' }}
                className="border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-white">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-orange-500 transition-transform duration-300 ${openFAQ === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFAQ === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const Reservations = () => {
  return (
    <section id="reservations" className="py-24 lg:py-32 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
        
        {/* Form */}
        <div className="lg:col-span-3 bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <h2 className="text-4xl font-bold mb-4 text-white">Reserve Your Table</h2>
          <p className="text-gray-400 mb-10">Experience the fire. Secure your spot for an unforgettable dining experience.</p>
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                <input type="tel" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600" placeholder="+91 00000 00000" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date & Time</label>
                <input type="datetime-local" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors [color-scheme:dark]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Guests</label>
                <select className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                  <option>5 People</option>
                  <option>6+ People (Contact Us)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Special Requests</label>
              <textarea rows="3" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600 resize-none" placeholder="Anniversary, dietary restrictions, etc..."></textarea>
            </div>
            
            <button className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold uppercase tracking-widest text-white hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all mt-4">
              Confirm Reservation
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-8" id="contact">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-orange-500" />
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Contact</h2>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Get in Touch</h3>
            <p className="text-gray-400">Have questions about large orders or reservations? Reach out to our team.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { icon: <MapPin />, title: 'Location', desc: 'MIG, HIG Colony, Bemina, Srinagar' },
              { icon: <Phone />, title: 'Phone', desc: '+91 00000 00000' },
              { icon: <Clock />, title: 'Hours', desc: 'Open Daily · Closes 11:00 PM' },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 hover:bg-white/10 transition-all group">
                <div className="p-3 bg-zinc-900 rounded-xl text-orange-500 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1 tracking-wide">{info.title}</h5>
                  <p className="text-gray-400 text-sm leading-relaxed">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex gap-4">
            <button className="flex-1 py-4 flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 rounded-xl font-bold transition-all duration-300">
              <MessageCircle size={20} /> WhatsApp
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-xl font-bold transition-all duration-300">
              <Phone size={20} /> Call Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="text-orange-500" size={28} />
              <div className="text-2xl font-bold text-white tracking-widest uppercase">
                The Grill <span className="text-orange-500">Republic</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Srinagar's premier destination for authentic grills, rich Indian curries, and modern Chinese cuisine. Where every meal is a masterpiece forged in fire.
            </p>
            {/* Fixed: all three social icons now use custom SVG components */}
            <div className="flex gap-4">
              {[
                { Icon: InstagramIcon, href: '#' },
                { Icon: FacebookIcon, href: '#' },
                { Icon: TwitterIcon, href: '#' }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Menu', 'Gallery', 'Reservations'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} The Grill Republic. All rights reserved.</p>
          <p>Designed for premium culinary experiences.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white scroll-smooth overflow-x-hidden">
      <AnimatePresence>
        {loading && <InitialLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <TestimonialsFAQ />
          <Reservations />
          <Footer />

          {/* Floating WhatsApp */}
          <motion.a 
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring" }}
            className="fixed bottom-6 right-6 p-4 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-50 flex items-center justify-center group"
          >
            <MessageCircle size={28} className="group-hover:animate-pulse" />
            <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
              Chat with us
            </span>
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}