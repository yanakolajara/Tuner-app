import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import musicIcon from '../media/music.png'
import favoriteIcon from '../media/favourite.png'
import notFavoriteIcon from '../media/not-fav.png'
import backArrow from '../media/arrow-left.png'
import edit from '../media/edit.png'
import remove from '../media/bin.png'
import { queries } from "@testing-library/react";



export function Song(){
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(notFavoriteIcon)
    const songId = useParams().id
    const navigate = useNavigate()
    const url = process.env.REACT_APP_API_URL
    
    async function fetchData(){
        try{
            const fetch = await axios.get(`${url}/songs/${songId}`)
            setData(fetch.data[0])
            setLoading(false)
            setIsFavorite(fetch.data[0].is_favorite ? favoriteIcon : notFavoriteIcon)
        }catch(e){
            console.log(e)
        }
    }

    function backButton(){
        navigate('/songs')
    }
    function editButton(){
        navigate(`/songs/${songId}/edit`)
    }
    async function removeButton(){
        try{
            const fetch = await axios.delete(`http://localhost:3004/songs/${songId}`)
            navigate('/songs')
        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchData()
    },[])
    
    if(loading){
        return('loading...')
    }

    return(
        <main>
            <div id="oneSong">
                <img src={musicIcon} id="musicIcon"/>
                <img id="favIcon"src={isFavorite}/>
                <h1 id="oneSongName">{data.name}</h1>
                <p id="oneSongArtist">By: {data.artist}</p>
                <h2 id="oneSongAlbum">{data.name} is a song with {data.time} minutes long by the artist/band {data.artist}. This song appears on the album "{data.album}."</h2>
                <button 
                id="oneSongBackButton"
                onClick={() => backButton()}
                ><img src={backArrow}/></button>
                <button 
                id="oneSongEditButton"
                onClick={() => editButton()}
                ><img src={edit}/></button>
                <button 
                id="oneSongRemoveButton"
                onClick={() => removeButton()}
                ><img src={remove}/></button>
            </div>
        </main>

    )
}