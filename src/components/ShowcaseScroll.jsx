import ContainerScroll from './ContainerScroll.jsx';

export default function ShowcaseScroll() {
  return (
    <div className="showcase-scroll-bg">
      <ContainerScroll
        titleComponent={
          <div className="cs-title-block">
            <span className="eyebrow">Trabalho</span>
            <h2 className="section-title">
              Cada detalhe construído<br />
              <em className="hero__title-em">para converter.</em>
            </h2>
            <p className="section-desc cs-title-desc">
              Da cópia ao pixel final — entregamos a estrutura que os grandes usam,
              sem você precisar terceirizar cinco profissionais.
            </p>
          </div>
        }
      >
        <video
          className="cs-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="https://djqhpvmdlnnnspyarexn.supabase.co/storage/v1/object/public/Videos/Vortex.mp4"
            type="video/mp4"
          />
        </video>
      </ContainerScroll>
    </div>
  );
}
