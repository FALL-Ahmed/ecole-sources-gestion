
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

// Données de l'emploi du temps
const scheduleData = {
  'Lundi': [
    { time: '08:00-09:00', subject: 'Mathématiques', teacher: 'M. Dubois', room: '101' },
    { time: '09:00-10:00', subject: 'Français', teacher: 'Mme Bernard', room: '101' },
    { time: '10:15-11:15', subject: 'Histoire-Géographie', teacher: 'M. Robert', room: '101' },
    { time: '11:15-12:15', subject: 'Anglais', teacher: 'Mme Petit', room: '101' },
  ],
  'Mardi': [
    { time: '08:00-09:00', subject: 'Sciences', teacher: 'M. Thomas', room: 'Labo 1' },
    { time: '09:00-10:00', subject: 'Sciences', teacher: 'M. Thomas', room: 'Labo 1' },
    { time: '10:15-11:15', subject: 'Espagnol', teacher: 'Mme Laurent', room: '101' },
    { time: '11:15-12:15', subject: 'Arts Plastiques', teacher: 'Mme Martin', room: '201' },
  ],
  'Mercredi': [
    { time: '08:00-09:00', subject: 'Mathématiques', teacher: 'M. Dubois', room: '101' },
    { time: '09:00-10:00', subject: 'EPS', teacher: 'M. Richard', room: 'Gymnase' },
    { time: '10:15-11:15', subject: 'EPS', teacher: 'M. Richard', room: 'Gymnase' },
  ],
  'Jeudi': [
    { time: '08:00-09:00', subject: 'Français', teacher: 'Mme Bernard', room: '101' },
    { time: '09:00-10:00', subject: 'Musique', teacher: 'Mme Garcia', room: '201' },
    { time: '10:15-11:15', subject: 'Mathématiques', teacher: 'M. Dubois', room: '101' },
    { time: '11:15-12:15', subject: 'Histoire-Géographie', teacher: 'M. Robert', room: '101' },
  ],
  'Vendredi': [
    { time: '08:00-09:00', subject: 'Anglais', teacher: 'Mme Petit', room: '101' },
    { time: '09:00-10:00', subject: 'Sciences', teacher: 'M. Thomas', room: 'Labo 1' },
    { time: '10:15-11:15', subject: 'Français', teacher: 'Mme Bernard', room: '101' },
    { time: '11:15-12:15', subject: 'Mathématiques', teacher: 'M. Dubois', room: '101' },
  ]
};

// Couleurs pour les matières
const subjectColors: Record<string, {bg: string, text: string}> = {
  'Mathématiques': { bg: 'bg-blue-50', text: 'text-blue-800' },
  'Français': { bg: 'bg-red-50', text: 'text-red-800' },
  'Histoire-Géographie': { bg: 'bg-amber-50', text: 'text-amber-800' },
  'Anglais': { bg: 'bg-purple-50', text: 'text-purple-800' },
  'Sciences': { bg: 'bg-green-50', text: 'text-green-800' },
  'Espagnol': { bg: 'bg-pink-50', text: 'text-pink-800' },
  'Arts Plastiques': { bg: 'bg-indigo-50', text: 'text-indigo-800' },
  'EPS': { bg: 'bg-orange-50', text: 'text-orange-800' },
  'Musique': { bg: 'bg-teal-50', text: 'text-teal-800' }
};

const getColorBySubject = (subject: string) => {
  return subjectColors[subject] || { bg: 'bg-gray-50', text: 'text-gray-800' };
};

