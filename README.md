# Medidor de Qualidade de Página

Landing page de funil de marketing que simula uma ferramenta de análise de qualidade de páginas de vendas. O visitante cola a URL da sua página, vê uma animação de análise e recebe um relatório fictício com pontos de melhoria — e é direcionado para um formulário externo.

## Funcionalidades

- **Análise determinística**: o mesmo URL sempre gera o mesmo resultado (hash djb2 + PRNG mulberry32)
- **Resultados variáveis**: URLs diferentes geram pontuações e itens diferentes
- **Zero dependências de backend**: tudo calculado no client-side
- **Mobile-first**: responsivo para tráfego vindo de anúncios

## Estrutura de telas

| Tela | Descrição |
|------|-----------|
| **Input** | Coleta a URL da página do usuário |
| **Loading** | Animação de análise (~7 segundos) |
| **Resultado** | Pontuação, itens avaliados e CTA para o formulário |

## Pré-requisitos

- Node.js 18+
- npm 9+

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd medidor-qualidade-pagina

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local e substitua o valor de NEXT_PUBLIC_FORM_URL

# 4. Suba o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `NEXT_PUBLIC_FORM_URL` | URL do formulário externo para onde o botão CTA redireciona | Sim |

Exemplo de `.env.local`:

```env
NEXT_PUBLIC_FORM_URL=https://forms.example.com/minha-consultoria
```

> **Nota:** Variáveis prefixadas com `NEXT_PUBLIC_` são expostas no bundle do cliente. Não use para dados sensíveis.

## Deploy na Vercel

1. Faça push do repositório para o GitHub.
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New → Project**.
3. Importe o repositório.
4. Na etapa de configuração, adicione a variável de ambiente:
   - **Name:** `NEXT_PUBLIC_FORM_URL`
   - **Value:** URL real do seu formulário
5. Clique em **Deploy**.

A Vercel detecta automaticamente projetos Next.js — nenhuma configuração adicional é necessária.

## Estrutura de arquivos

```
├── app/
│   ├── globals.css        # Estilos globais + Tailwind
│   ├── layout.tsx         # Root layout (metadata SEO)
│   └── page.tsx           # Gerenciamento de estado das 3 telas
├── components/
│   ├── InputScreen.tsx    # Tela 1: coleta de URL
│   ├── LoadingScreen.tsx  # Tela 2: animação de análise
│   └── ResultScreen.tsx   # Tela 3: resultado + CTA
├── lib/
│   └── scoreGenerator.ts  # Hash djb2 + PRNG mulberry32 + lógica de score
├── .env.local.example     # Modelo de variáveis de ambiente
└── README.md
```

## Customização

### Alterar itens de avaliação

Edite o array `EVALUATION_ITEMS` em `lib/scoreGenerator.ts`.

### Alterar faixa de pontuação

No mesmo arquivo, altere a linha:
```ts
const score = Math.floor(rand() * 31) + 42; // 42–72
```

### Alterar mensagens do loading

Edite o array `STEPS` em `components/LoadingScreen.tsx`.

### Alterar duração do loading

Em `components/LoadingScreen.tsx`, ajuste:
```ts
const TOTAL_DURATION = 7000; // ms
```
