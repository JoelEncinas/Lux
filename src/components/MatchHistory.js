import React, { useState, useEffect } from "react";
import { items } from "./items";

function MatchHistory({ puuid }) {
  const [matches, setMatches] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostFreq, setMostFreq] = useState(null);
  const [wrTen, setWrTen] = useState(null);
  const [itemsList, setItemsList] = useState(null);

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

        let champArr = [];
        champArr.push(data[0].info.participants[position1].championName);
        champArr.push(data[1].info.participants[position2].championName);
        champArr.push(data[2].info.participants[position3].championName);
        champArr.push(data[3].info.participants[position4].championName);
        champArr.push(data[4].info.participants[position5].championName);
        champArr.push(data[5].info.participants[position6].championName);
        champArr.push(data[6].info.participants[position7].championName);
        champArr.push(data[7].info.participants[position8].championName);
        champArr.push(data[8].info.participants[position9].championName);
        champArr.push(data[9].info.participants[position10].championName);

        function findMostFrequentString(arr) {
          let frequency = {};
          let maxCount = 0;
          let mostFrequent;
          for (let str of arr) {
            frequency[str] = frequency[str] ? frequency[str] + 1 : 1;
            if (frequency[str] > maxCount) {
              maxCount = frequency[str];
              mostFrequent = str;
            }
          }
          return mostFrequent;
        }

        setMostFreq(findMostFrequentString(champArr));

        let wrArr = [];
        wrArr.push(data[0].info.participants[position1].win);
        wrArr.push(data[1].info.participants[position2].win);
        wrArr.push(data[2].info.participants[position3].win);
        wrArr.push(data[3].info.participants[position4].win);
        wrArr.push(data[4].info.participants[position5].win);
        wrArr.push(data[5].info.participants[position6].win);
        wrArr.push(data[6].info.participants[position7].win);
        wrArr.push(data[7].info.participants[position8].win);
        wrArr.push(data[8].info.participants[position9].win);
        wrArr.push(data[9].info.participants[position10].win);

        let trueCount = 0;
        let falseCount = 0;

        for (let i = 0; i < wrArr.length; i++) {
          if (wrArr[i] === true) {
            trueCount++;
          } else {
            falseCount++;
          }
        }

        setWrTen({ win: trueCount, lose: falseCount });

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
            championId: data[0].info.participants[position1].championId,
            champion: data[0].info.participants[position1].championName,
            level: data[0].info.participants[position1].champLevel,
            win: data[0].info.participants[position1].win,
            date: formatDate(data[0].info.gameCreation),
            gameDuration: formatDuration(data[0].info.gameDuration),
            items: [
              data[0].info.participants[position1].item0,
              data[0].info.participants[position1].item1,
              data[0].info.participants[position1].item2,
              data[0].info.participants[position1].item3,
              data[0].info.participants[position1].item4,
              data[0].info.participants[position1].item5,
              data[0].info.participants[position1].item6,
            ],
            primaryPerk:
              data[0].info.participants[position1].perks.styles[0].selections
                .perk,
            secondaryPerk:
              data[0].info.participants[position1].perks.styles[1].style,
            summoner1Id: data[0].info.participants[position1].summoner1Id,
            summoner2Id: data[0].info.participants[position1].summoner2Id,
            gold: data[0].info.participants[position1].goldEarned,
            kda: data[0].info.participants[position1].challenges.kda,
            kills: data[0].info.participants[position1].kills,
            deaths: data[0].info.participants[position1].deaths,
            assists: data[0].info.participants[position1].assists,
            totalDamageDealtToChampions:
              data[0].info.participants[position1].totalDamageDealtToChampions,
            largestMultiKill:
              data[0].info.participants[position1].largestMultiKill,
            visionScore: data[0].info.participants[position1].visionScore,
          },
          {
            id: 1,
            championId: data[1].info.participants[position1].championId,
            champion: data[1].info.participants[position1].championName,
            level: data[1].info.participants[position1].champLevel,
            win: data[1].info.participants[position1].win,
            date: formatDate(data[1].info.gameCreation),
            gameDuration: formatDuration(data[1].info.gameDuration),
            items: [
              data[1].info.participants[position1].item0,
              data[1].info.participants[position1].item1,
              data[1].info.participants[position1].item2,
              data[1].info.participants[position1].item3,
              data[1].info.participants[position1].item4,
              data[1].info.participants[position1].item5,
              data[1].info.participants[position1].item6,
            ],
            primaryPerk:
              data[1].info.participants[position1].perks.styles[0].selections
                .perk,
            secondaryPerk:
              data[1].info.participants[position1].perks.styles[1].style,
            summoner1Id: data[1].info.participants[position1].summoner1Id,
            summoner2Id: data[1].info.participants[position1].summoner2Id,
            gold: data[1].info.participants[position1].goldEarned,
            kda: data[1].info.participants[position1].challenges.kda,
            kills: data[1].info.participants[position1].kills,
            deaths: data[1].info.participants[position1].deaths,
            assists: data[1].info.participants[position1].assists,
            totalDamageDealtToChampions:
              data[1].info.participants[position1].totalDamageDealtToChampions,
            largestMultiKill:
              data[1].info.participants[position1].largestMultiKill,
            visionScore: data[1].info.participants[position1].visionScore,
          },
          {
            id: 2,
            champion: data[2].info.participants[position3].championName,
            win: data[2].info.participants[position3].win,
            date: formatDate(data[2].info.gameCreation),
            gameDuration: formatDuration(data[2].info.gameDuration),
            items: [
              data[2].info.participants[position3].item0,
              data[2].info.participants[position3].item1,
              data[2].info.participants[position3].item2,
              data[2].info.participants[position3].item3,
              data[2].info.participants[position3].item4,
              data[2].info.participants[position3].item5,
              data[2].info.participants[position3].item6,
            ],
          },
          {
            id: 3,
            champion: data[3].info.participants[position4].championName,
            win: data[3].info.participants[position4].win,
            date: formatDate(data[3].info.gameCreation),
            gameDuration: formatDuration(data[3].info.gameDuration),
            items: [
              data[3].info.participants[position4].item0,
              data[3].info.participants[position4].item1,
              data[3].info.participants[position4].item2,
              data[3].info.participants[position4].item3,
              data[3].info.participants[position4].item4,
              data[3].info.participants[position4].item5,
              data[3].info.participants[position4].item6,
            ],
          },
          {
            id: 4,
            champion: data[4].info.participants[position5].championName,
            win: data[4].info.participants[position5].win,
            date: formatDate(data[4].info.gameCreation),
            gameDuration: formatDuration(data[4].info.gameDuration),
            items: [
              data[4].info.participants[position5].item0,
              data[4].info.participants[position5].item1,
              data[4].info.participants[position5].item2,
              data[4].info.participants[position5].item3,
              data[4].info.participants[position5].item4,
              data[4].info.participants[position5].item5,
              data[4].info.participants[position5].item6,
            ],
          },
          {
            id: 5,
            champion: data[5].info.participants[position6].championName,
            win: data[5].info.participants[position6].win,
            date: formatDate(data[5].info.gameCreation),
            gameDuration: formatDuration(data[5].info.gameDuration),
            items: [
              data[5].info.participants[position6].item0,
              data[5].info.participants[position6].item1,
              data[5].info.participants[position6].item2,
              data[5].info.participants[position6].item3,
              data[5].info.participants[position6].item4,
              data[5].info.participants[position6].item5,
              data[5].info.participants[position6].item6,
            ],
          },
          {
            id: 6,
            champion: data[6].info.participants[position7].championName,
            win: data[6].info.participants[position7].win,
            date: formatDate(data[6].info.gameCreation),
            gameDuration: formatDuration(data[6].info.gameDuration),
            items: [
              data[6].info.participants[position7].item0,
              data[6].info.participants[position7].item1,
              data[6].info.participants[position7].item2,
              data[6].info.participants[position7].item3,
              data[6].info.participants[position7].item4,
              data[6].info.participants[position7].item5,
              data[6].info.participants[position7].item6,
            ],
          },
          {
            id: 7,
            champion: data[7].info.participants[position8].championName,
            win: data[7].info.participants[position8].win,
            date: formatDate(data[7].info.gameCreation),
            gameDuration: formatDuration(data[7].info.gameDuration),
            items: [
              data[7].info.participants[position8].item0,
              data[7].info.participants[position8].item1,
              data[7].info.participants[position8].item2,
              data[7].info.participants[position8].item3,
              data[7].info.participants[position8].item4,
              data[7].info.participants[position8].item5,
              data[7].info.participants[position8].item6,
            ],
          },
          {
            id: 8,
            champion: data[8].info.participants[position9].championName,
            win: data[8].info.participants[position9].win,
            date: formatDate(data[8].info.gameCreation),
            gameDuration: formatDuration(data[8].info.gameDuration),
            items: [
              data[8].info.participants[position9].item0,
              data[8].info.participants[position9].item1,
              data[8].info.participants[position9].item2,
              data[8].info.participants[position9].item3,
              data[8].info.participants[position9].item4,
              data[8].info.participants[position9].item5,
              data[8].info.participants[position9].item6,
            ],
          },
          {
            id: 9,
            champion: data[9].info.participants[position10].championName,
            win: data[9].info.participants[position10].win,
            date: formatDate(data[9].info.gameCreation),
            gameDuration: formatDuration(data[9].info.gameDuration),
            items: [
              data[9].info.participants[position10].item0,
              data[9].info.participants[position10].item1,
              data[9].info.participants[position10].item2,
              data[9].info.participants[position10].item3,
              data[9].info.participants[position10].item4,
              data[9].info.participants[position10].item5,
              data[9].info.participants[position10].item6,
            ],
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
      {wrTen && (
        <div id="last-ten" className="gray">
          <p>Last 10 matches</p>
          <p>
            Most used champion: <strong>{mostFreq}</strong>
          </p>
          <p>
            {wrTen &&
              `W${wrTen.win} L${wrTen.lose} WinRate ` +
                parseInt((wrTen.win / (wrTen.lose + wrTen.win)) * 100) +
                "%"}
          </p>
        </div>
      )}
      <ul>
        {matchHistory.map((match) => (
          <li
            style={{ backgroundColor: match.win ? "#d2ebf5" : "#f7dddc" }}
            key={match.id}
          >
            <p>Champion played: {match.champion}</p>
            <p>KDA: {match.kda}</p>
            {match.items.map((item, index) => (
              <img
                key={index}
                className="item-image"
                src={`./images/items/${item}.png`}
                alt={"item"}
                width={"30px"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./images/items/1103.png";
                }}
              ></img>
            ))}
            <p>{match.gameDuration}</p>
            <small>{match.date}</small>
            <p>Result: {match.win ? "Win" : "Lose"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchHistory;
