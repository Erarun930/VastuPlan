create table if not exists profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 phone text,
 created_at timestamptz default now()
);

create table if not exists projects (
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 name text not null,
 plot_width numeric,
 plot_length numeric,
 road_side text,
 terrain text,
 slope numeric default 0,
 floors int default 1,
 bedrooms int default 2,
 bathrooms int default 2,
 kitchen boolean default true,
 parking text,
 quality text default 'standard',
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);

alter table profiles enable row level security;
alter table projects enable row level security;

create policy "profiles own read" on profiles for select using (auth.uid()=id);
create policy "profiles own insert" on profiles for insert with check (auth.uid()=id);
create policy "profiles own update" on profiles for update using (auth.uid()=id);

create policy "projects own read" on projects for select using (auth.uid()=user_id);
create policy "projects own insert" on projects for insert with check (auth.uid()=user_id);
create policy "projects own update" on projects for update using (auth.uid()=user_id);
create policy "projects own delete" on projects for delete using (auth.uid()=user_id);
