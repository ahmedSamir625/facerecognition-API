const profileGet = (req, res , db) => {
    const { id } = req.params;
    // const user = database.users.find(user => user.id === id);
    // user != undefined
    //     ? res.json(user)
    //     : res.status(404).json('user not found');

    db.select('*').from('users').where({ id })
        .then(user => {
            user.length != 0
                ? (res.json(user[0]), console.log(user))
                : (res.status(400).json('user not found'), console.log(user))
        })
        .catch(_ => res.status(400).json('something went wrong'));

}

module.exports = {
    profileGet: profileGet,
}