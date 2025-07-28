"use client"

import Link from "next/link"
import Image from "next/image"

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/zaza-logo.png" alt="Zaza Technologies" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-gray-900">Zaza Technologies</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
