router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).send('Patient not found');
        }

        const patient = rows[0];
        const isMatch = await bcrypt.compare(password, patient.password_hash);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        req.session.patientId = patient.id;
        res.send('Login successful');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
