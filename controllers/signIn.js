
const handleSignIn = (req, res, db, bcrypt) => {

    const { email, password } = req.body;
    // const user = database.users.find(
    //     user => (
    //         email === user.email && password === user.password
    //     )
    // )
    // user != undefined
    //     ? res.json(user)
    //     : res.status(400).json('fail');

    if (!email || !password) {
        return res.status(400).json('some fields are empty');
    }

    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);

            if (isValid) {
                db.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(_ => res.status(400).json('cannot login'))
            }
            else {
                res.status(400).json('wrong password');
            }
        })
        .catch(_ => res.status(400).json('email not found'))


}

module.exports = {
    handleSignIn: handleSignIn,
}