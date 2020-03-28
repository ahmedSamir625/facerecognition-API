
// const Clarifai = require('clarifai')

// const app = new Clarifai.App({
//     apiKey: '4cfc949d4bee4db0a154ed2b8d3f454d'
// });

const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '4cfc949d4bee4db0a154ed2b8d3f454d'
});




handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(_ => {
            json.status(400).json('can\'t get the image');
        })
}


handleImage = (req, res, db) => {
    const { id } = req.body;
    // console.log("the id is : ", id);

    // const user = database.users.find(user => user.id === id);
    // user != undefined
    //     ?
    //     (
    //         user.entries++,
    //         console.log("the number of entries is : ", user.entries),

    //         res.json(user.entries)
    //     )
    //     : res.status(404).json('user not found');

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(_ => res.status(400).json('something went wrong'))

}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}