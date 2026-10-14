# Revisão editorial e comercial — Inter Bloc

Proposta na branch `feat/editorial-refinement`, baseada na produção `4ae7c40`. A incorporação à `main` depende de aprovação desta revisão. Não houve alteração da configuração de produção da Vercel.

## Diagnóstico e refinamento

A versão anterior repetia slogans e uma mesma organização de título grande, descrição e fotografia. A revisão preserva o hero, as seções, a identidade industrial e os ativos oficiais, mas dá às demais seções tarefas e composições distintas.

- Hero: título principal preservado; descrição identifica fabricação, localização e modelos. CTA direto para orçamento e navegação para o catálogo, sem o indicador decorativo de mouse.
- Catálogo: títulos e informações mais fáceis de escanear, rótulos repetidos removidos e painéis ajustados ao enquadramento real de cada imagem. O H8 permanece limitado a 300 px. Os botões identificam o modelo e mantêm mensagens específicas no WhatsApp.
- Fábrica: a fotografia de produção abre a composição; texto e fotografia de estoque dividem uma coluna lateral. As legendas descrevem o que é mostrado, sem slogans ou sequências numéricas decorativas.
- Institucional: título de menor escala e conteúdo de fornecimento em coluna própria. Fabricação e venda, ausência de instalação e entrega mediante consulta continuam explícitas.
- Contato: chamada concreta para orçamento e instruções para enviar modelo, quantidade e local de entrega. Número e endereço oficiais preservados.
- Navegação: feedback existente mantido; retorno ao início no rodapé. Mesma lógica de animações acessíveis, sem novas bibliotecas.

## Verificações executadas

- `npm run lint`, `npm run build`, `npm run typecheck` e `git diff --check`: passaram.
- Chromium com Playwright: desktop 1440 px e mobile emulado com toque 390 px; navegação interna, estados de hover, imagens carregadas, textos alternativos e links de WhatsApp H6/H8.
- Responsividade adicional em 320, 768, 1024 e 1920 px: sem rolagem horizontal ou extravasamento do h1.
- Verificação geométrica dos recortes: peças H6 e H8 completas dentro dos painéis.
- Sequência do hero e 26 elementos com revelação por interseção; preferência por movimento reduzido, incluindo mudança durante a sessão.
- Conteúdo visível sem JavaScript, sem Intersection Observer e com falha simulada no observer.
- Axe-core: nenhuma violação nas regras WCAG 2 A/AA e 2.1 AA executadas em desktop e mobile. Essa verificação automatizada não substitui avaliação manual completa com leitores de tela.
- Os dez PNG oficiais e o favicon são idênticos aos arquivos da versão de produção `4ae7c40`. Nenhuma dependência foi adicionada.

## Limitação das imagens

A fotografia H8 tem 300 × 300 px, incluindo seu fundo; a peça ocupa uma área menor no arquivo. O painel foi compactado para valorizá-la sem ampliar artificialmente a imagem. As fotos de produção e estoque também têm resolução limitada; os originais não foram editados, substituídos ou recriados.

## Capturas da proposta

- [Desktop — 1440 px](previews/desktop.png)
- [Mobile — 390 px](previews/mobile.png)

As capturas não mostram as animações. Para revisão interativa, use uma Preview Deployment da branch `feat/editorial-refinement` na Vercel. A `main` continua sendo a versão de produção aprovada anteriormente.
