import localFont from 'next/font/local';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SmoothScroll from '@/providers/smooth-scroll';

const aliNurNakkhatra = localFont({
  src: '../../fonts/LiAlinurNakkhatraUnicode.ttf',
  variable: '--font-alinurnakkhatra',
  display: 'swap',
});

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <Header />
      <main className={`min-h-screen ${aliNurNakkhatra.variable} relative`}>
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}