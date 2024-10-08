// This function fetches all jokes from the database
export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes")
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching jokes:", error));
  };
  
  // This function posts a new joke to the database
export const postNewJoke = (newJoke) => {
    return fetch("http://localhost:8088/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newJoke,  // Change 'joke' to 'text'
        told: false,    // New jokes are untold by default
      }),
    }).then((response) => response.json());
  };
  
  export const updateJokeStatus = (joke) => {
    return fetch(`http://localhost:8088/jokes/${joke.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joke),
    }).then((response) => response.json());
  };

  export const deleteJoke = (jokeId) => {
    return fetch(`http://localhost:8088/jokes/${jokeId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  };