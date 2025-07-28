export default function SpotlightSkeleton() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50" aria-label="Loading spotlight resource">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex items-center justify-center">
              <div className="w-[300px] h-[200px] bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="flex-1 p-8 space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
              </div>
              <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
