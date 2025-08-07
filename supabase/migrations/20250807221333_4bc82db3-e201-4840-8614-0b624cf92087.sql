-- Grant admin role to sabri@houseofichigo.com if the user exists
insert into public.user_roles (user_id, role)
select u.id, 'admin'::app_role
from auth.users u
left join public.user_roles r on r.user_id = u.id and r.role = 'admin'
where lower(u.email) = 'sabri@houseofichigo.com' and r.id is null;