import Footer from "#components/Footer";
import Header from "#components/Header";
import TransactionSection from "#components/Transactions/TransactionSection";
import { Toaster } from "#components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <TransactionSection />
      </main>
      <Footer />
      <Toaster position="top-center" closeButton />
    </div>
  );
}

export default App;
