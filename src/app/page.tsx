import ContactInfo from '@/components/ContactInfo';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main>
      <ContactInfo />
      <Navbar />
      <HeroSection />
      <ChatWidget />
    </main>
  );
}
