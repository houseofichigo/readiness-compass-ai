# Environment Variables

## Development
Create `.env.local` for local development:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Production
Set the following environment variables in your deployment platform:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Security Notes
- The Supabase anon key is publishable and safe for client-side use
- Row Level Security (RLS) policies protect sensitive data
- Never commit actual environment files to version control

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] Health checks passing
- [ ] Performance metrics verified

### Post-Deployment
- [ ] Health endpoint responding
- [ ] Assessment flow working end-to-end
- [ ] Admin panel accessible
- [ ] Analytics tracking properly
- [ ] Error monitoring active

### Performance Targets
- [ ] Initial load < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] Core Web Vitals passing
- [ ] Lighthouse score > 90