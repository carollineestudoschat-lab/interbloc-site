import Image from "next/image";
import { ScrollReveals } from "@/components/scroll-reveals";
import InterblocHeaderHero from "@/components/interbloc-header-hero";

const whatsapp = "https://wa.me/5585996028432";
const quote = `${whatsapp}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de pisos intertravados da Inter Bloc.")}`;
const products = [
  {
    id: "h6", name: "Retangular", model: "Tijolinho", thickness: "6 cm",
    title: "Piso Intertravado H6",
    use: "Calçadas e áreas residenciais de tráfego leve.",
    image: "/images/piso-h6-tijolinho.png",
    alt: "Piso intertravado H6 retangular, modelo tijolinho",
    width: 768, height: 768,
  },
  {
    id: "h8", name: "16 Faces", model: "Unistein", thickness: "8 cm",
    title: "Piso Intertravado H8",
    use: "Estacionamentos e áreas com circulação de veículos.",
    image: "/images/piso-h8-unistein.png",
    alt: "Piso intertravado H8 de 16 faces, modelo Unistein",
    width: 300, height: 300,
  },
];

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <ScrollReveals />
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <InterblocHeaderHero quoteHref={quote} />
      <main id="conteudo">

        <div className="service-strip">
          <p>Pisos intertravados <span>H6 / 6 cm · H8 / 8 cm</span></p>
          <p>Fabricação e venda <span>Entrega mediante consulta</span></p>
        </div>

        <section id="produtos" className="catalog section-pad" aria-labelledby="products-title">
          <div className="section-heading">
            <div><p className="eyebrow">CATÁLOGO / CONCRETO</p><h2 id="products-title" data-reveal>Dois formatos.<br /><span>Aplicações diferentes.</span></h2></div>
            <p className="catalog-intro" data-reveal data-delay="1">Conheça os pisos H6 e H8, suas espessuras e indicações de uso. Para consultar o fornecimento, peça um orçamento do modelo escolhido.</p>
          </div>
          {products.map((product) => (
            <article id={product.id} className="product" key={product.id} aria-labelledby={`${product.id}-title`}>
              <div className={`product-visual product-visual-${product.id}`} data-reveal>
                <div className="visual-heading"><span>{product.id.toUpperCase()}</span><span>{product.thickness} / CONCRETO</span></div>
                <div className="product-stage">
                  <Image src={product.image} alt={product.alt} width={product.width} height={product.height} sizes={product.id === "h8" ? "300px" : "(max-width: 800px) 110vw, 60vw"} className={`product-photo product-photo-${product.id}`} />
                </div>
              </div>
              <div className="product-info">
                <p className="eyebrow" data-reveal>{product.title}</p>
                <h3 id={`${product.id}-title`} data-reveal data-delay="1">{product.name}<span>{product.model}</span></h3>
                <dl>
                  <div data-reveal data-delay="1"><dt>Espessura</dt><dd>{product.thickness}</dd></div>
                  <div data-reveal data-delay="2"><dt>Onde utilizar</dt><dd>{product.use}</dd></div>
                </dl>
                <a className="text-link" data-reveal data-delay="2" href={`${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para ${product.title} — ${product.name}.`)}`}>
                  Pedir orçamento do {product.id.toUpperCase()} <span><Arrow /></span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section id="fabricacao" className="factory section-pad" aria-labelledby="factory-title">
          <div className="factory-intro"><p className="eyebrow">NA FÁBRICA / INTER BLOC</p><p>Produção e estoque, em Fortaleza.</p></div>
          <div className="factory-grid">
            <figure className="factory-wide" data-reveal>
              <div className="factory-photo"><Image src="/images/patio-producao-intertravados.png" alt="Pátio de produção de pisos intertravados da Inter Bloc" fill sizes="(max-width: 800px) 90vw, 44vw" /></div>
              <figcaption>Pátio de produção de pisos intertravados.</figcaption>
            </figure>
            <div className="factory-side">
              <div className="factory-copy">
                <h2 id="factory-title" data-reveal>Do pátio de produção<br /><span>ao estoque.</span></h2>
                <p data-reveal data-delay="1">Estas são as peças, o pátio e o estoque da Inter Bloc. É daqui, na Paupina, que fabricamos os pisos apresentados neste catálogo.</p>
                <a className="factory-link" href="#sobre">Conheça a Inter Bloc <Arrow /></a>
              </div>
              <figure data-reveal data-delay="1">
                <div className="factory-photo"><Image src="/images/estoque-blocos-concreto.png" alt="Pisos de concreto empilhados e embalados em paletes" fill sizes="(max-width: 800px) 75vw, 28vw" /></div>
                <figcaption>Peças de concreto no estoque.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="sobre" className="about section-pad" aria-labelledby="about-title">
          <div className="about-heading"><p className="eyebrow">INTER BLOC / PAUPINA, FORTALEZA</p><h2 id="about-title" data-reveal>Fabricação e venda.<br /><span>Aqui em Fortaleza.</span></h2></div>
          <div className="about-copy">
            <p data-reveal data-delay="1">A Inter Bloc fabrica e comercializa pisos intertravados e pré-moldados de concreto. Nosso atendimento é pelo WhatsApp, para consultar os modelos e solicitar seu orçamento.</p>
            <div className="conditions">
              <p data-reveal data-delay="1"><span>FORNECIMENTO</span>Vendemos os produtos. Não realizamos instalação.</p>
              <p data-reveal data-delay="2"><span>ENTREGA</span>Disponível mediante consulta das condições.</p>
            </div>
          </div>
        </section>

        <section id="contato" className="contact section-pad" aria-labelledby="contact-title">
          <p className="eyebrow">ORÇAMENTOS / WHATSAPP</p>
          <div className="contact-heading">
            <div><h2 id="contact-title" data-reveal>Qual piso você<br />precisa orçar?</h2><p className="contact-instructions" data-reveal data-delay="1">Envie o modelo, a quantidade desejada e o local de entrega pelo WhatsApp.</p></div>
            <div className="contact-action" data-reveal data-delay="1"><a className="round-link" href={quote} aria-label="Solicitar orçamento pelo WhatsApp"><Arrow /></a><p>Fale com<br />a Inter Bloc</p></div>
          </div>
          <div className="contact-details" data-reveal data-delay="2">
            <a href={quote}><span>ORÇAMENTO E ATENDIMENTO</span>(85) 99602-8432 <Arrow /></a>
            <address><span>ENDEREÇO DA FÁBRICA</span>Rua Duarte Coelho, nº 1170<br />Paupina, Fortaleza — CE</address>
          </div>
        </section>
      </main>
      <footer>
        <a href="#inicio" className="brand" aria-label="Inter Bloc — início"><Image src="/images/logo-interbloc.png" alt="INTER BLOC" width={1600} height={800} className="official-logo footer-logo" /></a>
        <p>Pisos intertravados e pré-moldados de concreto.</p><a className="footer-top" href="#inicio">Voltar ao início <Arrow /></a>
      </footer>
    </>
  );
}
