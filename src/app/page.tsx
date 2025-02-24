import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ChatWidget />
    </main>
  );
}
