
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
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const classes = ['6ème A', '6ème B', '5ème A', '4ème B'];
const terms = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
const evaluationTypes = ['Devoir 1', 'Devoir 2', 'Composition'];

const students = [
  { id: 1, name: 'Alice Dupont', grade: '' },
  { id: 2, name: 'Baptiste Martin', grade: '' },
  { id: 3, name: 'Clara Bernard', grade: '' },
  { id: 4, name: 'David Petit', grade: '' },
  { id: 5, name: 'Emma Richard', grade: '' },
  { id: 6, name: 'Félix Moreau', grade: '' },
  { id: 7, name: 'Gaëlle Thomas', grade: '' },
  { id: 8, name: 'Hugo Laurent', grade: '' },
];

export function GradeInput() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedEvaluationType, setSelectedEvaluationType] = useState<string>('');
  const [evaluationTitle, setEvaluationTitle] = useState<string>('');
  const [evaluationDate, setEvaluationDate] = useState<string>('');
  const [maxGrade, setMaxGrade] = useState<string>('20');
  const [coefficient, setCoefficient] = useState<string>('1');
  const [studentsGrades, setStudentsGrades] = useState(students);

  const handleGradeChange = (studentId: number, value: string) => {
    const numValue = parseFloat(value);
    const maxGradeValue = parseFloat(maxGrade);
    
    if (value === '' || (numValue >= 0 && numValue <= maxGradeValue)) {
      setStudentsGrades(prevData => 
        prevData.map(student => 
          student.id === studentId 
            ? { ...student, grade: value } 
            : student
        )
      );
    }
  };

  const saveGrades = () => {
    toast({
      title: "Notes sauvegardées",
      description: `Les notes de ${evaluationTitle} pour la classe ${selectedClass} ont été enregistrées.`,
    });
  };

  const isFormComplete = selectedClass && selectedTerm && selectedEvaluationType && evaluationTitle;

  const hasGrades = studentsGrades.some(student => student.grade !== '');
  const filledGradesCount = studentsGrades.filter(student => student.grade !== '').length;
  const gradesAverage = (): string => {
    const grades = studentsGrades
      .filter(student => student.grade !== '')
      .map(student => parseFloat(student.grade));
    
    if (grades.length === 0) return '-';
    
    const sum = grades.reduce((a, b) => a + b, 0);
    return (sum / grades.length).toFixed(2);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saisie des Notes</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Information de l'évaluation</CardTitle>
          <CardDescription>Sélectionnez la classe et renseignez les détails de l'évaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <label className="text-sm font-medium">Trimestre</label>
              <Select onValueChange={setSelectedTerm} value={selectedTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un trimestre" />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((term) => (
                    <SelectItem key={term} value={term}>
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type d'évaluation</label>
              <Select onValueChange={setSelectedEvaluationType} value={selectedEvaluationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
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
              <label className="text-sm font-medium">Titre de l'évaluation</label>
              <Input
                placeholder="Ex: Contrôle sur les fractions"
                value={evaluationTitle}
                onChange={(e) => setEvaluationTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Note maximale</label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={maxGrade}
                  onChange={(e) => setMaxGrade(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Coefficient</label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={coefficient}
                  onChange={(e) => setCoefficient(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isFormComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>{evaluationTitle}</CardTitle>
            <CardDescription>{selectedClass} - {selectedTerm}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Note (sur {maxGrade})</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsGrades.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          value={student.grade}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          placeholder={`/ ${maxGrade}`}
                          className="w-24 text-center"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {hasGrades && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <p><span className="font-medium">Notes saisies:</span> {filledGradesCount} / {studentsGrades.length}</p>
                  <p><span className="font-medium">Moyenne:</span> {gradesAverage()} / {maxGrade}</p>
                </div>
              </div>
            )}
            
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
          <p className="text-gray-500">Veuillez sélectionner une classe et renseigner les informations de l'évaluation pour saisir les notes.</p>
        </div>
      )}
    </div>
  );
}
