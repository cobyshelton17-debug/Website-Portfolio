import { Link } from 'react-router-dom'
import ProjectGrid from '../components/ProjectGrid'
import Reveal from '../components/Reveal'
import aboutImg from '../assets/IMG_3775.jpg'

const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML & CSS',
  'Tailwind CSS',
  'Node.js',
  'Firebase',
  'Git',
]

function Home() {
  return (
    <>
      <section className="hero-fade text-center py-12 pb-4">
        <h1 className="mb-6 text-5xl tracking-tight text-ink sm:text-6xl">
          Hi, I&apos;m Coby Shelton<span className="text-accent">.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted">
          Software developer who builds clean, focused web experiences — from
          portfolio sites to full-scale applications.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn btn-primary px-6 py-3">
            Contact Me
          </Link>
        </div>
      </section>

      <Reveal>
        <section id="about" className="scroll-mt-8">
          <h2 className="mb-10 text-center text-3xl text-ink">About Me</h2>
          <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-6 text-center">
            <img
              src= {aboutImg}
              alt="Portrait of Coby Shelton"
              className="about-photo h-[12.5rem] w-[12.5rem] rounded-full object-cover"
            />
            <p>
              I'm a software developer who enjoys turning ideas into
              polished, working products. I focus on building modern frontends
              and tying them together with clean, maintainable code.
            </p>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-ink">Skills</h3>
              <ul className="flex list-none flex-wrap justify-center gap-2 p-0">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-accent-bg px-4 py-1.5 text-sm text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <section id="projects" className="scroll-mt-8">
        <h2 className="mb-8 text-center text-3xl text-ink">Projects</h2>
        <p className="mb-8 text-center">A few things I&apos;ve built.</p>
        <ProjectGrid />
      </section>
    </>
  )
}

export default Home