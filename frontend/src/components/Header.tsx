export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Transactions
        </h1>
        <p className="text-sm text-gray-500">
          Manage and monitor your payment activity.
        </p>
      </div>
    </header>
  );
}
