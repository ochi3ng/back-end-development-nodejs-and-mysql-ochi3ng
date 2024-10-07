router.post('/doctors', async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]
        );
        res.status(201).send('Doctor added');
    } catch (error) {
        res.status(500).send('Error adding doctor');
    }
});
