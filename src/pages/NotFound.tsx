import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page py-12 text-center">
      <h1 className="mb-4 text-4xl text-ink">404</h1>
      <p className="mb-8">That page doesn&apos;t exist.</p>
      <Link to="/" className="btn btn-primary px-6 py-3">
        Back Home
      </Link>
    </section>
  )
}

export default NotFound