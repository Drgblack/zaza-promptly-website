'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface UpsellModalProps {
  isOpen: boolean;
  feature: 'reports' | 'staff' | 'docs' | null;
  onClose: () => void;
}

export function UpsellModal({ isOpen, feature, onClose }: UpsellModalProps) {
  const t = useTranslations('draft.demo.upsell');

  useEffect(() => {
    if (isOpen && feature) {
      // Track GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'demo_upsell_opened', {
          tab: feature,
          locale: document.documentElement.lang || 'en'
        });
      }
    }
  }, [isOpen, feature]);

  const handleCtaClick = () => {
    // Track GA4 event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        location: 'demo_upsell',
        feature: feature,
        locale: document.documentElement.lang || 'en'
      });
    }
    onClose();
  };

  if (!isOpen || !feature) return null;

  const featureNames = {
    reports: 'student reports',
    staff: 'staff notes', 
    docs: 'documentation'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
        
        <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pr-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t(`title.${feature}`)}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {t('body', { feature: featureNames[feature] })}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCtaClick}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {t('cta')}
              </button>
              
              <button
                onClick={onClose}
                className="w-full px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors text-sm"
              >
                {t('examples')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}