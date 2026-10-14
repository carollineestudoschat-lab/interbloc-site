import Image from "next/image";

const whatsapp = "https://wa.me/5585996028432";
const products = [
  { id: "h6", code: "01", name: "Retangular", model: "Tijolinho", thickness: "6 cm", title: "Piso Intertravado H6", use: "Tráfego leve, como calçadas e áreas residenciais.", image: "/images/piso-h6-tijolinho.png", alt: "Piso intertravado H6 retangular, modelo tijolinho", width: 768, height: 768 },
  { id: "h8", code: "02", name: "16 Faces", model: "Unistein", thickness: "8 cm", title: "Piso Intertravado H8", use: "Estacionamentos e áreas com circulação de veículos.", image: "/images/piso-h8-unistein.png", alt: "Piso intertravado H8 de 16 faces, modelo Unistein", width: 300, height: 300 },
];

function Arrow() {
  return <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Inter Bloc — início"><Image src="/images/logo-interbloc.png" alt="INTER BLOC — Soluções em pré-moldados" width={1600} height={800} className="official-logo" preload /></a>
        <nav aria-label="Navegação principal"><a href="#produtos">Produtos</a><a href="#sobre">A Inter Bloc</a><a className="nav-quote" href={whatsapp}>Solicitar orçamento <span aria-hidden="true"><Arrow /></span></a></nav>
      </header>
      <main id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero-top"><span>FORTALEZA — CEARÁ</span><span>FABRICAÇÃO & COMERCIALIZAÇÃO</span></div>
          <p className="hero-kicker">PISOS INTERTRAVADOS & PRÉ-MOLDADOS</p>
          <h1 id="hero-title">A FORÇA<br />DO <span>CONCRETO.</span><br />EM CADA PISO.</h1>
          <div className="hero-bottom"><p>Pisos intertravados e<br />pré-moldados de concreto.<br /><span>Da nossa fábrica para o seu projeto.</span></p><a className="button" href={whatsapp}>Faça seu orçamento <span aria-hidden="true"><Arrow /></span></a><a className="explore" href="#produtos">EXPLORE OS PRODUTOS ↓</a></div>
          <div className="hero-art"><Image src="/images/pilhas-pisos-intertravados.png" alt="Pilhas de pisos intertravados no pátio da Inter Bloc" fill sizes="(max-width: 800px) 100vw, 65vw" preload className="hero-photo" /><span className="photo-caption">INTER BLOC / PISOS INTERTRAVADOS</span></div>
        </section>
        <div className="service-strip"><span>FABRICAÇÃO PRÓPRIA</span><span>PISOS INTERTRAVADOS</span><span>PRÉ-MOLDADOS DE CONCRETO</span><span>FORTALEZA / CE</span></div>
        <section id="produtos" className="catalog section-pad" aria-labelledby="products-title">
          <div className="section-heading"><p className="eyebrow">01 / NOSSOS PRODUTOS</p><h2 id="products-title">A BASE DO<br /><span>SEU PROJETO.</span></h2><p>Formatos e aplicações.<br />Encontre o piso para o seu espaço.</p></div>
          {products.map((product) => <article id={product.id} className="product" key={product.id}><div className="product-visual"><Image src={product.image} alt={product.alt} width={product.width} height={product.height} sizes="(max-width: 800px) 90vw, 48vw" className={`product-photo product-photo-${product.id}`} /><span className="product-index">/{product.code}</span></div><div className="product-info"><p className="eyebrow">{product.title}</p><h3>{product.name}<span>{product.model}</span></h3><dl><div><dt>ESPESSURA</dt><dd>{product.thickness}</dd></div><div><dt>APLICAÇÕES</dt><dd>{product.use}</dd></div></dl><a className="text-link" href={`${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para ${product.title} — ${product.name}.`)}`}>Orçar este produto <span aria-hidden="true"><Arrow /></span></a></div></article>)}
        </section>
        <section className="factory section-pad" aria-labelledby="factory-title"><div className="factory-intro"><p className="eyebrow">CONCRETO / EM SUA ESSÊNCIA</p><h2 id="factory-title">É AQUI QUE<br />TUDO <span>GANHA FORMA.</span></h2><p>Um olhar para o nosso pátio, a produção e os pisos que saem da Inter Bloc.</p></div><div className="factory-grid"><figure className="factory-wide"><div className="factory-photo"><Image src="/images/patio-producao-intertravados.png" alt="Pátio de produção de pisos intertravados da Inter Bloc" fill sizes="(max-width: 800px) 90vw, 50vw" /></div><figcaption>01 / PÁTIO DE PRODUÇÃO</figcaption></figure><figure><div className="factory-photo"><Image src="/images/estoque-blocos-concreto.png" alt="Pisos de concreto empilhados e embalados em paletes" fill sizes="(max-width: 800px) 90vw, 30vw" /></div><figcaption>02 / PISOS EM ESTOQUE</figcaption></figure></div></section>
        <section id="sobre" className="about section-pad" aria-labelledby="about-title"><p className="eyebrow">02 / DIRETO DA INTER BLOC</p><div><h2 id="about-title">DA FABRICAÇÃO<br />AO SEU <span>ESPAÇO.</span></h2><p>Em Fortaleza, fabricamos e comercializamos pisos intertravados e pré-moldados de concreto. Fale com a nossa equipe para consultar produtos e condições comerciais.</p><div className="conditions"><p><span>01 / FORNECIMENTO</span>Fabricamos e vendemos os produtos. Não realizamos instalação.</p><p><span>02 / ENTREGA</span>Entrega disponível mediante consulta das condições.</p></div></div></section>
        <section id="contato" className="contact section-pad" aria-labelledby="contact-title"><p className="eyebrow">03 / VAMOS CONVERSAR</p><div className="contact-heading"><h2 id="contact-title">SEU PRÓXIMO<br />PROJETO <span>COMEÇA AQUI.</span></h2><a className="round-link" href={whatsapp} aria-label="Solicitar orçamento pelo WhatsApp"><Arrow /></a></div><div className="contact-details"><a href={whatsapp}><span>WHATSAPP / ORÇAMENTOS</span>(85) 99602-8432 <Arrow /></a><address><span>ENCONTRE A INTER BLOC</span>Rua Duarte Coelho, nº 1170<br />Paupina, Fortaleza — CE</address></div></section>
      </main>
      <footer><a href="#inicio" className="brand" aria-label="Inter Bloc — início"><Image src="/images/logo-interbloc.png" alt="INTER BLOC" width={1600} height={800} className="official-logo footer-logo" /></a><p>Pisos intertravados e pré-moldados de concreto.</p><span>PROPOSTA VISUAL / EM DESENVOLVIMENTO</span></footer>
    </>
  );
}
