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

        let position1 = null;
        let position2 = null;
        let position3 = null;
        let position4 = null;
        let position5 = null;
        let position6 = null;
        let position7 = null;
        let position8 = null;
        let position9 = null;
        let position10 = null;
        let position11 = null;
        let position12 = null;
        let position13 = null;
        let position14 = null;
        let position15 = null;

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

        for (let i = 0; i < data[2].metadata.participants.length; i++) {
          if (puuid === data[2].metadata.participants[i]) {
            position3 = i;
            break;
          }
        }

        for (let i = 0; i < data[3].metadata.participants.length; i++) {
          if (puuid === data[3].metadata.participants[i]) {
            position4 = i;
            break;
          }
        }

        for (let i = 0; i < data[4].metadata.participants.length; i++) {
          if (puuid === data[4].metadata.participants[i]) {
            position5 = i;
            break;
          }
        }

        for (let i = 0; i < data[5].metadata.participants.length; i++) {
          if (puuid === data[5].metadata.participants[i]) {
            position6 = i;
            break;
          }
        }

        for (let i = 0; i < data[6].metadata.participants.length; i++) {
          if (puuid === data[6].metadata.participants[i]) {
            position7 = i;
            break;
          }
        }

        for (let i = 0; i < data[7].metadata.participants.length; i++) {
          if (puuid === data[7].metadata.participants[i]) {
            position8 = i;
            break;
          }
        }

        for (let i = 0; i < data[8].metadata.participants.length; i++) {
          if (puuid === data[8].metadata.participants[i]) {
            position9 = i;
            break;
          }
        }

        for (let i = 0; i < data[9].metadata.participants.length; i++) {
          if (puuid === data[9].metadata.participants[i]) {
            position10 = i;
            break;
          }
        }


        console.log(
          data[0].info.participants[position1].championName +
            " " +
            data[0].info.participants[position1].win
        );

        function formatDate(ndate) {
          const date = new Date(ndate);
          const options = { day: "2-digit", month: "2-digit", year: "numeric" };
          return date.toLocaleDateString("en-GB", options);
        }

        function formatDuration(durationInSeconds) {
          let minutes = Math.floor(durationInSeconds / 60);
          let seconds = Math.floor(durationInSeconds % 60);
          return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
        }

        setMatches(data);
        setMatchHistory([
          {
            id: 0,
            champion: data[0].info.participants[position1].championName,
            win: data[0].info.participants[position1].win,
            date: formatDate(data[0].info.gameCreation),
            gameDuration: formatDuration(data[0].info.gameDuration),
          },
          {
            id: 1,
            champion: data[1].info.participants[position2].championName,
            win: data[1].info.participants[position2].win,
            date: formatDate(data[1].info.gameCreation),
            gameDuration: formatDuration(data[1].info.gameDuration),
          },
          {
            id: 2,
            champion: data[2].info.participants[position2].championName,
            win: data[2].info.participants[position2].win,
            date: formatDate(data[2].info.gameCreation),
            gameDuration: formatDuration(data[2].info.gameDuration),
          },
          {
            id: 3,
            champion: data[3].info.participants[position2].championName,
            win: data[3].info.participants[position2].win,
            date: formatDate(data[3].info.gameCreation),
            gameDuration: formatDuration(data[3].info.gameDuration),
          },
          {
            id: 4,
            champion: data[4].info.participants[position2].championName,
            win: data[4].info.participants[position2].win,
            date: formatDate(data[4].info.gameCreation),
            gameDuration: formatDuration(data[4].info.gameDuration),
          },
          {
            id: 5,
            champion: data[5].info.participants[position2].championName,
            win: data[5].info.participants[position2].win,
            date: formatDate(data[5].info.gameCreation),
            gameDuration: formatDuration(data[5].info.gameDuration),
          },
          {
            id: 6,
            champion: data[6].info.participants[position2].championName,
            win: data[6].info.participants[position2].win,
            date: formatDate(data[6].info.gameCreation),
            gameDuration: formatDuration(data[6].info.gameDuration),
          },
          {
            id: 7,
            champion: data[7].info.participants[position2].championName,
            win: data[7].info.participants[position2].win,
            date: formatDate(data[7].info.gameCreation),
            gameDuration: formatDuration(data[7].info.gameDuration),
          },
          {
            id: 8,
            champion: data[8].info.participants[position2].championName,
            win: data[8].info.participants[position2].win,
            date: formatDate(data[8].info.gameCreation),
            gameDuration: formatDuration(data[8].info.gameDuration),
          },
          {
            id: 9,
            champion: data[9].info.participants[position2].championName,
            win: data[9].info.participants[position2].win,
            date: formatDate(data[9].info.gameCreation),
            gameDuration: formatDuration(data[9].info.gameDuration),
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
    <div id="match-history">
      <ul>
        {matchHistory.map((match) => (
          <li style={{backgroundColor : match.win ? '#E0F2F1':'#FFCDD2'}} key={match.id}>
            <p>Champion played: {match.champion}</p>
            <p>{match.gameDuration}</p>
            <small>{match.date}</small>
            <p>
              Result: {match.win ? "Win" : "Lose"}
            </p>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default MatchHistory;
