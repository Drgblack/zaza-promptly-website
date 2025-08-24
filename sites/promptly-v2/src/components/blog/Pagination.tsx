import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

export default function Pagination({ currentPage, totalPages, basePath, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}/page/${page}`
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all page numbers if 7 or fewer pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 4) {
        // Show 1-5 ... last
        pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        // Show 1 ... last-4 to last
        pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        // Show 1 ... current-1, current, current+1 ... last
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pageNumbers.map((pageNum, index) => {
      if (pageNum === '...') {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-slate-400"
            aria-hidden="true"
          >
            ...
          </span>
        )
      }

      const isActive = pageNum === currentPage

      return (
        <Link
          key={pageNum}
          href={getPageUrl(pageNum as number)}
          className={`
            px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900
            ${
              isActive
                ? 'bg-purple-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }
          `}
          aria-label={isActive ? `Current page, page ${pageNum}` : `Go to page ${pageNum}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {pageNum}
        </Link>
      )
    })
  }

  return (
    <nav
      className={`flex items-center justify-center space-x-2 ${className}`}
      aria-label="Blog pagination"
    >
      {/* Previous button */}
      <Link
        href={getPageUrl(Math.max(1, currentPage - 1))}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900
          ${
            currentPage === 1
              ? 'text-slate-500 cursor-not-allowed pointer-events-none'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          }
        `}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </Link>

      {/* Page numbers */}
      {renderPageNumbers()}

      {/* Next button */}
      <Link
        href={getPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900
          ${
            currentPage === totalPages
              ? 'text-slate-500 cursor-not-allowed pointer-events-none'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          }
        `}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  )
}
