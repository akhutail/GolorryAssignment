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

    if(window.location.href.indexOf("#access_token") === -1){// not found, not redirected, needs to redirect
      window.location.href = "https://accounts.spotify.com/authorize?client_id=1382ccbd19854d0eb5c67ccf45a846dd&redirect_uri=https:%2F%2Fmain.d3h4j1s9xh2pja.amplifyapp.com%2Fcallback&response_type=token&state=123";
    }

    else { // redirected
      const urls = window.location.href;
      const token = urls.substring(urls.indexOf("#acess") + 14, urls.indexOf("&token_type"));

      fetch("https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums", {
        method: "get",
        headers: new Headers({
          "content-type": "application/json",
          "Authorization": "Bearer " + token,
        }),
      })
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            console.log(result)
            if(result.error === undefined){ // successfully retrieved albums
              setAlbums(result.items);
            }

          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
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
        albums.length === 0 ? 
          "Authentication problem: spotify authentication token expired"
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
