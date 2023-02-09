import React, { useState, useEffect } from "react";
import { CHALLENGER_ICON } from './assets';
import { GRANDMASTER_ICON } from './assets';
import { MASTER_ICON } from './assets';
import { DIAMOND_ICON } from './assets';
import { PLATINUM_ICON } from './assets';
import { GOLD_ICON } from './assets';
import { SILVER_ICON } from './assets';
import { BRONZE_ICON } from './assets';
import { IRON_ICON } from './assets';

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

        let position1 = null;
        let position2 = null;

        for (let i = 0; i < data[0].metadata.participants.length; i++) {
          if (puuid === data[0].metadata.participants[i]) {
            position1 = i;
            break;
          }
        }

        for (let i = 0; i < data[1].metadata.participants.length; i++) {
          if (puuid === data[1].metadata.participants[i]) {
            position2 = i;
            break;
          }
        }

        console.log(position1);

        console.log(
          data[0].info.participants[position1].championName +
            " " +
            data[0].info.participants[position1].win
        );

        setMatches(data);
        setMatchHistory([
          {
            id: 0,
            champion: data[0].info.participants[position1].championName,
            win: data[0].info.participants[position1].win,
          },
          {
            id: 1,
            champion: data[1].info.participants[position2].championName,
            win: data[1].info.participants[position2].win,
          },
        ]);
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
  return (
    <div>
      <img className="player-rank" src={CHALLENGER_ICON} alt={'rank of the player'}></img>
      <ul>
        {matchHistory.map((match) => (
          <li key={match.id}>
            <p>Champion played: {match.champion}</p>
            <p style={{ color: match.win ? "green" : "red" }}>
              Result: {match.win ? "Win" : "Lose"}
            </p>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default MatchHistory;
