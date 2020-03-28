
const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json('some fields are empty');
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                console.log(loginEmail, ' can be inserted into LOGIN Table');
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joindate: new Date()
                    })
                    .then(user => { res.json(user[0]), console.log('user can be inserted into USERS Table') })
                    .catch(err => { res.json(err), console.log('in first cath') })
            })
            .then(trx.commit)
            .catch(trx.rollback, console.log('second catch'))
    })
        // .then(result => console.log(result))
        .catch(err => { res.status(400).json(err), console.log('last catch') })
}

module.exports = {
    handleRegister: handleRegister,
}
