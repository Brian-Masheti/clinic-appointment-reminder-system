import React, { useEffect, useState } from 'react';
import ClinicForm from './ClinicForm';
import ClinicList from './ClinicList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import PatientForm from './PatientForm';
import LinkPatient from './LinkPatient';
import { fetchClinics, fetchAppointmentsForDoctor } from '../api';

export default function DashboardDoctor({ doctorId, section, setSection }) {
  const [selectedClinic, setSelectedClinic] = useState('');
  const [clinics, setClinics] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const [editPatient, setEditPatient] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAppt, setEditAppt] = useState(null);
  const [editApptDate, setEditApptDate] = useState('');
  const [editApptTime, setEditApptTime] = useState('');
  const [editApptNotes, setEditApptNotes] = useState('');

  // Clinic edit modal state (must be at top level)
  const [editClinic, setEditClinic] = useState(null);
  const [editClinicForm, setEditClinicForm] = useState({ name: '', address: '', phone: '', email: '', description: '' });

  useEffect(() => {
    fetchClinics(doctorId).then(setClinics);
    fetchAppointmentsForDoctor(doctorId).then(setAppointments);
    // Only fetch patients if needed
    if (section === 'patients') {
      import('../api').then(api => api.fetchPatients(doctorId).then(setPatients));
    }
  }, [doctorId, refresh, section]);

  if (section === 'dashboard') {
    // Per-clinic breakdown
    const clinicStats = clinics.map(clinic => {
      const appts = appointments.filter(a => a.clinicId?._id === clinic._id);
      const patientIds = new Set(appts.map(a => a.patientId?._id));
      return {
        ...clinic,
        numAppointments: appts.length,
        numPatients: patientIds.size,
      };
    });
    return (
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => window.scrollTo(0,0)}>Overview</button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow" onClick={() => setSection ? setSection('clinics') : window.dispatchEvent(new CustomEvent('sidebar-section', { detail: 'clinics' }))}>Clinics</button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow" onClick={() => setSection ? setSection('patients') : window.dispatchEvent(new CustomEvent('sidebar-section', { detail: 'patients' }))}>Patients</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow" onClick={() => setSection ? setSection('appointments') : window.dispatchEvent(new CustomEvent('sidebar-section', { detail: 'appointments' }))}>Appointments</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicStats.map(clinic => (
            <div key={clinic._id} className="bg-gray-900 rounded-lg p-6 shadow flex flex-col items-center">
              <div className="text-xl font-bold mb-2">{clinic.name}</div>
              <div className="mb-1">Patients: <span className="font-bold text-green-400">{clinic.numPatients}</span></div>
              <div className="mb-1">Appointments: <span className="font-bold text-yellow-400">{clinic.numAppointments}</span></div>
              <div className="text-sm text-gray-400">{clinic.address}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (section === 'patients') {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Your Patients</h2>
        <LinkPatient doctorId={doctorId} clinics={clinics} onLinked={() => setRefresh(r => r + 1)} />
        <PatientForm doctorId={doctorId} onCreated={() => setRefresh(r => r + 1)} />
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.filter(p => !p.deleted).map(patient => (
              <tr key={patient._id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="py-2">{patient.name}</td>
                <td className="py-2">{patient.email}</td>
                <td className="py-2">{patient.phone || '-'}</td>
                <td className="py-2 flex gap-2">
                  <button
                    title="Edit"
                    className="text-blue-400 hover:text-blue-600"
                    onClick={() => {
                      setEditPatient(patient);
                      setEditName(patient.name);
                      setEditEmail(patient.email);
                      setEditPhone(patient.phone || '');
                    }}
                  >
                    <span role="img" aria-label="edit">✏️</span>
                  </button>
                  <button
                    title="Delete"
                    className="text-red-400 hover:text-red-600"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this patient?')) {
                        await import('../api').then(api => api.softDeletePatient(patient._id));
                        setRefresh(r => r + 1);
                      }
                    }}
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Edit Patient</h3>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  await import('../api').then(api => api.updatePatient(editPatient._id, { name: editName, email: editEmail, phone: editPhone }));
                  setEditPatient(null);
                  setRefresh(r => r + 1);
                }}
              >
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Name"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  required
                />
                <input
                  className="border p-2 mb-4 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Phone"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEditPatient(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  // (removed duplicate, now at top)
  if (section === 'clinics') {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Your Clinics</h2>
        <ClinicForm doctorId={doctorId} onCreated={() => setRefresh(r => r + 1)} />
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Name</th>
              <th className="py-2">Address</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Email</th>
              <th className="py-2">Description</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.filter(clinic => !clinic.deleted).map(clinic => (
              <tr key={clinic._id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="py-2">{clinic.name}</td>
                <td className="py-2">{clinic.address}</td>
                <td className="py-2">{clinic.phone || '-'}</td>
                <td className="py-2">{clinic.email || '-'}</td>
                <td className="py-2">{clinic.description}</td>
                <td className="py-2 flex gap-2">
                  <button
                    title="Edit"
                    className="text-blue-400 hover:text-blue-600"
                    onClick={() => {
                      setEditClinic(clinic);
                      setEditClinicForm({
                        name: clinic.name,
                        address: clinic.address,
                        phone: clinic.phone,
                        email: clinic.email,
                        description: clinic.description,
                      });
                    }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                  </button>
                  <button
                    title="Delete"
                    className="text-red-400 hover:text-red-600"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this clinic?')) {
                        await import('../api').then(api => api.softDeleteClinic(clinic._id));
                        setRefresh(r => r + 1);
                      }
                    }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit Clinic Modal */}
        {editClinic && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Edit Clinic</h3>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  await import('../api').then(api => api.updateClinic(editClinic._id, editClinicForm));
                  setEditClinic(null);
                  setRefresh(r => r + 1);
                }}
              >
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Clinic Name"
                  value={editClinicForm.name}
                  onChange={e => setEditClinicForm({ ...editClinicForm, name: e.target.value })}
                  required
                />
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Address"
                  value={editClinicForm.address}
                  onChange={e => setEditClinicForm({ ...editClinicForm, address: e.target.value })}
                  required
                />
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Phone"
                  value={editClinicForm.phone}
                  onChange={e => setEditClinicForm({ ...editClinicForm, phone: e.target.value })}
                  required
                />
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Email"
                  value={editClinicForm.email}
                  onChange={e => setEditClinicForm({ ...editClinicForm, email: e.target.value })}
                  required
                />
                <textarea
                  className="border p-2 mb-4 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Description"
                  value={editClinicForm.description}
                  onChange={e => setEditClinicForm({ ...editClinicForm, description: e.target.value })}
                  rows={2}
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEditClinic(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (section === 'appointments') {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        <div className="mb-4">
          <label className="mr-2 text-gray-200">Filter by Clinic:</label>
          <select
            className="border p-2 rounded dark:bg-gray-800 dark:text-gray-100"
            value={selectedClinic}
            onChange={e => setSelectedClinic(e.target.value)}
          >
            <option value="">All Clinics</option>
            {clinics.map(clinic => (
              <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
            ))}
          </select>
        </div>
        <AppointmentForm doctorId={doctorId} clinics={clinics} onCreated={() => setRefresh(r => r + 1)} />
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Clinic</th>
              <th className="py-2">Patient</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Notes</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.filter(appt => !appt.deleted && (!selectedClinic || appt.clinicId?._id === selectedClinic)).map(appt => (
              <tr key={appt._id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="py-2">{appt.clinicId?.name || '-'}</td>
                <td className="py-2">{appt.patientId?.name || '-'}</td>
                <td className="py-2">{appt.date ? new Date(appt.date).toLocaleDateString() : '-'}</td>
                <td className="py-2">{appt.time}</td>
                <td className="py-2">{appt.notes || '-'}</td>
                <td className="py-2 flex gap-2">
                  <button
                    title="Edit"
                    className="text-blue-400 hover:text-blue-600"
                    onClick={() => {
                      setEditAppt(appt);
                      setEditApptDate(appt.date ? appt.date.slice(0, 10) : '');
                      setEditApptTime(appt.time || '');
                      setEditApptNotes(appt.notes || '');
                    }}
                  >
                    <span role="img" aria-label="edit">✏️</span>
                  </button>
                  <button
                    title="Delete"
                    className="text-red-400 hover:text-red-600"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this appointment?')) {
                        await import('../api').then(api => api.softDeleteAppointment(appt._id));
                        setRefresh(r => r + 1);
                      }
                    }}
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editAppt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Edit Appointment</h3>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  await import('../api').then(api => api.updateAppointment(editAppt._id, { date: editApptDate, time: editApptTime, notes: editApptNotes }));
                  setEditAppt(null);
                  setRefresh(r => r + 1);
                }}
              >
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  type="date"
                  value={editApptDate}
                  onChange={e => setEditApptDate(e.target.value)}
                  required
                />
                <input
                  className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  type="time"
                  value={editApptTime}
                  onChange={e => setEditApptTime(e.target.value)}
                  required
                />
                <textarea
                  className="border p-2 mb-4 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Notes"
                  value={editApptNotes}
                  onChange={e => setEditApptNotes(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEditAppt(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
}
