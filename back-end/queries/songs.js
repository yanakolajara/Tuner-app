const db = require('../db/dbConfig')

const getAllSongs = async () => {
    try{
        const allSongs = await db.any('SELECT * FROM songs');
        return allSongs;
    }catch(e){
        return e;
    }
}

const getOneSong = async (id) => {
    try{
        const oneSong = await db.any('SELECT * FROM songs WHERE id = $1',
        [id]);
        return oneSong;
    }catch(e){
        return e;
    }
}

const createNewSong = async (song) => {
    try{
        const newSong = await db.any('INSERT INTO songs (name, album, artist, time, is_favorite) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [song.name, song.album,song.artist, song.time, song.is_favorite])
        return newSong;
    }catch(e){
        return e;
    }
}

const deleteSong = async (id) => {
    try{
        const songDeleted = await db.any("DELETE FROM songs WHERE id = $1 RETURNING *",
        [id]);
        return songDeleted;
    }catch(e){
        return e;
    }
}

const updateSong = async (id, song) => {
    try{
        const songUpdated = await db.any('UPDATE songs SET name = $1, album = $2, artist = $3, time = $4, is_favorite = $5 WHERE id = $6 RETURNING *',
        [song.name, song.album,song.artist, song.time, song.is_favorite, id])
        return songUpdated;
    }catch(e){
        return e;
    }
}

module.exports = {
    getAllSongs,
    getOneSong,
    createNewSong,
    deleteSong,
    updateSong
}