import React, { useEffect, useState } from 'react';
import { fetchAppointmentsForDoctor, fetchAppointmentsForPatient } from '../api';

export default function AppointmentList({ doctorId, patientId }) {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (doctorId) {
      fetchAppointmentsForDoctor(doctorId).then(setAppointments);
    } else if (patientId) {
      fetchAppointmentsForPatient(patientId).then(setAppointments);
    }
  }, [doctorId, patientId]);
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Appointments</h2>
      <ul className="list-disc ml-6">
        {appointments.map(appt => (
          <li key={appt._id}>
            {appt.date && (
              <span className="font-semibold">{new Date(appt.date).toLocaleString()}</span>
            )}
            {appt.clinicId && (
              <span> @ {appt.clinicId.name}</span>
            )}
            {appt.patientId && appt.patientId.name && (
              <span> – Patient: {appt.patientId.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
