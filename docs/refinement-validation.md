# Validação do refinamento visual

Validação feita em 14/10/2026 no Chromium local com Playwright, usando o build de produção. A validação não implica publicação do site ou aprovação do design.

## Verificações

- ESLint, TypeScript e build Next.js.
- Navegação em desktop (1440 px) e celular por emulação com toque (390 px).
- Responsividade adicional em 320, 768, 1024 e 1920 px: sem rolagem horizontal ou extravasamento do título principal.
- Sequência de animação do hero e 25 elementos revelados por interseção durante a rolagem.
- Fotografias carregadas, com texto alternativo e sem recortar as peças H6/H8 no catálogo.
- Links internos válidos; navegação por toque; links de orçamento com número oficial e mensagem específica H6/H8.
- Alvos principais de navegação e orçamento com pelo menos 44 px de altura.
- Feedback de hover do botão principal e zoom discreto na fotografia de fabricação.
- Movimento reduzido, inclusive mudança da preferência durante a sessão.
- Conteúdo visível sem JavaScript, sem Intersection Observer e com falha simulada na criação do observer.
- Axe-core: regras WCAG 2 A/AA e 2.1 AA executadas em desktop e mobile. Esse teste automatizado não substitui uma avaliação manual completa com leitores de tela.
- Comparação dos 10 PNG oficiais com as versões do commit `056a80f`: arquivos preservados byte a byte.

## Limites das fotografias

H6 tem 768 × 768 px; H8 tem 300 × 300 px, incluindo o fundo preto. A peça H8 ocupa aproximadamente 222 × 161 px no arquivo: ampliar para preencher um painel grande perderia nitidez. O refinamento limita a imagem a 300 px e compacta o painel. Fotografias de maior resolução poderão melhorar a apresentação futura, sem necessidade de alterar o restante do catálogo.

As fotos de pátio e estoque também têm resolução limitada (392 × 365 e 411 × 437 px); os arquivos originais não foram alterados. Não foram usadas fotografias genéricas nem criadas características técnicas adicionais.

## Revisão visual

- [Desktop — 1440 px](previews/desktop.png)
- [Mobile — 390 px](previews/mobile.png)

As capturas são estáticas; as animações e microinterações precisam ser vistas executando o site. Não foi feito deploy nem incorporação na branch `main`.
