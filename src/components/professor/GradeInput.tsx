
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
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const classes = ['6ème A', '6ème B', '5ème A', '4ème B'];
const subjects = ['Mathématiques', 'Français', 'Histoire-Géographie', 'Sciences', 'Anglais', 'Espagnol', 'Arts Plastiques', 'Musique', 'EPS'];
const evaluationTypes = ['Devoir', 'Contrôle', 'Examen', 'TP', 'Projet'];

const students = [
  { id: 1, name: 'Alice Dupont', grade: '15' },
  { id: 2, name: 'Baptiste Martin', grade: '13' },
  { id: 3, name: 'Clara Bernard', grade: '17' },
  { id: 4, name: 'David Petit', grade: '14' },
  { id: 5, name: 'Emma Richard', grade: '12' },
  { id: 6, name: 'Félix Moreau', grade: '16' },
  { id: 7, name: 'Gaëlle Thomas', grade: '18' },
  { id: 8, name: 'Hugo Laurent', grade: '14' },
];

export function GradeInput() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [studentGrades, setStudentGrades] = useState(students);

  const handleGradeChange = (studentId: number, grade: string) => {
    setStudentGrades(prevGrades => 
      prevGrades.map(student => 
        student.id === studentId ? { ...student, grade } : student
      )
    );
  };

  const saveGrades = () => {
    toast({
      title: "Notes enregistrées",
      description: `Les notes pour la classe ${selectedClass} ont été sauvegardées avec succès.`,
    });
  };

  const isFormComplete = selectedClass && selectedSubject && selectedType && date;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saisie des Notes</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Information de l'évaluation</CardTitle>
          <CardDescription>Sélectionnez la classe et la matière</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type d'évaluation</label>
              <Select onValueChange={setSelectedType} value={selectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {evaluationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {isFormComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>Notes: {selectedClass} - {selectedSubject}</CardTitle>
            <CardDescription>{selectedType} du {date}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead className="w-32 text-right">Note sur 20</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentGrades.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="text"
                        className="w-20 ml-auto text-right"
                        placeholder="0"
                        value={student.grade}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6">
              <Button onClick={saveGrades}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les notes
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <p className="text-gray-500">Veuillez remplir tous les champs pour saisir les notes.</p>
        </div>
      )}
    </div>
  );
}
