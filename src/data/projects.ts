import netflixClone from '../assets/projects/netflix-clone.png'
import amazonClone from '../assets/projects/amazon-clone.png'
import libraryApp from '../assets/projects/summarist-clone.png'
import youtubeClone from '../assets/projects/youtube-clone.png'

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
    link: 'https://netflix-clone-gamma-blond.vercel.app/',
  },
  {
    title: 'Amazon Clone',
    description:
      'An e-commerce storefront with cart state, product listings, and checkout flow.',
    stack: ['React', 'Redux', 'Firebase'],
    image: amazonClone,
    link: 'https://amazon-clone-tan-pi-95.vercel.app/',
  },
  {
    title: 'Summerist Library App',
    description:
      'A book library manager with search, borrowing, and inventory tracking.',
    stack: ['React', 'Node.js', 'MongoDB'],
    image: libraryApp,
    link: 'https://advanced-inventory-eta.vercel.app/',
  },
  {
    title: 'Youtube Clone',
    description:
      'A video streaming platform with search and user management.',
    stack: ['React', 'Node.js', 'MongoDB'],
    image: youtubeClone,
    link: 'https://youtube-clone-gilt-delta.vercel.app/',
  },
]