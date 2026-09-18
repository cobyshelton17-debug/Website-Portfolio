import netflixClone from '../assets/projects/netflix-clone.svg'
import amazonClone from '../assets/projects/amazon-clone.svg'
import libraryApp from '../assets/projects/library-app.svg'

export type Project = {
  title: string
  description: string
  stack: string[]
  image: string
  link: string
}

export const projects: Project[] = [
  {
    title: 'Netflix Clone',
    description:
      'A streaming-style UI built with React, featuring movie browsing and search.',
    stack: ['React', 'Firebase', 'CSS'],
    image: netflixClone,
    link: 'https://github.com/',
  },
  {
    title: 'Amazon Clone',
    description:
      'An e-commerce storefront with cart state, product listings, and checkout flow.',
    stack: ['React', 'Redux', 'Firebase'],
    image: amazonClone,
    link: 'https://github.com/',
  },
  {
    title: 'Library App',
    description:
      'A book library manager with search, borrowing, and inventory tracking.',
    stack: ['React', 'Node.js', 'MongoDB'],
    image: libraryApp,
    link: 'https://github.com/',
  },
]