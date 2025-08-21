import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              AI comments.{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Done in seconds.
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your teaching with AI-powered comment generation. 
              Save hours every week while maintaining the quality your students deserve.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/waitlist" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                Start Free
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 text-lg font-semibold rounded-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* 3-Layer Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="relative block w-full h-20 md:h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Layer 1 - Bottom */}
            <path
              d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
              className="fill-blue-600 opacity-20"
            />
            {/* Layer 2 - Middle */}
            <path
              d="M0,80 C200,140 400,20 600,80 C800,140 1000,20 1200,80 L1200,120 L0,120 Z"
              className="fill-blue-500 opacity-40"
            />
            {/* Layer 3 - Top */}
            <path
              d="M0,100 C250,160 450,40 600,100 C750,160 950,40 1200,100 L1200,120 L0,120 Z"
              className="fill-white dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Content sections can be added here */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Built for Modern Teachers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of educators who trust Zaza Promptly to streamline 
              their feedback process while maintaining personal touch and quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}