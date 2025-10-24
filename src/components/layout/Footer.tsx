export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Tu Nombre</div>
        <div className="flex gap-4">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
