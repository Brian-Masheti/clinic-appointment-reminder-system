const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function fetchClinics(doctorId) {
  const res = await fetch(`${API_BASE}/clinics/doctor/${doctorId}`);
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch clinics');
  return res.json();
}

export async function updateAppointment(id, data) {
  const res = await fetch(`${API_BASE}/appointments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to update appointment');
  return res.json();
}

export async function softDeleteAppointment(id) {
  const res = await fetch(`${API_BASE}/appointments/${id}/soft-delete`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to delete appointment');
  return res.json();
}

export async function createClinic(data) {
  const res = await fetch(`${API_BASE}/clinics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to create clinic');
  return res.json();
}

export async function updateClinic(id, data) {
  const res = await fetch(`${API_BASE}/clinics/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to update clinic');
  return res.json();
}

export async function softDeleteClinic(id) {
  const res = await fetch(`${API_BASE}/clinics/${id}/soft-delete`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to delete clinic');
  return res.json();
}

export async function fetchAppointmentsForDoctor(doctorId) {
  const res = await fetch(`${API_BASE}/appointments/doctor/${doctorId}`);
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch appointments');
  return res.json();
}

export async function fetchAppointmentsForPatient(patientId) {
  const res = await fetch(`${API_BASE}/appointments/patient/${patientId}`);
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch appointments');
  return res.json();
}

export async function createAppointment(data) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to create appointment');
  return res.json();
}

export async function fetchPatients(doctorId) {
  const url = doctorId ? `${API_BASE}/patients/doctor/${doctorId}` : `${API_BASE}/patients`;
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch patients');
  return res.json();
}

export async function createPatient(data) {
  const res = await fetch(`${API_BASE}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to create patient');
  return res.json();
}

export async function linkPatientToDoctor(patientId, doctorId) {
  const res = await fetch(`${API_BASE}/patients/${patientId}/link-doctor`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctorId }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to link patient');
  return res.json();
}

export async function softDeletePatient(id) {
  const res = await fetch(`${API_BASE}/patients/${id}/soft-delete`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to delete patient');
  return res.json();
}

export async function updatePatient(id, data) {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to update patient');
  return res.json();
}
