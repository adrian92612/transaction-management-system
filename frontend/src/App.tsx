import Footer from "#components/Footer";
import Header from "#components/Header";
import TransactionList from "#components/TransactionList";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <TransactionList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
