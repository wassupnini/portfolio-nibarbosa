-- Tabela de mensagens do formulário
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

-- Tabela de projetos em destaque (guarda o slug do repositório)
create table public.featured_projects (
  slug text primary key,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Liga a proteção de linhas (RLS)
alter table public.messages enable row level security;
alter table public.featured_projects enable row level security;

-- Permissões de tabela (necessárias porque desmarquei a exposição automática)
grant insert on public.messages to anon, authenticated;
grant select, update on public.messages to authenticated;
grant select on public.featured_projects to anon, authenticated;
grant all on public.featured_projects to authenticated;

-- Regras: quem pode fazer o quê
create policy "Visitante envia mensagem"
  on public.messages for insert
  to anon, authenticated
  with check (true);

create policy "Só o dono lê mensagens"
  on public.messages for select
  to authenticated
  using (true);

create policy "Só o dono marca como respondida"
  on public.messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Qualquer visitante vê destaques"
  on public.featured_projects for select
  to anon, authenticated
  using (true);

create policy "Só o dono gerencia destaques"
  on public.featured_projects for all
  to authenticated
  using (true)
  with check (true);