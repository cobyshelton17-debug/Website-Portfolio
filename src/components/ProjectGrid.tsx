import { projects } from '../data/projects'

function ProjectGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article key={project.title} className="project-card">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="project-image"
          />
          <div className="flex flex-1 flex-col gap-3 p-6">
            <h2 className="text-xl text-ink">{project.title}</h2>
            <p className="text-muted">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent-bg px-3 py-1 text-sm text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-link mt-auto text-accent"
            >
              View source
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProjectGrid