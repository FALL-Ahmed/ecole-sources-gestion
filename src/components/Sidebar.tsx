
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap,
  Calendar,
  FileText,
  UserCheck,
  LogOut,
  BarChart3,
  Settings,
  FileSpreadsheet,
  Upload,
  Clock,
  CheckSquare
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: Home }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...commonItems,
          { id: 'users', label: 'Gestion Utilisateurs', icon: Users },
          { id: 'courses', label: 'Gestion Cours', icon: BookOpen },
          { id: 'grades', label: 'Gestion Notes', icon: GraduationCap },
          { id: 'schedule', label: 'Emploi du Temps', icon: Calendar },
          { id: 'attendance', label: 'Gestion Absences', icon: UserCheck },
          { id: 'reports', label: 'Bulletins Scolaires', icon: FileSpreadsheet },
          { id: 'chapter-monitoring', label: 'Suivi des Chapitres', icon: CheckSquare },
          { id: 'stats', label: 'Statistiques', icon: BarChart3 },
          { id: 'settings', label: 'Paramètres', icon: Settings }
        ];
      case 'professor':
        return [
          ...commonItems,
          { id: 'attendance-mgmt', label: 'Gestion Absences', icon: UserCheck },
          { id: 'schedule-view', label: 'Emploi du Temps', icon: Calendar },
          { id: 'grades-input', label: 'Saisie des Notes', icon: GraduationCap },
          { id: 'course-materials', label: 'Supports de Cours', icon: Upload },
          { id: 'chapter-planning', label: 'Planification Chapitres', icon: FileText }
        ];
      case 'student':
        return [
          ...commonItems,
          { id: 'schedule-view', label: 'Emploi du Temps', icon: Calendar },
          { id: 'my-courses', label: 'Mes Cours', icon: BookOpen },
          { id: 'my-grades', label: 'Notes & Bulletins', icon: GraduationCap },
          { id: 'my-attendance', label: 'Mes Absences', icon: Clock },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-900">Sources des Sciences</h2>
        <div className="flex items-center gap-3 mt-2">
          {user && user.avatar && (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeSection === item.id 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
