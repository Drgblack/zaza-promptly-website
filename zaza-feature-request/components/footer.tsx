import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#0E1328] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Zaza Inbox Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/zaza-logo.png" alt="Zaza Logo" className="w-8 h-8 rounded-lg" />
              <h3 className="text-lg font-semibold">Zaza Inbox</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The AI inbox assistant built by educators to save you hours every week.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors">
              Start Free
            </Button>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Help Centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Security Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trust & Security</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                GDPR Compliant
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                FERPA Safe
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Built by Educators
              </li>
            </ul>
          </div>

          {/* Zaza Ecosystem Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Zaza Ecosystem</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/teach" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Zaza Teach
                </Link>
              </li>
              <li>
                <Link href="/promptly" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Zaza Promptly
                </Link>
              </li>
              <li>
                <Link href="/inbox" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Zaza Inbox
                </Link>
              </li>
              <li>
                <Link href="/visuals" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Zaza Visuals
                </Link>
              </li>
              <li>
                <Link href="/claritydeck" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Zaza ClarityDeck
                </Link>
              </li>
              <li>
                <Link href="/schwoop" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                  Zaza Schwoop
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </div>
            <div className="text-gray-300 text-sm text-center">Made with 💙 by teachers, for teachers.</div>
            <div className="text-gray-300 text-sm text-center lg:text-right">🧡 Trusted by educators worldwide</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
