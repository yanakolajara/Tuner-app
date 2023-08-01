const express = require('express')
const router = express.Router()
const {
    getAllSongs,
    getOneSong,
    createNewSong,
    deleteSong,
    updateSong
} = require('../queries/songs')

const {
    checkName,
    checkArtist,
    checkIsFavorite,
} = require('../validations/checkSongs')

router.get('/', async (req,res) => {
    try{
        const allSongs = await getAllSongs();
        if(allSongs[0]){
            res.json(allSongs)
        }else{
            res.status(500).json({ error: "Server error" })
        }
    }catch(e){
        res.status(500).json({ error: e })
    }
})

router.get('/:id', async (req,res) => {
    try{
        const oneSong = await getOneSong(req.params.id);
        if(oneSong.length > 0){
            res.json(oneSong)
        }else{
            res.status(500).json({ error: "Not found" })
        }
    }catch(e){
        res.status(500).json({ error: e })
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const songDeleted = await deleteSong(req.params.id);
        if(songDeleted.length > 0){
            res.json(songDeleted)
        }else{
            res.status(500).json({ error: "Not found" })
        }
    }catch(e){
        res.status(500).json({ error: e })
    }
})

router.post('/', checkName, checkArtist, checkIsFavorite, async (req,res) => {
    try{
        const newSong = await createNewSong(req.body);
        res.json(newSong)
    }catch(e){
        res.status(500).json({ error: e })
    }
})

router.put('/:id', checkName, checkArtist, checkIsFavorite, async (req,res) => {
    try{
        const updatedSong = await updateSong(req.params.id, req.body);
        res.json(updatedSong)
    }catch(e){
        res.status(500).json({ error: e })
    }
})

module.exports = router;