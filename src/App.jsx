import { useState, useEffect } from "react";
import { getAllJokes, postNewJoke, updateJokeStatus, deleteJoke } from "./services/jokeService"; 
import "./App.css";

export const App = () => {
  const [newJoke, setNewJoke] = useState(""); 
  const [allJokes, setAllJokes] = useState([]); 
  const [untoldJokes, setUntoldJokes] = useState([]); 
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesFromDB) => {
      setAllJokes(jokesFromDB); 
    });
  }, []); 

  useEffect(() => {
    setUntoldJokes(allJokes.filter((joke) => joke.told === false)); 
    setToldJokes(allJokes.filter((joke) => joke.told === true)); 
  }, [allJokes]);

  const handleAddJoke = () => {
    postNewJoke(newJoke).then(() => {
      setNewJoke(""); 
      getAllJokes().then((updatedJokes) => {
        setAllJokes(updatedJokes); 
      });
    });
  };

  const toggleToldStatus = (joke) => {
    const updatedJoke = { ...joke, told: !joke.told }; 
    updateJokeStatus(updatedJoke).then(() => {
      getAllJokes().then((updatedJokes) => {
        setAllJokes(updatedJokes); 
      });
    });
  };

  const handleDeleteJoke = (jokeId) => {
    deleteJoke(jokeId).then(() => {
      // Re-fetch jokes after deletion
      getAllJokes().then((updatedJokes) => {
        setAllJokes(updatedJokes); 
      });
    });
  };

  return (
    <div className="app-container">
      <h1>Chuckle Checklist</h1>

      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => setNewJoke(event.target.value)}
        />
        <button className="joke-input-submit" onClick={handleAddJoke}>
          Add
        </button>
      </div>

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold <span className="untold-count">({untoldJokes.length})</span></h2>
          {untoldJokes.map((joke) => (
            <div key={joke.id} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <button onClick={() => handleDeleteJoke(joke.id)}>
                <i className="fa-solid fa-trash"></i> {/* Trashcan icon */}
              </button>
              <button onClick={() => toggleToldStatus(joke)}>
                <i className="fa-regular fa-face-laugh-beam"></i> {/* Outlined smiling face */}
              </button>
            </div>
          ))}
        </div>
        <div className="joke-list-container">
          <h2>Told<span className="told-count">({toldJokes.length})</span> </h2>
          {toldJokes.map((joke) => (
            <div key={joke.id} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <button onClick={() => handleDeleteJoke(joke.id)}>
                <i className="fa-solid fa-trash"></i> {/* Trashcan icon */}
              </button>
              <button onClick={() => toggleToldStatus(joke)}>
                <i className="fa-regular fa-face-meh"></i> {/* Outlined straight face */}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};