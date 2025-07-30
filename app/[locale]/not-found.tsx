import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('Common')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}