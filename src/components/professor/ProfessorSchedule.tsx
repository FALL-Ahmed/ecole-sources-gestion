
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

// Données de l'emploi du temps
const scheduleData = {
  'Lundi': [
    { time: '08:00-09:00', class: '6ème A', subject: 'Mathématiques', room: '101' },
    { time: '09:00-10:00', class: '5ème A', subject: 'Mathématiques', room: '101' },
    { time: '10:15-11:15', class: '4ème B', subject: 'Mathématiques', room: '201' },
    { time: '11:15-12:15', class: '3ème A', subject: 'Mathématiques', room: '201' },
  ],
  'Mardi': [
    { time: '13:30-14:30', class: '6ème B', subject: 'Mathématiques', room: '102' },
    { time: '14:30-15:30', class: '5ème B', subject: 'Mathématiques', room: '102' },
  ],
  'Mercredi': [
    { time: '08:00-09:00', class: '3ème B', subject: 'Mathématiques', room: '201' },
    { time: '09:00-10:00', class: '3ème B', subject: 'Mathématiques', room: '201' },
  ],
  'Jeudi': [
    { time: '10:15-11:15', class: '6ème A', subject: 'Mathématiques', room: '101' },
    { time: '11:15-12:15', class: '5ème A', subject: 'Mathématiques', room: '101' },
    { time: '13:30-14:30', class: '4ème B', subject: 'Mathématiques', room: '201' },
  ],
  'Vendredi': [
    { time: '08:00-09:00', class: '6ème B', subject: 'Mathématiques', room: '102' },
    { time: '09:00-10:00', class: '5ème B', subject: 'Mathématiques', room: '102' },
    { time: '10:15-11:15', class: '3ème A', subject: 'Mathématiques', room: '201' },
  ]
};

export function ProfessorSchedule() {
  const [selectedDay, setSelectedDay] = useState<string>('Lundi');
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  
  // Calcul du nombre total d'heures de cours
  const totalHours = Object.values(scheduleData).reduce((acc, daySchedule) => {
    return acc + daySchedule.length;
  }, 0);

  // Calcul du nombre de classes enseignées (uniques)
  const uniqueClasses = new Set();
  Object.values(scheduleData).forEach(daySchedule => {
    daySchedule.forEach(session => {
      uniqueClasses.add(session.class);
    });
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Emploi du Temps</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Heures par semaine</p>
                <p className="text-2xl font-bold">{totalHours}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes</p>
                <p className="text-2xl font-bold">{uniqueClasses.size}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vue hebdomadaire</CardTitle>
          <CardDescription>Votre planning de la semaine</CardDescription>
        </CardHeader>
        <CardContent>
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
              
              {['08:00-09:00', '09:00-10:00', '10:15-11:15', '11:15-12:15', '13:30-14:30', '14:30-15:30', '15:45-16:45'].map(timeSlot => (
                <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
                  <div className="text-sm font-medium text-gray-500 py-2 flex items-center">
                    {timeSlot}
                  </div>
                  {days.map(day => {
                    const session = scheduleData[day]?.find(s => s.time === timeSlot);
                    
                    if (session) {
                      return (
                        <div 
                          key={`${day}-${timeSlot}`} 
                          className={`bg-blue-50 border border-blue-200 p-2 rounded ${
                            selectedDay === day ? 'ring-2 ring-blue-400' : ''
                          }`}
                        >
                          <p className="font-semibold text-blue-800">{session.subject}</p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="bg-blue-50 text-xs">
                              {session.class}
                            </Badge>
                            <span className="text-xs text-gray-600">Salle {session.room}</span>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div 
                        key={`${day}-${timeSlot}`} 
                        className={`border border-dashed border-gray-300 p-2 rounded ${
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planning du {selectedDay}</CardTitle>
          <CardDescription>Détails de vos cours</CardDescription>
        </CardHeader>
        <CardContent>
          {scheduleData[selectedDay] && scheduleData[selectedDay].length > 0 ? (
            <div className="space-y-4">
              {scheduleData[selectedDay].map((session, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                  <div className="w-16 text-center">
                    <div className="text-sm font-semibold">{session.time.split('-')[0]}</div>
                    <div className="text-xs text-gray-500">-</div>
                    <div className="text-sm font-semibold">{session.time.split('-')[1]}</div>
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="font-semibold">{session.subject}</div>
                    <div className="text-sm text-gray-600">Classe: {session.class}</div>
                  </div>
                  <div className="ml-6">
                    <Badge variant="outline" className="bg-gray-50">
                      Salle {session.room}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>Aucun cours prévu ce jour</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
