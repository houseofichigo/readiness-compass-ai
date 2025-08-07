-- Small helper RPC to check admin role for current user
create or replace function public.get_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.has_role(auth.uid(), 'admin'), false);
$$;

grant execute on function public.get_is_admin() to authenticated;