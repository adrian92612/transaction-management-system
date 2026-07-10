export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 mt-auto bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
        <p>
          © {new Date().getFullYear()} Transaction Management System. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
