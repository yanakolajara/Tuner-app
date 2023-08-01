import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export function New(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [artist ,setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [time, setTime] = useState('');
    const [fav, setFav] = useState(false);
    const url = process.env.REACT_APP_API_URL

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            fav === 'false' ? setFav(false) : setFav(true);
            const fetch = await axios.post(`${url}/songs`,{
                name: name,
                album: album,
                artist: artist,
                time: time,
                is_favorite: fav
            })
            navigate('/songs')
        }catch(e){
            console.log(e)
        }
    }

    return(
        <main id="mainNewSong">
            <div id="divNewSong">
                <h1>New song</h1>
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
                    <label>Time</label>
                    <br/>
                    <input
                    id="timeInput"
                    type="text"
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