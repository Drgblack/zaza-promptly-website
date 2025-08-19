"use client"

import { X, Check } from 'lucide-react'

const genericAILimitations = [
  'Hallucinates policies',
  'Overly formal or robotic', 
  'No school context'
]

const promptlyBenefits = [
  'School-safe tone + templates',
  'Consistent, human voice',
  'Designed with teachers\' workflows'
]

export function TeacherDifferentiatorSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Generic AI vs AI built for teachers
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generic AI Limitations */}
          <div className="bg-red-50/10 backdrop-blur-sm rounded-2xl p-8 border border-red-200/20">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <X className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-red-100">Generic AI</h3>
            </div>
            
            <ul className="space-y-4">
              {genericAILimitations.map((limitation, index) => (
                <li key={index} className="flex items-start">
                  <X className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-red-100">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Promptly Benefits */}
          <div className="bg-green-50/10 backdrop-blur-sm rounded-2xl p-8 border border-green-200/20">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <Check className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-green-100">Promptly</h3>
            </div>
            
            <ul className="space-y-4">
              {promptlyBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-green-100">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Illustrative comparison */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-red-200 mb-4">Generic AI output:</h4>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-red-200/20">
                <p className="text-red-100 italic text-sm">
                  "The student demonstrates adequate performance in mathematical computations with room for improvement in problem-solving methodologies."
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-green-200 mb-4">Promptly output:</h4>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-green-200/20">
                <p className="text-green-100 text-sm">
                  "Sarah shows great effort in her maths work and is getting more confident with her times tables. Let's focus on word problems together - she's almost there!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}