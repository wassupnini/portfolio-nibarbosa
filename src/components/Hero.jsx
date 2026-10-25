import kuromi from '../assets/kuromi.png'

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <h1 className="hero-title">
          Olá, eu sou a <br />
          <span className="hero-name">Nicole Barbosa</span>
        </h1>
        <p className="hero-subtitle">Estudante de Engenharia de Software.</p>
        <p>
          Desenvolvendo aplicações onde a precisão da engenharia se encontra com o cuidado
          estético do design.
        </p>
      </div>

      <div className="hero-image-wrap">
        <img
          className="hero-image"
          src={kuromi}
          alt="Mascote Kuromi"
          width="360"
          height="360"
        />
      </div>
    </section>
  )
}