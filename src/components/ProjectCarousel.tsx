import { useEffect, useState } from 'react'
import { projects } from '../data/projects'

function useVisibleCount() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      if (width < 640) {
        setCount(1)
      } else if (width < 1024) {
        setCount(2)
      } else {
        setCount(3)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return count
}

function ProjectCarousel() {
  const [index, setIndex] = useState(0)
  const visible = useVisibleCount()
  const maxIndex = Math.max(0, projects.length - visible)
  const activeIndex = Math.min(index, maxIndex)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * (100 / visible)}%)` }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="shrink-0 px-3"
              style={{ width: `${100 / visible}%` }}
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
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
          aria-label="Previous projects"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
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
          onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          disabled={activeIndex === maxIndex}
          aria-label="Next projects"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
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