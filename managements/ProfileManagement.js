router.get('/profile', (req, res) => {
    const patientId = req.session.patientId;

    if (!patientId) return res.status(401).send('Unauthorized');

    const query = 'SELECT first_name, last_name, phone, date_of_birth, gender, address FROM patients WHERE id = ?';
    db.execute(query, [patientId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).send('Error retrieving profile');
        }
        res.status(200).json(results[0]);
    });
});

router.put('/profile', (req, res) => {
    const patientId = req.session.patientId;
    const { first_name, last_name, phone, date_of_birth, gender, address } = req.body;

    if (!patientId) return res.status(401).send('Unauthorized');

    const query = 'UPDATE patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?';
    db.execute(query, [first_name, last_name, phone, date_of_birth, gender, address, patientId], (err) => {
        if (err) {
            return res.status(500).send('Error updating profile');
        }
        res.status(200).send('Profile updated successfully');
    });
});
