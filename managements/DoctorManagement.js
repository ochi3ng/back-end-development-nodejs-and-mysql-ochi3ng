// Admin creates a new doctor
router.post('/doctors', (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    const query = 'INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [first_name, last_name, specialization, email, phone, schedule], (err) => {
        if (err) return res.status(500).send('Error adding doctor');
        res.status(200).send('Doctor added successfully');
    });
});

// Display all doctors
router.get('/doctors', (req, res) => {
    const query = 'SELECT * FROM doctors';

    db.execute(query, (err, results) => {
        if (err) return res.status(500).send('Error retrieving doctors');
        res.status(200).json(results);
    });
});
