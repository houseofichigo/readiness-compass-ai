-- Phase 2: Security Hardening - RLS policies for profiles and organization_members (retry without IF NOT EXISTS)
begin;

alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;

-- PROFILES policies
create policy "Admin can manage profiles" on public.profiles
for all
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Users can view own profile" on public.profiles
for select
using (id = auth.uid());

create policy "Users can update own profile" on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can insert own profile" on public.profiles
for insert
with check (id = auth.uid());

-- ORGANIZATION_MEMBERS policies
create policy "Admin can manage organization_members" on public.organization_members
for all
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Members can view members of their org" on public.organization_members
for select
using (public.is_org_member(organization_id));

create policy "Users can view own membership" on public.organization_members
for select
using (user_id = auth.uid());

commit;