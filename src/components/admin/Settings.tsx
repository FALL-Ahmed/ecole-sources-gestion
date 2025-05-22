
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { toast } = useToast();
  const [accountForm, setAccountForm] = useState({
    schoolName: "Sources des Sciences",
    directorName: "M. Martin Dupont",
    email: "direction@sources-sciences.fr",
    phone: "01 23 45 67 89",
    address: "123 Avenue de l'Éducation, 75001 Paris"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    gradeNotifications: true,
    absenceNotifications: true,
    systemNotifications: false
  });

  const handleAccountChange = (field: string, value: string) => {
    setAccountForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }));
  };

  const saveAccountSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les informations de l'établissement ont été mises à jour.",
    });
  };

  const saveNotificationSettings = () => {
    toast({
      title: "Paramètres de notification sauvegardés",
      description: "Vos préférences de notification ont été mises à jour.",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Établissement</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="academic">Année scolaire</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'établissement</CardTitle>
              <CardDescription>
                Gérez les informations générales de votre établissement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel>Nom de l'établissement</FormLabel>
                  <Input
                    value={accountForm.schoolName}
                    onChange={(e) => handleAccountChange('schoolName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Nom du directeur</FormLabel>
                  <Input
                    value={accountForm.directorName}
                    onChange={(e) => handleAccountChange('directorName', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Email de contact</FormLabel>
                <Input
                  type="email"
                  value={accountForm.email}
                  onChange={(e) => handleAccountChange('email', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel>Téléphone</FormLabel>
                  <Input
                    value={accountForm.phone}
                    onChange={(e) => handleAccountChange('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Adresse</FormLabel>
                <Input
                  value={accountForm.address}
                  onChange={(e) => handleAccountChange('address', e.target.value)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <FormLabel>Logo de l'établissement</FormLabel>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 border rounded flex items-center justify-center text-gray-400">
                    Logo
                  </div>
                  <Button variant="outline">Changer le logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveAccountSettings}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>
                Configurer quand et comment vous recevez des notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Notifications par email</FormLabel>
                  <FormDescription>Recevoir des notifications par email</FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Notes</FormLabel>
                  <FormDescription>Notifications pour les nouvelles notes</FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.gradeNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('gradeNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Absences</FormLabel>
                  <FormDescription>Notifications pour les absences d'élèves</FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.absenceNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('absenceNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Notifications système</FormLabel>
                  <FormDescription>Mises à jour et informations système</FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.systemNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('systemNotifications', checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotificationSettings}>Enregistrer les préférences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'année scolaire</CardTitle>
              <CardDescription>
                Configurez les dates et les périodes de l'année scolaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel>Date de début d'année</FormLabel>
                  <Input type="date" defaultValue="2023-09-01" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Date de fin d'année</FormLabel>
                  <Input type="date" defaultValue="2024-07-05" />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-medium text-lg">Trimestres</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Trimestre 1 - Début</FormLabel>
                    <Input type="date" defaultValue="2023-09-01" />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Trimestre 1 - Fin</FormLabel>
                    <Input type="date" defaultValue="2023-11-30" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Trimestre 2 - Début</FormLabel>
                    <Input type="date" defaultValue="2023-12-01" />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Trimestre 2 - Fin</FormLabel>
                    <Input type="date" defaultValue="2024-03-31" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Trimestre 3 - Début</FormLabel>
                    <Input type="date" defaultValue="2024-04-01" />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Trimestre 3 - Fin</FormLabel>
                    <Input type="date" defaultValue="2024-07-05" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer l'année scolaire</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>
                Gérez les options de sécurité de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Authentification à deux facteurs</FormLabel>
                  <FormDescription>Exiger l'authentification à deux facteurs pour tous les administrateurs</FormDescription>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Verrouillage automatique</FormLabel>
                  <FormDescription>Verrouiller les sessions après 30 minutes d'inactivité</FormDescription>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Politique de mot de passe renforcée</FormLabel>
                  <FormDescription>Exiger des mots de passe complexes pour tous les utilisateurs</FormDescription>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <FormLabel>Modifier le mot de passe administrateur</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Mot de passe actuel" />
                  <Input type="password" placeholder="Nouveau mot de passe" />
                </div>
                <Button className="mt-2">Mettre à jour le mot de passe</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
