
import React from 'react';
import { Dashboard } from './Dashboard';
import { UserManagement } from './admin/UserManagement';
import { CourseManagement } from './admin/CourseManagement';
import { useAuth } from '@/contexts/AuthContext';

interface MainContentProps {
  activeSection: string;
}

export function MainContent({ activeSection }: MainContentProps) {
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return user?.role === 'admin' ? <UserManagement /> : <Dashboard />;
      case 'courses':
        return user?.role === 'admin' ? <CourseManagement /> : <Dashboard />;
      default:
        return (
          <div className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Section en développement</h2>
              <p className="text-gray-600">Cette fonctionnalité sera bientôt disponible.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {renderContent()}
    </div>
  );
}
