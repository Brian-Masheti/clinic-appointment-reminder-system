import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

// SVG icon components
const icons = {
  hamburger: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  dashboard: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
  ),
  patients: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M17 11v-1a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v1"/><rect x="13" y="13" width="8" height="8" rx="4"/></svg>
  ),
  clinics: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/></svg>
  ),
  appointments: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
  ),
  myAppointments: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
  ),
  profile: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
  ),
  logout: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  ),
};

export default function Sidebar({ section, setSection, collapsed, setCollapsed }) {
  const { user, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Collapse sidebar after menu item click on mobile
  const handleMenuClick = (sectionName) => {
    setSection(sectionName);
    if (window.innerWidth < 768) {
      setCollapsed(true);
      setMobileOpen(false);
    }
  };

  // Responsive sidebar: collapsed by default on mobile, expands with hamburger
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setCollapsed]);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-2 left-2 z-30 bg-gray-200 dark:bg-gray-800 p-1 rounded shadow"
        onClick={() => { setCollapsed(!collapsed); setMobileOpen(!mobileOpen); }}
        aria-label="Toggle sidebar"
      >
        <span className="w-5 h-5">{icons.hamburger}</span>
      </button>
      <aside
        className={`h-screen fixed md:static top-0 left-0 ${collapsed ? 'w-12' : 'w-44'} md:${collapsed ? 'w-16' : 'w-56'} bg-gray-100 dark:bg-gray-950 p-2 md:p-4 flex flex-col h-screen border-r border-gray-300 dark:border-gray-800 shadow-md z-20 transition-all duration-200 ${mobileOpen ? '' : 'md:block'} ${mobileOpen ? 'block' : 'hidden md:block'}`}
        onMouseEnter={() => { if (window.innerWidth >= 768) setCollapsed(false); }}
        onMouseLeave={() => { if (window.innerWidth >= 768) setCollapsed(true); }}
      >
        <div className="flex-1 flex flex-col">
          {/* Hamburger icon always at the top when collapsed (desktop) */}
          {collapsed && (
            <div className="flex justify-center mb-8 md:mb-8" title="Expand sidebar">
              {icons.hamburger}
            </div>
          )}
          {!collapsed && (
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 md:block hidden">Menu</h2>
          )}
          <nav>
            <ul className="space-y-2 mt-12 md:mt-0">
              <li>
                <button
                  onClick={() => handleMenuClick('dashboard')}
                  className={`w-full flex items-center gap-2 md:gap-3 text-left text-gray-900 dark:text-gray-100 ${section==='dashboard'?'font-bold':''} justify-${collapsed ? 'center' : 'start'} transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded px-1.5 py-1.5 md:px-2 md:py-2 text-xs md:text-base`}
                  title="Dashboard"
                >
                  <span className="w-5 h-5 md:w-6 md:h-6">{icons.dashboard}</span>
                  {!collapsed && 'Dashboard'}
                </button>
              </li>
            {user?.role === 'doctor' && (
              <li>
                <button
                  onClick={() => handleMenuClick('patients')}
                  className={`w-full flex items-center gap-2 md:gap-3 text-left text-gray-900 dark:text-gray-100 ${section==='patients'?'font-bold':''} justify-${collapsed ? 'center' : 'start'} transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded px-1.5 py-1.5 md:px-2 md:py-2 text-xs md:text-base`}
                  title="Patients"
                >
                  <span className="w-5 h-5 md:w-6 md:h-6">{icons.patients}</span>
                  {!collapsed && 'Patients'}
                </button>
              </li>
            )}
            {user?.role === 'doctor' && (
              <li>
                <button
                  onClick={() => handleMenuClick('clinics')}
                  className={`w-full flex items-center gap-2 md:gap-3 text-left text-gray-900 dark:text-gray-100 ${section==='clinics'?'font-bold':''} justify-${collapsed ? 'center' : 'start'} transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded px-1.5 py-1.5 md:px-2 md:py-2 text-xs md:text-base`}
                  title="Clinics"
                >
                  <span className="w-5 h-5 md:w-6 md:h-6">{icons.clinics}</span>
                  {!collapsed && 'Clinics'}
                </button>
              </li>
            )}
            {user?.role === 'doctor' && (
              <li>
                <button
                  onClick={() => handleMenuClick('appointments')}
                  className={`w-full flex items-center gap-2 md:gap-3 text-left text-gray-900 dark:text-gray-100 ${section==='appointments'?'font-bold':''} justify-${collapsed ? 'center' : 'start'} transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded px-1.5 py-1.5 md:px-2 md:py-2 text-xs md:text-base`}
                  title="Appointments"
                >
                  <span className="w-5 h-5 md:w-6 md:h-6">{icons.appointments}</span>
                  {!collapsed && 'Appointments'}
                </button>
              </li>
            )}
            {user?.role === 'patient' && (
              <li>
                <button
                  onClick={() => handleMenuClick('my-appointments')}
                  className={`w-full flex items-center gap-2 md:gap-3 text-left text-gray-900 dark:text-gray-100 ${section==='my-appointments'?'font-bold':''} justify-${collapsed ? 'center' : 'start'} transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded px-1.5 py-1.5 md:px-2 md:py-2 text-xs md:text-base`}
                  title="My Appointments"
                >
                  <span className="w-5 h-5 md:w-6 md:h-6">{icons.myAppointments}</span>
                  {!collapsed && 'My Appointments'}
                </button>
              </li>
            )}
          </ul>
        </nav>
        </div>
        <div className="space-y-2 flex flex-col items-start w-full mb-2 md:mb-4">
          <button
            className={`w-full flex items-center gap-2 md:gap-3 text-left text-gray-900 dark:text-gray-100 ${section==='profile'?'font-bold':''} justify-${collapsed ? 'center' : 'start'} transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded px-1.5 py-1.5 md:px-2 md:py-2 text-xs md:text-base`}
            onClick={() => handleMenuClick('profile')}
            title="Profile"
          >
            <span className="w-5 h-5 md:w-6 md:h-6">{icons.profile}</span>
            {!collapsed && 'Profile'}
          </button>
          <button
            className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-start px-2 md:px-4'} gap-2 md:gap-3 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-1.5 md:py-2 rounded transition-colors duration-150 hover:bg-red-500 hover:text-white mt-4 text-xs md:text-base`}
            onClick={logout}
            title="Logout"
          >
            <span className="w-5 h-5 md:w-6 md:h-6">{icons.logout}</span>
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>
    </>
  );
}
