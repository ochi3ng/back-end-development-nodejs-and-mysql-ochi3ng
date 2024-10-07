router.post('/book', async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, "scheduled")',
            [patient_id, doctor_id, appointment_date, appointment_time]
        );
        res.status(201).send('Appointment booked');
    } catch (error) {
        res.status(500).send('Error booking appointment');
    }
});
