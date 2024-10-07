// Admin route to view all patients
router.get('/patients', (req, res) => {
    const query = 'SELECT * FROM patients';

    db.execute(query, (err, results) => {
        if (err) return res.status(500).send('Error retrieving patients');
        res.status(200).json(results);
    });
});

// Patient delete account
router.delete('/patients/:id', (req, res) => {
    const patientId = req.params.id;

    const query = 'DELETE FROM patients WHERE id = ?';
    db.execute(query, [patientId], (err) => {
        if (err) return res.status(500).send('Error deleting patient account');
        res.status(200).send('Patient account deleted');
    });
});
