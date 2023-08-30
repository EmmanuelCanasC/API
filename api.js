const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Base de datos temporal para almacenar listas de reproducción
const playlists = {};

// Crear una nueva lista de reproducción
app.post('/playlists', (req, res) => {
  const playlistName = req.body.name;
  playlists[playlistName] = [];
  res.json({ message: 'Playlist created successfully' });
});

// Agregar una canción a una lista de reproducción
app.post('/playlists/:playlistName/add_song', (req, res) => {
  const playlistName = req.params.playlistName;
  const songName = req.body.song;

  if (playlists[playlistName]) {
    playlists[playlistName].push(songName);
    res.json({ message: 'Song added to playlist' });
  } else {
    res.status(404).json({ error: 'Playlist not found' });
  }
});

// Ver las canciones en una lista de reproducción
app.get('/playlists/:playlistName', (req, res) => {
  const playlistName = req.params.playlistName;

  if (playlists[playlistName]) {
    res.json({ playlist: playlists[playlistName] });
  } else {
    res.status(404).json({ error: 'Playlist not found' });
  }
});

// Eliminar una canción de una lista de reproducción
app.post('/playlists/:playlistName/remove_song', (req, res) => {
  const playlistName = req.params.playlistName;
  const songName = req.body.song;

  if (playlists[playlistName] && playlists[playlistName].includes(songName)) {
    playlists[playlistName] = playlists[playlistName].filter(song => song !== songName);
    res.json({ message: 'Song removed from playlist' });
  } else {
    res.status(404).json({ error: 'Playlist or song not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
