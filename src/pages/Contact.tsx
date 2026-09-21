import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <section className="page py-12 text-center">
      <h1 className="mb-4 text-4xl text-ink">Contact</h1>
      <p className="mb-8">
        Have a project in mind or just want to say hi? I'd love to hear
        from you.
      </p>
      <ContactForm />
      <div className="mt-10 flex justify-center gap-6">
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
      </div>
    </section>
  )
}

export default Contact