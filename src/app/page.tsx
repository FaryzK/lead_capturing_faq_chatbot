import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold">Welcome to Dr Chan Family Clinic</h1>
      <p className="mt-4">This is a demo page to showcase the chat widget.</p>
      
      <ChatWidget />
    </main>
  );
}
