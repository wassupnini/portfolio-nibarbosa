import SectionTitle from './SectionTitle.jsx'

const SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'React',
  'Tailwind CSS',
  'Vite',
  'Git',
  'GitHub',
  'SQL',
  'MySQL',
  'VMware ESXi',
]

export default function Skills() {
  return (
    <section className="page">
      <SectionTitle>Skills</SectionTitle>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
