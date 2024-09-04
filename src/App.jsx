import { useState, useEffect } from "react";
import { getAllJokes, postNewJoke } from "./services/jokeService"; // Assuming this fetches all jokes from the database
import "./App.css";

export const App = () => {
  const [newJoke, setNewJoke] = useState(""); // To hold the new joke the user types
  const [allJokes, setAllJokes] = useState([]); // To hold all jokes from the database
  const [untoldJokes, setUntoldJokes] = useState([]); // To hold only untold jokes
  const [toldJokes, setToldJokes] = useState([]); // To hold only told jokes

  // 2. **Fetching All Jokes and Avoiding Infinite Loop:**

  // We want to fetch the jokes from the database when the component loads for the first time.
  // To prevent infinite loops, we use the `useEffect` hook and only call the function once when the component mounts.
  useEffect(() => {
    getAllJokes().then((jokesFromDB) => {
      setAllJokes(jokesFromDB); // Store all jokes in state
    });
  }, []); // Empty array means this effect only runs once

  // 3. **Filtering the Jokes into Told and Untold:**

  // We need to filter the jokes once we have them in allJokes.
  // We use another useEffect to watch for changes to allJokes, and then update untoldJokes and toldJokes.
  useEffect(() => {
    setUntoldJokes(allJokes.filter((joke) => joke.told === false)); // Jokes not told yet
    setToldJokes(allJokes.filter((joke) => joke.told === true)); // Jokes that have been told
  }, [allJokes]); // This effect runs every time allJokes changes

  // 4. **Adding a New Joke:**

  const handleAddJoke = () => {
    postNewJoke(newJoke).then(() => {
      setNewJoke(""); // Clear input
      // Re-fetch jokes after adding a new one
      getAllJokes().then((updatedJokes) => {
        setAllJokes(updatedJokes); // Update the list of jokes
      });
    });
  };
  console.log(toldJokes);
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
          <h2>Untold<span className="untold-count">({untoldJokes.length})</span></h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li key={joke.id}>{joke.text}</li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>Told<span className="told-count">({toldJokes.length})</span></h2>
          <ul>
            {toldJokes.map((joke) => (
              <li key={joke.id}>{joke.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
