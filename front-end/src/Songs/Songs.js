import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import musicNote from '../media/music-notes.png'
import favoriteIcon from '../media/favourite.png'
import notFavoriteIcon from '../media/not-fav.png'
import sortDefIcon from '../media/funnel.png'
import sortAscIcon from '../media/sort-asc.png'
import sortDescIcon from '../media/sort-desc.png'
import sortFavIcon from '../media/test123.png'


export function Songs(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [data,setData] = useState([]);
    const url = process.env.REACT_APP_API_URL
    const location = useLocation()
    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search))
    const [sortAbc, setSortAbc] = useState(sortDefIcon)
    const [sortFav, setSortFav] = useState(sortFavIcon)
    const [favName, setFavName] = useState('Favorites')
    const [sortName, setSortName] = useState('A-B')


    async function fetchSongs(){
        try{
            const fetch = await axios.get(`${url}/songs`)
            setData(fetch.data)
            setLoading(false)
        }catch(e){
            console.log(e)
        }
    
    }

    useEffect(() => {
        fetchSongs()
    }, [])

    useEffect(() => {
        setQueryParams(new URLSearchParams(location.search))
    }, [location.search])

    //TODO: Check useEffect just in case
    useEffect(() => {
        
    },[sortAbc, sortFav])

    function sortAbcCheck(x){
        x.preventDefault()
        if(queryParams.get('order') == 'asc'){
            if(queryParams.get('is_favorite') == 'true'){navigate('/songs?order=desc&is_favorite=true')}
            else if(queryParams.get('is_favorite') == 'false'){navigate('/songs?order=desc&is_favorite=false')}
            else{navigate('/songs?order=desc')}
        }else if(queryParams.get('order') == 'desc' || queryParams.get('order') == null){
            if(queryParams.get('is_favorite') == 'true'){navigate('/songs?order=asc&is_favorite=true')}
            else if(queryParams.get('is_favorite') == 'false'){navigate('/songs?order=asc&is_favorite=false')}
            else{navigate('/songs?order=asc')}
        }
    }
    function sortFavCheck(x){
        x.preventDefault()
        if(queryParams.get('is_favorite') == 'true'){
            if(queryParams.get('order') == 'asc'){navigate('/songs?order=asc&is_favorite=false')}
            else if(queryParams.get('order') == 'desc'){navigate('/songs?order=desc&is_favorite=false')}
            else{navigate('/songs?is_favorite=false')}
        }else if(queryParams.get('is_favorite') == 'false'  || queryParams.get('is_favorite') == null){
            if(queryParams.get('order') == 'asc'){navigate('/songs?order=asc&is_favorite=true')}
            else if(queryParams.get('order') == 'desc'){navigate('/songs?order=desc&is_favorite=true')}
            else{navigate('/songs?is_favorite=true')}
        }
    }

    function songSelected(x){
        navigate(`/songs/${x.currentTarget.id}`)
    }
    
    function displaySongs(){
        const songsArr = data.map((song) => {
            const songId = song.id
            const favoriteCheck = song.is_favorite ? favoriteIcon : notFavoriteIcon;
            return(
                <>
                    <div
                    class="songBlock"
                    id={songId}
                    name={song.name}
                    is_favorite={song.is_favorite}
                    onClick={(x) => songSelected(x)}
                    >
                        <img class="songIcon"src={musicNote}/>
                        <div class="songInfo">
                            <p class="songName">{song.name}</p>
                            <p class="songArtist">{song.artist} / {song.time}</p>
                        </div>
                        <img class="songFavorite"src={favoriteCheck}/>
                    </div>
                    <div class="lineSeparator"/>
                </>
            )
        })
        let finalArr = songsArr
        if(queryParams.get('order') === 'asc'){
            const ascArr = songsArr.sort((a, b) => a.props.children[0].props.name < b.props.children[0].props.name ? -1 : 1)
            finalArr = ascArr
        }else if(queryParams.get('order') === 'desc'){
            const descArr = songsArr.sort((a, b) => a.props.children[0].props.name > b.props.children[0].props.name ? -1 : 1)
            finalArr = descArr
        }
        if(queryParams.get('is_favorite') === 'true'){
            finalArr = finalArr.filter((x) => !!x.props.children[0].props.is_favorite)
        }else if(queryParams.get('is_favorite') === 'false'){
            finalArr = finalArr.filter((x) => !x.props.children[0].props.is_favorite)
        }
        return finalArr
    }


    if(loading){
        return('Loading...')
    }
    
    return(
        <main>
            <div class='sortButtons'>
                <button
                class="sortAbcButton"
                onClick={(x) => sortAbcCheck(x)}
                >{sortName}</button>
                <button
                class="sortFavButton"
                onClick={(x) => sortFavCheck(x)}
                >{favName}</button>
            </div>
            <div id="songList">
                {displaySongs()}
            </div>
        </main>
    )
}