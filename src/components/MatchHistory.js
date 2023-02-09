import React, { useState, useEffect } from "react";

function MatchHistory({ puuid }) {
  const [matches, setMatches] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (puuid) {
      setLoading(true);

      async function fetchMatches() {
        const response = await fetch(
          `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.REACT_APP_API_KEY}`
        );
        const matchIds = await response.json();

        const promises = matchIds
          .slice(0, 10)
          .map((matchId) =>
            fetch(
              `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`
            ).then((res) => res.json())
          );

        const data = await Promise.all(promises);

        console.log(data);
        const part = data[0].metadata.participants;

        let position = null;

        for (let i = 0; i < data[0].metadata.participants.length; i++) {
          if (puuid === data[0].metadata.participants[i]) {
            position = i;
            break;
          }
        }

        console.log(position);

        console.log(
          data[0].info.participants[position].championName +
            " " +
            data[0].info.participants[position].win
        );

        setMatches(data);
        setMatchHistory([{id: 1, champion: data[0].info.participants[position].championName, win: data[0].info.participants[position].win}])
      }

      // get array witch matches
      fetchMatches();

      // get champion and win/lose of each match

      setLoading(false);
    }
  }, [puuid]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <ul>
    {matchHistory.map((match) => (
        <li key={match.id}>
          <p>Champion played: {match.champion}</p>
          <p style={{color: match.win ? 'green': 'red'}}>Result: {match.win ? "Win" : "Lose"}</p>
        </li>
      ))}
  </ul>;
}

export default MatchHistory;
