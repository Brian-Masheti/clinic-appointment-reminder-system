import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import ClinicList from './components/ClinicList';
import ClinicForm from './components/ClinicForm';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import DashboardDoctor from './components/DashboardDoctor';
import Profile from './components/Profile';
import DoctorProfile from './components/DoctorProfile';
import PatientDashboard from './components/PatientDashboard';

function Dashboard() {
  const { user } = useUser();
  const [section, setSection] = useState(() => localStorage.getItem('dashboardSection') || 'dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Persist section and scroll to top on change
  const handleSetSection = (sec) => {
    setSection(sec);
    localStorage.setItem('dashboardSection', sec);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar section={section} setSection={handleSetSection} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`flex-1 p-4 md:p-8 text-gray-100 space-y-8 transition-all duration-200
          ${collapsed ? 'ml-12' : 'ml-44'}
          md:${collapsed ? 'ml-16' : 'ml-56'}
        `}
        style={{ minHeight: '100vh' }}
      >
        {showWelcome && (
          <div className="text-3xl font-bold mb-8 text-center animate-fade-out">Welcome to your dashboard, {user?.name}!</div>
        )}
        <div className="grid grid-cols-1 gap-8">
          {user?.role === 'doctor' && section === 'profile' && (
            <DoctorProfile doctorId={user.id} />
          )}
          {user?.role === 'doctor' && section !== 'profile' && <DashboardDoctor doctorId={user.id} section={section} setSection={handleSetSection} />}
          {user?.role === 'patient' && <PatientDashboard patientId={user.id} section={section} />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

import Register from './pages/Register';

function AppContent() {
  const { user } = useUser();
  const [showRegister, setShowRegister] = useState(false);
  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }
  return <Dashboard />;
}
