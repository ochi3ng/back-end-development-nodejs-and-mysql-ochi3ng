// Patients book an appointment
router.post('/appointments', (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, "scheduled")';
    db.execute(query, [patient_id, doctor_id, appointment_date, appointment_time], (err) => {
        if (err) return res.status(500).send('Error booking appointment');
        res.status(200).send('Appointment booked successfully');
    });
});

// Cancel appointment
router.put('/appointments/:id/cancel', (req, res) => {
    const appointmentId = req.params.id;

    const query = 'UPDATE appointments SET status = "canceled" WHERE id = ?';
    db.execute(query, [appointmentId], (err) => {
        if (err) return res.status(500).send('Error canceling appointment');
        res.status(200).send('Appointment canceled');
    });
});
