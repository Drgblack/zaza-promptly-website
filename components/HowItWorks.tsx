'use client';

import { useEffect } from 'react';

export default function HowItWorks() {
  useEffect(() => {
    const chalk = document.getElementById('chalkSound') as HTMLAudioElement;
    const steps = document.querySelectorAll('.step-card');

    steps.forEach((step) => {
      step.addEventListener('mouseenter', () => {
        if (chalk) chalk.play();
      });
    });
  }, []);

  return (
    <section className="relative bg-white py-20 px-6 lg:px-24">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-purple-700">
        How Zaza Promptly Works
      </h2>
      <p className="text-center text-gray-600 mb-12 text-lg">
        3 magical steps to transform your teacher life ✨
      </p>

      {/* Progress line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-40 w-1 h-[60%] bg-gradient-to-b from-purple-500 to-pink-400 animate-pulse z-0 hidden lg:block" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="step-card group bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center text-6xl">
            📝
          </div>
          <h3 className="text-xl font-semibold text-center text-purple-800">Jot a Note</h3>
          <p className="text-center text-gray-600 mt-2">
            Add a few quick notes about the student&apos;s progress, behaviour, or strengths.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step-card group bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center text-6xl">
            🤖
          </div>
          <h3 className="text-xl font-semibold text-center text-purple-800">Let the AI Work Its Magic</h3>
          <p className="text-center text-gray-600 mt-2">
            Our AI drafts personalised, curriculum-aligned feedback in your tone. Instantly.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-card group bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center text-6xl">
            ✈️
          </div>
          <h3 className="text-xl font-semibold text-center text-purple-800">Review & Share</h3>
          <p className="text-center text-gray-600 mt-2">
            One-click review. Add a tweak if you like. Then share it with students or parents.
          </p>
        </div>
      </div>

      {/* Chalk Sound Effect */}
      <audio id="chalkSound" src="/chalk.mp3" preload="auto" />
    </section>
  );
}
