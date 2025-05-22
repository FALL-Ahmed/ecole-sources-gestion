
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Sources des Sciences</h1>
          <p className="text-gray-600">Plateforme de Gestion Scolaire</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Connexion</CardTitle>
            <CardDescription>
              Accédez à votre espace personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@sources-sciences.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium mb-2">Comptes de démonstration :</p>
              <div className="space-y-1 text-xs">
                <p><strong>Admin:</strong> admin@sources-sciences.fr</p>
                <p><strong>Professeur:</strong> prof@sources-sciences.fr</p>
                <p><strong>Étudiant:</strong> eleve@sources-sciences.fr</p>
                <p><strong>Mot de passe:</strong> password123</p>
              </div>
            </div>
            
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>© 2025 Sources des Sciences - Tous droits réservés</p>
              <a href="#" className="text-blue-500 hover:underline mt-1 inline-block">Politique de confidentialité</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
