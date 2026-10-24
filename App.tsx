import React, { useState, useEffect, useCallback } from 'react';
import { SiteData, Product } from './types';
import { getInitialSiteData, STORAGE_KEY } from './data/starterData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromiseStrip } from './components/PromiseStrip';
import { Collections } from './components/Collections';
import { Craft } from './components/Craft';
import { Heritage } from './components/Heritage';
import { Occasions } from './components/Occasions';
import { SwarnaSamrudhi } from './components/SwarnaSamrudhi';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { InquiryDialog } from './components/InquiryDialog';
import { AdminDialog } from './components/AdminDialog';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData>(() => getInitialSiteData());
  const [activeFilter, setActiveFilter] = useState('All');
  const [inquiryState, setInquiryState] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });
  const [adminOpen, setAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => (prev === message ? null : prev));
    }, 2200);
  }, []);

  const handleUpdateSiteData = useCallback((newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const openInquiry = (product: Product | null = null) => {
    setInquiryState({ isOpen: true, product });
  };

  const closeInquiry = () => {
    setInquiryState({ isOpen: false, product: null });
  };

  return (
    <>
      <div className="page-grain"></div>

      <Header
        announcement={siteData.announcement}
        onOpenInquiry={() => openInquiry(null)}
      />

      <main>
        <Hero onOpenInquiry={() => openInquiry(null)} />
        <PromiseStrip />
        <Collections
          products={siteData.products}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          onOpenInquiry={(product) => openInquiry(product || null)}
        />
        <Craft onOpenInquiry={() => openInquiry(null)} />
        <Heritage
          ownerName={siteData.ownerName}
          ownerBlurb={siteData.ownerBlurb}
          phone={siteData.phone}
          address={siteData.address}
          onOpenInquiry={() => openInquiry(null)}
        />
        <Occasions onSelectFilter={setActiveFilter} />
        <SwarnaSamrudhi
          onOpenInquiry={(customNote) =>
            openInquiry({
              category: 'Scheme',
              name: 'Swarna Samrudhi Gold Plan',
              note: customNote || 'Flexible Gold Biscuit Scheme',
              image: '/assets/brand-logo-source.png'
            })
          }
        />
        <Visit
          address={siteData.address}
          phone={siteData.phone}
          onOpenInquiry={() => openInquiry(null)}
        />
      </main>

      <Footer
        onOpenInquiry={() => openInquiry(null)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <WhatsAppFloat onOpenInquiry={() => openInquiry(null)} />

      <InquiryDialog
        isOpen={inquiryState.isOpen}
        product={inquiryState.product}
        phone={siteData.phone}
        onClose={closeInquiry}
      />

      <AdminDialog
        isOpen={adminOpen}
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onClose={() => setAdminOpen(false)}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} />
    </>
  );
};

export default App;
