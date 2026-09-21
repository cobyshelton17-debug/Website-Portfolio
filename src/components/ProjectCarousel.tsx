import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { projects } from '../data/projects'

function ProjectCarousel() {
  const [details, setDetails] = useState({ rel: 0, maxIdx: 0 })
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 24,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
    created(slider) {
      setDetails(slider.track.details)
    },
    slideChanged(slider) {
      setDetails(slider.track.details)
    },
  })

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={sliderRef} className="w-full">
        {projects.map((project) => (
          <div key={project.title} className="keen-slider__slide">
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

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => instanceRef.current?.prev()}
          disabled={details.rel === 0}
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
          onClick={() => instanceRef.current?.next()}
          disabled={details.rel === details.maxIdx}
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