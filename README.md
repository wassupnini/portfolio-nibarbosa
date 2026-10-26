# Portfólio Nicole Barbosa

Portfólio pessoal desenvolvido na disciplina de Web Development (CP3). O site lista projetos buscados automaticamente da API do GitHub, tem um formulário de contato que envia e-mail e salva as mensagens, e um dashboard protegido por login para consultá-las e escolher os projetos em destaque.

**Site publicado:** (preencher após o deploy na Vercel)

**Acesso rápido:** o site publicado já está configurado na Vercel, então não é preciso criar conta para navegá-lo ou testar o formulário de contato. O dashboard é restrito ao dono do site. Para verificar o bloqueio, acesse `/dashboard` sem estar logado: você será redirecionado para a tela de login.

## Funcionalidades

- Página inicial com apresentação (Hero com kuromi), projetos em destaque, skills e formulário de contato.
- Página de detalhe para cada projeto (`/projetos/:slug`), com link para o repositório no GitHub.
- Página 404 para rotas inexistentes e mensagem de erro quando a API falha.
- Formulário de contato com validação por campo, envio por e-mail (EmailJS) e salvamento no banco (Supabase).
- Dashboard protegido por login, com lista de mensagens, marcação de respondida e escolha dos projetos em destaque.
- Tema claro/escuro, salvo no navegador e mantido entre visitas.

## Como os projetos são escolhidos

- A lista vem da API pública do GitHub, sem cadastro manual.
- Só entram repositórios do usuário que tenham o topic `portfolio-grupo`.
- A Home mostra apenas os projetos marcados como destaque no dashboard, na ordem em que foram marcados.
- A resposta da API fica em cache por 10 minutos, para não repetir requisições ao navegar e não estourar o limite do GitHub.

## Tecnologias

- React 19 com Vite
- React Router (rotas, redirecionamento e `lazy` no dashboard)
- Supabase (banco de dados, autenticação e regras de acesso por linha, RLS)
- EmailJS (envio de e-mail do formulário)
- API pública do GitHub
- Vitest e Testing Library (testes)
- ESLint, Prettier, Husky e lint-staged (padronização)

## Estrutura de pastas

- `src/components`: componentes reaproveitáveis (Button, Card, SectionTitle, Navbar, Hero, Footer, Divider, Skills, Projects, ProjectCard, Contact, ProtectedRoute).
- `src/pages`: páginas de rota (Home, ProjectDetail, Login, Dashboard, NotFound).
- `src/services`: acesso a dados e serviços externos (github, supabase, messages, auth, validateContact).
- `src/hooks`: hooks personalizados (useGithubRepos, useTheme).
- `src/context`: contexto do tema.

## Configuração do Supabase

Esta seção é só para quem quiser rodar o projeto com a própria conta do Supabase. Para apenas navegar no site publicado, não é necessário.

1. Crie um projeto no supabase.com.
2. No **SQL Editor**, execute o script `supabase/schema.sql`, que cria as tabelas `messages` e `featured_projects` com as regras de RLS.
3. Em **Authentication → Users**, crie o usuário do dashboard (com **Auto Confirm User** marcado). A senha não vai para o código.
4. Em **Project Settings → API Keys**, copie a Project URL e a publishable key para o `.env`.

## Como rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/wassupnini/portfolio-nibarbosa.git
   cd portfolio-nibarbosa
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para rodar localmente, crie o arquivo `.env` na raiz, copiando o `.env.example`, e preencha com as suas próprias chaves do EmailJS e do Supabase. Esse arquivo não vai para o GitHub.

4. Rode o projeto:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: gera a versão de produção.
- `npm run preview`: testa a versão de produção localmente.
- `npm run lint`: verifica o código com o ESLint.
- `npm run format`: formata o código com o Prettier.
- `npm run test`: roda os testes com o Vitest.

## Testes

Os testes ficam ao lado dos arquivos que testam, com o sufixo `.test.js` ou `.test.jsx`. Cobrem a validação do formulário de contato e o bloqueio do dashboard para quem não está logado.

## Variáveis de ambiente

Veja o `.env.example`. As chaves do EmailJS e do Supabase nunca devem ser publicadas no repositório. Como o projeto usa Vite, as variáveis precisam começar com `VITE_`. No site publicado, as mesmas variáveis são configuradas na Vercel, em **Settings → Environment Variables**.

## Convenções

As convenções de commits, branches, nomes e código estão em `AI_GUIDE.md`.
