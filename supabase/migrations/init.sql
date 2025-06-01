-- No database tables required for MVP shell, but a minimal users table for authentication if needed
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.users enable row level security;

create policy "Allow authenticated read access" on public.users
  for select using (auth.uid() = id);

create policy "Allow authenticated insert" on public.users
  for insert with check (true);

create policy "Allow authenticated update" on public.users
  for update using (auth.uid() = id);
