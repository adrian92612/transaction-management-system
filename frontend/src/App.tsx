import Footer from "#components/Footer";
import Header from "#components/Header";
import TransactionSection from "#components/Transactions/TransactionSection";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <TransactionSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
