import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? ' active' : ''}`

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <div className="flex min-h-svh flex-col max-w-[60rem] mx-auto px-6">
      <header className="border-b border-line py-6">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="brand" end>
            Coby Shelton
          </NavLink>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 md:flex">
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
              <NavLink to="/projects" className={linkClass}>
                Projects
              </NavLink>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </nav>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-9 w-9 flex-col items-center justify-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-ink md:hidden"
            >
              <span
                className={`block h-0.5 w-4 rounded bg-current transition-transform ${
                  menuOpen ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`my-1 block h-0.5 w-4 rounded bg-current transition-opacity ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-4 rounded bg-current transition-transform ${
                  menuOpen ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="menu-panel mt-4 flex flex-col gap-3 border-t border-line pt-4 md:hidden"
          >
            <NavLink to="/" className={linkClass} end onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
          </nav>
        )}
      </header>
      <main className="flex flex-1 flex-col gap-14 py-12">
        <Outlet />
      </main>
      <footer className="site-footer border-t border-line py-6 text-center text-sm">
        <div className="mb-3 flex justify-center gap-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Coby Shelton on GitHub"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Coby Shelton on LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Coby Shelton on Twitter"
          >
            Twitter
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Coby Shelton</p>
      </footer>
    </div>
  )
}

export default Layout