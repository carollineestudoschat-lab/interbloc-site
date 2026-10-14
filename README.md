# Inter Bloc

Site institucional em desenvolvimento com Next.js (App Router), TypeScript e Tailwind CSS. A página inicial é uma proposta visual em português; logotipo e fotografias oficiais já foram integrados; refinamento visual aguarda a aprovação da empresa. O catálogo apresenta H6 Retangular (6 cm) e H8 16 Faces (8 cm). O orçamento abre o WhatsApp oficial. A empresa não realiza instalação; entrega mediante consulta. Não há formulário ou publicação configurados.

## Ambiente

- Node.js 24 (versão indicada em `.nvmrc`) e npm.
- Nenhuma chave, banco de dados ou variável de ambiente é necessária nesta etapa.

```bash
npm ci
npm run dev -- --hostname 127.0.0.1
```

Em ambientes com diretório pessoal sem permissão de escrita, use `npm_config_cache=/tmp/interbloc-npm-cache` antes dos comandos npm.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
npm run start -- --hostname 127.0.0.1
```

O servidor usa a porta 3000. Para conferir a resposta local, execute `curl --fail http://127.0.0.1:3000` em outro terminal. Encerre o servidor de desenvolvimento antes de iniciar o de produção na mesma porta.

## Estrutura

- `src/app/page.tsx`: seções da página inicial.
- `src/app/layout.tsx`: idioma e metadados; indexação por mecanismos de busca desativada durante o desenvolvimento.
- `src/app/globals.css`: Tailwind e estilos da identidade visual provisória.
- `public/`: arquivos estáticos.

Não há fontes ou imagens externas necessárias para renderizar a página. Os links do menu levam às seções reais da página. As imagens são os arquivos oficiais em `public/images`: logotipo original no cabeçalho e rodapé; H6/H8 no catálogo; pisos empilhados no hero; pátio e estoque na seção de produção. Os 10 PNG originais permanecem intactos. Next/Image gera versões otimizadas localmente. O H8 original tem 300 × 300 pixels; por isso a imagem do produto tem tamanho de exibição limitado. Animações respeitam a preferência por movimento reduzido.

Nenhum deploy deve ser realizado antes da aprovação do design. `npm run build` gera apenas os arquivos locais de produção.

## Capturas para revisão do design

As capturas da versão atual estão salvas no próprio repositório e podem ser abertas no GitHub sem publicar o site:

- [Desktop — 1440 px](docs/previews/desktop.png)
- [Mobile — 390 px](docs/previews/mobile.png)

![Inter Bloc — desktop](docs/previews/desktop.png)

![Inter Bloc — mobile](docs/previews/mobile.png)
