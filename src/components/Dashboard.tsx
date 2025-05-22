
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const statsData = [
    { name: 'Élèves', value: 245, icon: Users, color: 'bg-blue-500' },
    { name: 'Professeurs', value: 18, icon: BookOpen, color: 'bg-green-500' },
    { name: 'Classes', value: 12, color: 'bg-purple-500' },
    { name: 'Taux de Réussite', value: '87%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const gradesByClass = [
    { class: '6ème A', moyenne: 14.2 },
    { class: '6ème B', moyenne: 13.8 },
    { class: '5ème A', moyenne: 15.1 },
    { class: '5ème B', moyenne: 14.5 },
    { class: '4ème A', moyenne: 13.9 },
    { class: '4ème B', moyenne: 14.7 },
  ];

  const studentDistribution = [
    { name: '6ème', value: 68, color: '#8884d8' },
    { name: '5ème', value: 62, color: '#82ca9d' },
    { name: '4ème', value: 58, color: '#ffc658' },
    { name: '3ème', value: 57, color: '#ff7c7c' },
  ];

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {statsData.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        {Icon && (
                          <div className={`p-3 rounded-full ${stat.color} text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Moyennes par Classe</CardTitle>
                  <CardDescription>Performance académique par classe</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gradesByClass}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis domain={[0, 20]} />
                      <Tooltip />
                      <Bar dataKey="moyenne" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Élèves</CardTitle>
                  <CardDescription>Distribution par niveau</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={studentDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {studentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'professor':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Mes Classes</h3>
                  <p className="text-3xl font-bold text-blue-600">5</p>
                  <p className="text-sm text-gray-600">classes assignées</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Élèves</h3>
                  <p className="text-3xl font-bold text-green-600">127</p>
                  <p className="text-sm text-gray-600">élèves au total</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Cours cette semaine</h3>
                  <p className="text-3xl font-bold text-purple-600">18</p>
                  <p className="text-sm text-gray-600">heures de cours</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Emploi du Temps de la Semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Mathématiques - 6ème A</span>
                    <span className="text-sm text-gray-600">Lundi 08:00 - 09:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Mathématiques - 5ème B</span>
                    <span className="text-sm text-gray-600">Lundi 10:00 - 11:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Mathématiques - 4ème A</span>
                    <span className="text-sm text-gray-600">Mardi 14:00 - 15:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case 'student':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Moyenne Générale</h3>
                  <p className="text-3xl font-bold text-blue-600">14.8</p>
                  <p className="text-sm text-gray-600">/20</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Rang dans la Classe</h3>
                  <p className="text-3xl font-bold text-green-600">3ème</p>
                  <p className="text-sm text-gray-600">sur 28 élèves</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Cours Aujourd'hui</h3>
                  <p className="text-3xl font-bold text-purple-600">6</p>
                  <p className="text-sm text-gray-600">cours programmés</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prochains Cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Mathématiques</p>
                        <p className="text-sm text-gray-600">Salle 201</p>
                      </div>
                      <span className="text-sm font-medium">08:00 - 09:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Français</p>
                        <p className="text-sm text-gray-600">Salle 105</p>
                      </div>
                      <span className="text-sm font-medium">09:00 - 10:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dernières Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Contrôle Mathématiques</span>
                      <span className="font-bold text-green-600">16/20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Devoir Français</span>
                      <span className="font-bold text-blue-600">14/20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Exposé Histoire</span>
                      <span className="font-bold text-purple-600">15/20</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Tableau de Bord - {user?.role === 'admin' ? 'Administration' : 
                               user?.role === 'professor' ? 'Professeur' : 'Étudiant'}
        </h1>
        <p className="text-gray-600">
          Bienvenue, {user?.name}
        </p>
      </div>
      
      {renderDashboardContent()}
    </div>
  );
}
