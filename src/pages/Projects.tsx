import ProjectCarousel from '../components/ProjectCarousel'

function Projects() {
  return (
    <section className="page scroll-mt-8 py-12 text-center">
      <h1 className="mb-4 text-4xl text-ink">Projects</h1>
      <p className="mb-8">A few things I've built.</p>
      <ProjectCarousel />
    </section>
  )
}

export default Projects