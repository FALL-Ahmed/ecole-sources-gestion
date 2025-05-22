
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
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, FileDown, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const classes = ['6ème A', '6ème B', '5ème A', '5ème B', '4ème A', '4ème B', '3ème A', '3ème B'];
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
  { id: 9, name: 'Inès Girard', present: true, justified: false, comment: '' },
  { id: 10, name: 'Jules Michel', present: true, justified: false, comment: '' },
];

export function AttendanceManagement() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const filteredStudents = attendanceData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFormComplete = selectedClass && selectedSubject;

  const absenceCount = attendanceData.filter(student => !student.present).length;
  const justifiedCount = attendanceData.filter(student => !student.present && student.justified).length;
  const unjustifiedCount = absenceCount - justifiedCount;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Absences</h1>

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
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-3">
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-3 py-1 text-sm">
                Total: {students.length} élèves
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 px-3 py-1 text-sm">
                Présents: {students.length - absenceCount}
              </Badge>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 px-3 py-1 text-sm">
                Absences justifiées: {justifiedCount}
              </Badge>
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 px-3 py-1 text-sm">
                Absences non justifiées: {unjustifiedCount}
              </Badge>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un élève..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
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
                    {filteredStudents.map((student) => (
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
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button onClick={saveAttendance}>
              Enregistrer les présences
            </Button>
            <Button variant="outline" onClick={exportAttendance}>
              <FileDown className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <p className="text-gray-500">Veuillez sélectionner une classe, une date et une matière pour gérer les présences.</p>
        </div>
      )}
    </div>
  );
}