export function StudentSchedule() {
  const [selectedView, setSelectedView] = useState<string>('grid');
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  
  const todayIndex = new Date().getDay() - 1;
  const today = days[todayIndex >= 0 && todayIndex < 5 ? todayIndex : 0];
  const [selectedDay, setSelectedDay] = useState<string>(today);
  
  const timeSlots = ['08:00-09:00', '09:00-10:00', '10:15-11:15', '11:15-12:15', '13:30-14:30', '14:30-15:30', '15:45-16:45'];
  
  // Obtenir les prochains cours pour aujourd'hui
  const todaySessions = scheduleData[today] || [];
  // Filtrer pour n'avoir que les cours qui n'ont pas encore eu lieu
  const currentTime = new Date();
  const upcomingSessions = todaySessions.filter(session => {
    const [startTime] = session.time.split('-');
    const [hours, minutes] = startTime.split(':').map(Number);
    const sessionTime = new Date();
    sessionTime.setHours(hours, minutes, 0);
    return sessionTime > currentTime;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Emploi du Temps</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Aujourd'hui</CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todaySessions.length > 0 ? (
              <div className="space-y-2">
                {todaySessions.map((session, index) => {
                  const colors = getColorBySubject(session.subject);
                  return (
                    <div key={index} className={`p-3 rounded-lg flex items-center justify-between ${colors.bg}`}>
                      <div>
                        <p className={`font-medium ${colors.text}`}>{session.subject}</p>
                        <p className="text-xs text-gray-600">{session.teacher} - Salle {session.room}</p>
                      </div>
                      <Badge variant="outline" className={`${colors.bg} ${colors.text} border-none`}>
                        {session.time}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p>Pas de cours aujourd'hui</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochain cours</CardTitle>
            <CardDescription>
              Cours à venir aujourd'hui
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg shadow-sm">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{upcomingSessions[0].subject}</div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{upcomingSessions[0].teacher}</span>
                      <span>Salle {upcomingSessions[0].room}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Badge>{upcomingSessions[0].time}</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p>Plus de cours aujourd'hui</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Emploi du temps hebdomadaire</span>
            <Tabs value={selectedView} onValueChange={setSelectedView} className="w-auto">
              <TabsList className="grid w-[180px] grid-cols-2">
                <TabsTrigger value="grid">Grille</TabsTrigger>
                <TabsTrigger value="list">Liste</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TabsContent value="grid" className="space-y-4 mt-0">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 gap-2 mb-2">
                  <div className="font-semibold text-gray-500"></div>
                  {days.map(day => (
                    <div 
                      key={day}
                      className={`font-semibold text-center py-2 rounded cursor-pointer ${
                        selectedDay === day ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
                      }`}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                {timeSlots.map(timeSlot => (
                  <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
                    <div className="text-sm font-medium text-gray-500 py-2 flex items-center">
                      {timeSlot}
                    </div>
                    {days.map(day => {
                      const session = scheduleData[day]?.find(s => s.time === timeSlot);
                      
                      if (session) {
                        const colors = getColorBySubject(session.subject);
                        return (
                          <div 
                            key={`${day}-${timeSlot}`} 
                            className={`${colors.bg} border p-2 rounded ${
                              selectedDay === day ? 'ring-2 ring-blue-400' : ''
                            }`}
                          >
                            <p className={`font-semibold ${colors.text}`}>{session.subject}</p>
                            <div className="text-xs text-gray-600 mt-1">
                              <p>{session.teacher}</p>
                              <p>Salle {session.room}</p>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={`${day}-${timeSlot}`} 
                          className={`p-2 rounded ${
                            selectedDay === day ? 'bg-gray-50' : ''
                          }`}
                        >
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <Tabs defaultValue={today} className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                {days.map(day => (
                  <TabsTrigger key={day} value={day}>{day}</TabsTrigger>
                ))}
              </TabsList>
              
              {days.map(day => (
                <TabsContent key={day} value={day} className="space-y-4">
                  {scheduleData[day] && scheduleData[day].length > 0 ? (
                    <div className="space-y-3">
                      {scheduleData[day].map((session, index) => {
                        const colors = getColorBySubject(session.subject);
                        return (
                          <div 
                            key={index} 
                            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-16 text-center">
                              <div className="text-sm font-semibold">{session.time.split('-')[0]}</div>
                              <div className="text-xs text-gray-500">-</div>
                              <div className="text-sm font-semibold">{session.time.split('-')[1]}</div>
                            </div>
                            <div className={`ml-6 p-2 rounded-md ${colors.bg}`}>
                              <div className={`font-semibold ${colors.text}`}>{session.subject}</div>
                            </div>
                            <div className="ml-6 flex-1">
                              <div className="text-sm text-gray-600">Prof: {session.teacher}</div>
                            </div>
                            <div className="ml-6">
                              <Badge variant="outline">
                                Salle {session.room}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-600">
                      <p>Aucun cours ce jour</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}
