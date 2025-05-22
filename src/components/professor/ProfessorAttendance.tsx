
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, FileDown, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const classes = ['6ème A', '6ème B', '5ème A', '4ème B'];
const subjects = ['Mathématiques', 'Français', 'Histoire-Géographie', 'Sciences', 'Anglais', 'Espagnol', 'Arts Plastiques', 'Musique', 'EPS'];

const students = [
  { id: 1, name: 'Alice Dupont', present: true, justified: false, comment: '' },
  { id: 2, name: 'Baptiste Martin', present: true, justified: false, comment: '' },
  { id: 3, name: 'Clara Bernard', present: false, justified: true, comment: 'Rendez-vous médical' },
  { id: 4, name: 'David Petit', present: true, justified: false, comment: '' },
  { id: 5, name: 'Emma Richard', present: false, justified: false, comment: '' },
  { id: 6, name: 'Félix Moreau', present: true, justified: false, comment: '' },
  { id: 7, name: 'Gaëlle Thomas', present: true, justified: false, comment: '' },
  { id: 8, name: 'Hugo Laurent', present: true, justified: false, comment: '' },
];

export function ProfessorAttendance() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState(students);

  const handlePresentChange = (studentId: number, present: boolean) => {
    setAttendanceData(prevData => 
      prevData.map(student => 
        student.id === studentId 
          ? { ...student, present, justified: present ? false : student.justified } 
          : student
      )
    );
  };

  const handleJustifiedChange = (studentId: number, justified: boolean) => {
    setAttendanceData(prevData => 
      prevData.map(student => 
        student.id === studentId 
          ? { ...student, justified, present: justified ? false : student.present } 
          : student
      )
    );
  };

  const handleCommentChange = (studentId: number, comment: string) => {
    setAttendanceData(prevData => 
      prevData.map(student => 
        student.id === studentId 
          ? { ...student, comment } 
          : student
      )
    );
  };

  const saveAttendance = () => {
    toast({
      title: "Présences enregistrées",
      description: `Les présences pour la classe ${selectedClass} du ${format(date, 'dd/MM/yyyy')} ont été sauvegardées.`,
    });
  };

  const exportAttendance = () => {
    toast({
      title: "Export en cours",
      description: `Les données de présence sont en cours d'exportation au format Excel.`,
    });
  };

  const isFormComplete = selectedClass && selectedSubject;

  const absenceCount = attendanceData.filter(student => !student.present).length;
  const justifiedCount = attendanceData.filter(student => !student.present && student.justified).length;
  const unjustifiedCount = absenceCount - justifiedCount;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Présences</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sélection</CardTitle>
          <CardDescription>Choisissez la classe, la date et la matière</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Classe</label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Matière</label>
              <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une matière" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {isFormComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>Feuille de présence: {selectedClass} - {format(date, 'dd/MM/yyyy')}</CardTitle>
            <CardDescription>
              {selectedSubject} - {students.length} élèves inscrits - {absenceCount} absents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Présent</TableHead>
                    <TableHead>Absence justifiée</TableHead>
                    <TableHead className="w-1/3">Commentaire</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.present}
                          onCheckedChange={(checked) => 
                            handlePresentChange(student.id, checked === true)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={!student.present && student.justified}
                          disabled={student.present}
                          onCheckedChange={(checked) => 
                            handleJustifiedChange(student.id, checked === true)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Raison de l'absence..."
                          value={student.comment}
                          onChange={(e) => handleCommentChange(student.id, e.target.value)}
                          disabled={student.present}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Button onClick={saveAttendance}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
              <Button variant="outline" onClick={exportAttendance}>
                <FileDown className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <p className="text-gray-500">Veuillez sélectionner une classe, une date et une matière pour gérer les présences.</p>
        </div>
      )}
    </div>
  );
}
