import './App.css';
import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [albums, setAlbums] = useState([]);


  const albumGrid = 
  <div className={""}>
    <Grid container spacing={1}>
      {albums.map((album) => (
        <Grid item xs={12} sm={6} md={4}
          key={album.id}>
          <AlbumCard album={album} />
        </Grid>
      ))}
    </Grid>
  </div>

  useEffect(() => {
    fetch("https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums", {
      method: "get",
      headers: new Headers({
        "content-type": "application/json",
        "Authorization": "Bearer 22bE4uQ6baNwSHPVcDxLCe",
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAlbums(result.items);
          console.log(result);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
      <header className="App-header">
        
        {
        albums === undefined ? 
          "There was an error our side"
          :
          albumGrid
        }
        
      </header>
    </div>
    );
  } 
}


function AlbumCard({album}) {
  return (
    <div className="AlbumCardOuter">
      <div className="ImageHeadingRow"><div>{album.name}</div><div>{album.release_date}</div></div>
      <img src={album.images[1].url} className="AlbumImage" alt={album.name}/>

    </div>
    );
}
export default App;
