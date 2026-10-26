# Guia para desenvolvimento

## Commits

Seguem o padrão Conventional Commits: `tipo: descrição curta em português`.

- `feat:` nova funcionalidade
- `fix:` correção de erro
- `style:` ajuste visual sem mudar lógica
- `perf:` melhoria de performance
- `test:` testes
- `chore:` configuração e manutenção
- `docs:` documentação

Exemplo: `feat: adiciona validação do formulário de contato`.

Cada etapa deve ter pelo menos um commit quando estiver funcionando.

## Branches

- `main` é a versão estável.
- Cada funcionalidade vai em uma branch própria: `feature/nome-da-funcionalidade`.
- A branch é integrada à `main` com `git merge` depois de testada.

## Nomes

- Componentes em PascalCase, com um componente por arquivo: `ProjectCard.jsx`.
- Hooks começam com `use`: `useTheme.js`.
- Funções que acessam APIs ficam em `src/services`, sem JSX.
- Páginas ficam em `src/pages`. Componentes reaproveitáveis ficam em `src/components`.
- Testes ficam ao lado do arquivo testado, com `.test.js` ou `.test.jsx`.

## Rotas

- Rotas são definidas em `src/App.jsx`.
- Páginas que exigem login são envolvidas por `ProtectedRoute`.
- Páginas pesadas, como o dashboard, são carregadas com `lazy` e `Suspense`.

## Dados e APIs

- Dados do GitHub são buscados em `src/services/github.js` e consumidos pelo hook `useGithubRepos`. Não faça `fetch` direto em componentes.
- Mensagens e destaques são acessados pelo cliente em `src/services/supabase.js`. `Projects.jsx` e `Dashboard.jsx` fazem as consultas diretamente, porque são o único ponto de uso desses dados; ao adicionar uma nova consulta, prefira criar uma função em `src/services`.
- Todo dado vindo de API deve ter estados de carregamento, erro e lista vazia.
- Projetos entram na lista do GitHub somente com o topic `portfolio-grupo`.
- Exceção atual: `Projects.jsx` e `Dashboard.jsx` consultam o Supabase diretamente. Não replique esse padrão em novos componentes; crie uma função em `src/services` e use-a no componente.

## Componentes visuais

- Títulos de seção usam sempre `SectionTitle`.
- Botões usam sempre `Button`, e cards usam `Card`.
- Estilos ficam em `src/index.css`, usando as variáveis de cor do tema. Não use Tailwind neste projeto.

## Segurança

- Chaves e senhas nunca vão para o código nem para o repositório. Use o `.env`.
- Variáveis de ambiente do Vite começam com `VITE_`.
- Tabelas do Supabase devem ter RLS ativo.

## Qualidade

- Antes de cada commit, o Husky roda o Prettier e o ESLint nos arquivos alterados.
- Antes de integrar uma branch à `main`, rode `npm run test` e `npm run lint`.

## Para a IA

Ao gerar código neste projeto, siga estas convenções:

- Use JavaScript com React, não TypeScript.
- Estilos ficam em `src/index.css`, usando as variáveis de tema (`--bg`, `--surface`, `--accent` etc.). Não use Tailwind.
- Use os componentes `SectionTitle`, `Button` e `Card` em vez de criar estilos próprios para títulos, botões e cards.
- Não faça `fetch` nem chame APIs dentro de componentes visuais. Dados do GitHub vêm de `src/services/github.js` pelo hook `useGithubRepos`, e mensagens e destaques do Supabase ficam em `src/services`. Os componentes `Projects.jsx` e `Dashboard.jsx` são exceções históricas e não devem ser usados como modelo.
- Novas rotas vão em `src/App.jsx`, e páginas que exigem login usam `ProtectedRoute`.
- Respeite o padrão de commits e de branches descrito acima.
