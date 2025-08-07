-- Phase 2: Security Hardening - RLS policies for profiles and organization_members
begin;

-- Enable RLS if not already
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;

-- PROFILES policies
-- Admin can manage all
create policy if not exists "Admin can manage profiles" on public.profiles
for all
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Users can view their own profile
create policy if not exists "Users can view own profile" on public.profiles
for select
using (id = auth.uid());

-- Users can update their own profile
create policy if not exists "Users can update own profile" on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

-- Users can insert their own profile (optional; trigger usually handles inserts)
create policy if not exists "Users can insert own profile" on public.profiles
for insert
with check (id = auth.uid());

-- ORGANIZATION_MEMBERS policies
-- Admin can manage all
create policy if not exists "Admin can manage organization_members" on public.organization_members
for all
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Members can view all members of their org
create policy if not exists "Members can view members of their org" on public.organization_members
for select
using (public.is_org_member(organization_id));

-- Members can view their own membership row explicitly
create policy if not exists "Users can view own membership" on public.organization_members
for select
using (user_id = auth.uid());

commit;