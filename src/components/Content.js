import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
// const SPACE = "%20";

function Content() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [summonerLevel, setSummonerLevel] = useState("");

  async function getSummonerData() {
    fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/tpa%20mistake?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSummonerLevel(result.summonerLevel);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    getSummonerData();
  }, []); // empty array means it will run once

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main className="content">
        <h1 className="content__title">LolFinder</h1>
        <input className="search-player-input" type="text"></input>
        <button className="search-player-btn" onClick={getSummonerData}>
          Search
        </button>

        <p>{summonerLevel}</p>
      </main>
    );
  }
}

export default Content;
