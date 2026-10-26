import Hero from '../components/Hero.jsx'
import Divider from '../components/Divider.jsx'
import Projects from '../components/Projects.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Contact />
    </main>
  )
}
