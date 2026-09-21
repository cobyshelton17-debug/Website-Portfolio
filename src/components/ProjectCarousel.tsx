import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { projects } from '../data/projects'

function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500 })],
  )

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex">
          {projects.map((project) => (
            <div
              key={project.title}
              className="min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <article className="project-card flex h-full flex-col">
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
                    Visit Project
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous projects"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next projects"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProjectCarousel