

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      
      {/* 1. Dynamic Background Blobs (Adds depth and modern feel) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      
      {/* 3. Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Cool Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-200">Live at Kabale University</span>
        </div>

        {/* Massive Gradient Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
          Print Smarter, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Not Harder.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Skip the queues. Upload your documents, pay instantly with Mobile Money, and pick up crisp, professional prints at your nearest campus station.
        </p>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20">
  <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
    🚀 Now available at Kabale University
  </div>
  
  <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
    Print Smarter at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Kabale University</span>
  </h1>
  
   <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
    Skip the queues. Upload your documents, pay securely with Mobile Money, and pick up your prints at your faculty.
  </p>
  </div>     


        {/* 4. Feature Cards (Glassmorphism + Hover Effects) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl text-left">
          
          {/* Card 1 */}
          <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
              📤
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Upload & Customize</h3>
            <p className="text-gray-400 leading-relaxed">Drag, drop, and configure. Choose color, binding, and see your exact price before you pay.</p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
              📱
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. Pay with MoMo</h3>
            <p className="text-gray-400 leading-relaxed">Seamless, secure checkout via MTN or Airtel Mobile Money powered by Flutterwave.</p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
              📍
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Pick Up Locally</h3>
            <p className="text-gray-400 leading-relaxed">We handle the logistics. Grab your order at Main Campus, Engineering, or In Town.</p>
          </div>

        </div>
      </main>

      {/* 5. Simple Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 PrintHub. Built with ❤️ for Kabale University Students.</p>
      </footer>

      {/* Custom Animation Styles (Add this to your index.css if not already there, or just let Tailwind handle standard animations) */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}