export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-9 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-9 bg-indigo-500 rounded w-24 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-6 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8 animate-pulse" />
            <div className="flex justify-center space-x-4">
              <div className="h-12 bg-indigo-500 rounded w-32 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      {[...Array(3)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-full mb-3 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-5/6 mb-3 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse" />
              </div>
              <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}

      {/* Footer Skeleton */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-gray-700 rounded w-24 mb-4 animate-pulse" />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
