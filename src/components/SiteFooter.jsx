export default function SiteFooter({ socialLinks }) {
  return (
    <footer className="mx-auto flex w-full max-w-[1280px] flex-col gap-5 border-t border-white/10 px-4 py-8 text-sm text-text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
      <p className="text-xl font-black text-white">Bjorn Tanamal</p>
      <div className="flex flex-wrap gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-tertiary">Designed & built for job hunting.</p>
    </footer>
  );
}
