# Site institucional · Danieli Drum

Advocacia e Consultoria Jurídica · Direito Previdenciário e Direito Cível.
Next.js 16, React 19, TypeScript, TailwindCSS 4, Framer Motion, GSAP e React Three Fiber.

## Rodar

```bash
npm install
npm run dev                      # http://localhost:3000
npm run build && npm start       # produção
npm run build    # site estático em /out (Cloudflare Pages: comando npm run build, pasta out)
```

## Estrutura

- `src/app/` layout (fontes Cormorant Garamond + Jost), estilos globais com a paleta, página
- `src/components/sections/Navbar.tsx` cabeçalho com o logo horizontal
- `src/components/hero/` abertura com logo vertical e balança 3D em partículas
- `src/components/sections-a/` Sobre, Áreas de atuação, Diferenciais (textos em `content.ts`)
- `src/components/sections-b/` Como funciona, CTA, Rodapé com mapa (dados em `data.ts`)
- `public/brand/` arquivos oficiais do logo (não redesenhar nem recolorir)

## Dados pendentes

Procure por `PENDENTE` no código: número da OAB, WhatsApp, e-mail, endereço, Instagram,
foto profissional (`public/images/danieli-drum.jpg`) e texto de apresentação.
O WhatsApp aparece em `src/content/site.ts`, `src/components/hero/Hero.tsx` e `src/components/sections-b/data.ts`.
