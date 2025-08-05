import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield } from 'lucide-react';
import i18n from '@/lib/i18n';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  
  const { user, isAdmin, signIn, isLoading } = useAuth();

  // Redirect if already authenticated and admin
  if (!isLoading && user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { error: authError } = await signIn(email, password);
    
    if (authError) {
      setError(authError.message);
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">
            {lang === 'fr' ? 'Portail Admin' : 'Admin Portal'}
          </CardTitle>
          <CardDescription>
            {lang === 'fr'
              ? "Connectez-vous pour accéder au tableau de bord d'évaluation de préparation à l'IA"
              : 'Sign in to access the AI Readiness Assessment dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{lang === 'fr' ? 'Courriel' : 'Email'}</Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  lang === 'fr'
                    ? 'admin@entreprise.com'
                    : 'admin@company.com'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{lang === 'fr' ? 'Mot de passe' : 'Password'}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {lang === 'fr' ? 'Connexion...' : 'Signing in...'}
                </>
              ) : (
                lang === 'fr' ? 'Se connecter' : 'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}