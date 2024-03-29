const mongoose = require("mongoose")
// import Album model
const Album = mongoose.model("Album")


const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find()
        return res.send(albums)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}
   // find one Album by their id
const getOneAlbum = async (req, res) => {
    try {
        console.log(req.params.albumId)
        const oneAlbum = await Album.findOne( {"_id": req.params.albumId})
        if (oneAlbum === null) { 
            // no Album found in database
            res.status(404)
            return res.send("Album not found")
        }
        return res.send(oneAlbum) // Album was found
    } 
    catch (err) { // error occurred
       res.status(400)
       return res.send("Database query failed")
    }
}

  // find one Album by their title
const getAllAlbumsbyTitle = async (req, res) => {
    try {
        const albums = await Album.find( {"title": req.params.albumTitle} )
        console.log("Getting all albums by title");
        return res.send(albums)
    } catch (err) {
        res.status(404)
        console.log("failed " + req.params.profile);
        return res.send("Database query failed")
    }
}

const getProfilesAlbums = async (req, res) => {
    try {
        const albums = await Album.find( {"profile": req.params.profile } )
        console.log("Getting all albums");
        return res.send(albums)
    } catch (err) {
        res.status(404)
        console.log("failed " + req.params.profile);
        return res.send("Database query failed")
    }
}

const updateAlbum = async (req, res) => {
    try {
       //const oneAlbum = await Album.find( {"albumId": req.params.albumId } );
       const update = {
            title: req.body.title,
            artist: req.body.artist,
            country: req.body.country,
            genre: req.body.genre,
            release_date: req.body.release_date,
            artwork: req.body.artwork,
            expectation: req.body.expectation,
            in_queue: req.body.in_queue,
            originality: req.body.originality,
            flow: req.body.flow,
            lyrics: req.body.lyrics,
            how_captivating: req.body.how_captivating,
            timelessness: req.body.timelessness,
            music: req.body.music,
            delivery: req.body.delivery,
            ratings: req.body.ratings,
            notes: req.body.notes
       }
   await Album.findByIdAndUpdate(req.params.albumId, update)
   return res.send("Updated Album") // Album was found and updated 
   } 
   catch (err) { // error occurred
       console.log(err)
       res.status(400)
       return res.send("Database query faileddd")
   }
}
   
//add Album to the database
const addAlbum = (req, res) => {
    const title = req.body.title
    const profile = req.body.profile
    const artist = req.body.artist
    const country = req.body.country
    const genre = req.body.genre
    const release_date = req.body.release_date
    const cover_photo = req.body.cover_photo
    const artwork = req.body.artwork
    const expectation = req.body.expectation
    const in_queue = req.body.in_queue
    const originality = req.body.originality
    const flow = req.body.flow
    const lyrics = req.body.lyrics
    const how_captivating = req.body.how_captivating
    const timelessness = req.body.timelessness
    const music = req.body.music
    const delivery = req.body.delivery
    const notes = req.body.notes
    const ratings = req.body.ratings
    const songs = req.body.songs

    const newAlbum = new Album({
    title,
    profile,
    artist,
    country,
    genre,
    release_date,
    cover_photo,
    artwork,
    expectation,
    in_queue,
    originality,
    flow,
    lyrics,
    how_captivating,
    timelessness,
    music,
    delivery,
    notes,
    ratings,
    songs,
    });
   
    newAlbum.save()
    .then(() => res.json('Album added!'))
    .catch (err => res.status(400).json(`Error: ${err}`));
}

module.exports = {
    getAllAlbums,
    getOneAlbum,
    addAlbum,
    getProfilesAlbums,
    updateAlbum,
    getAllAlbumsbyTitle
}