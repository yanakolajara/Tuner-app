import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function Edit(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [artist ,setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [time, setTime] = useState(2023);
    const [fav, setFav] = useState(false);
    const songId = useParams().id

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = process.env.REACT_APP_API_URL

        try{
            fav === 'false' ? setFav(false) : setFav(true);
            const fetch = await axios.put(`${url}/songs/${songId}`,{
                name: name,
                album: album,
                artist: artist,
                time: time,
                is_favorite: fav
            })
            navigate(`/songs/${songId}`)
        }catch(e){
            console.log(e)
        }
    }

    return(
        <main id="mainEditSong">
            <div id="divEditSong">
                <h1>Edit song</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <br/>
                    <input
                    id="nameInput"
                    type="text"
                    value={name}
                    onChange={(x) => setName(x.target.value)}
                    required/>
                    <br/>
                    <label>Artist</label>
                    <br/>
                    <input
                    id="artistInput"
                    type="text"
                    value={artist}
                    onChange={(x) => setArtist(x.target.value)}
                    required/>
                    <br/>
                    <label>Album</label>
                    <br/>
                    <input
                    id="albumInput"
                    type="text"
                    value={album}
                    onChange={(x) => setAlbum(x.target.value)}
                    required/>
                    <br/>
                    <label>Release year</label>
                    <br/>
                    <input
                    id="timeInput"
                    type="number"
                    min="1499"
                    max="2099"
                    step="1"
                    value={time}
                    onChange={(x) => setTime(x.target.value)}
                    required/>
                    <br/>
                    <label>Favorite</label>
                    <input
                    id="favInput"
                    type="checkbox"
                    value={fav}
                    onChange={(x) => setFav(x.target.value)}/>
                    <br/>
                    <input
                    id="submitInput"
                    type="submit"
                    />
                </form>
            </div>
        </main>
    )
}