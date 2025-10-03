'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DemoTabs } from './DemoTabs';
import { ParentCommsForm } from './ParentCommsForm';
import { UpsellModal } from './UpsellModal';

export function DraftDemo() {
  const t = useTranslations('draft.demo');
  const [upsellModal, setUpsellModal] = useState<{
    isOpen: boolean;
    feature: 'reports' | 'staff' | 'docs' | null;
  }>({ isOpen: false, feature: null });

  const tabs = [
    { id: 'parent', label: t('tabs.parent'), active: true },
    { id: 'reports', label: t('tabs.reports'), disabled: true },
    { id: 'staff', label: t('tabs.staff'), disabled: true },
    { id: 'docs', label: t('tabs.docs'), disabled: true },
  ] as const;

  const handleDisabledClick = (id: 'reports' | 'staff' | 'docs') => {
    setUpsellModal({ isOpen: true, feature: id });
  };

  const closeUpsell = () => {
    setUpsellModal({ isOpen: false, feature: null });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <DemoTabs 
            tabs={tabs}
            onDisabledClick={handleDisabledClick}
          />
          
          <div className="p-6">
            <ParentCommsForm />
          </div>
        </div>

        <UpsellModal 
          isOpen={upsellModal.isOpen}
          feature={upsellModal.feature}
          onClose={closeUpsell}
        />
      </div>
    </section>
  );
}