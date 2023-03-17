import React, { useState, useEffect } from "react";
import Match from "./Match";

function MatchHistory({ puuid }) {
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostFreq, setMostFreq] = useState(null);
  const [avgKDA, setavgKDA] = useState(null);
  const [wrTen, setWrTen] = useState(null);

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

        // UTILS
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

        let positions = [];
        for (let j = 0; j < 10; j++) {
          // Loop over data[0] and data[1]
          let dataParticipants = data[j].metadata.participants;
          for (let i = 0; i < dataParticipants.length; i++) {
            if (puuid === dataParticipants[i]) {
              positions.push(i);
              break;
            }
          }
        }

        let champArr = [];

        for (let i = 0; i < 10; i++) {
          champArr.push(data[i].info.participants[positions[i]].championId);
        }

        setMostFreq(findMostFrequentString(champArr));

        const matchHistoryArr = [];

        const wrArr = data.map(
          (d) =>
            d.info.participants[
              positions[d.metadata.participants.indexOf(puuid)]
            ].win
        );

        const trueCount = wrArr.filter((win) => win).length;
        const falseCount = wrArr.filter((win) => !win).length;

        setWrTen({ win: trueCount, lose: falseCount });

        let avgKda = 0;

        for (let i = 0; i < data.length; i++) {
          const match = data[i].info.participants[positions[i]];

          const matchObject = {
            id: i,
            championId: match.championId,
            champion: match.championName,
            level: match.champLevel,
            win: match.win,
            date: formatDate(data[i].info.gameCreation),
            gameDuration: formatDuration(data[i].info.gameDuration),
            items: [
              match.item0,
              match.item1,
              match.item2,
              match.item3,
              match.item4,
              match.item5,
              match.item6,
            ],
            primaryPerk: match.perks.styles[0].style,
            secondaryPerk: match.perks.styles[1].style,
            summoner1Id: match.summoner1Id,
            summoner2Id: match.summoner2Id,
            gold: match.goldEarned,
            kda: match.challenges.kda,
            kills: match.kills,
            deaths: match.deaths,
            assists: match.assists,
            totalDamageDealtToChampions: match.totalDamageDealtToChampions,
            largestMultiKill: match.largestMultiKill,
            visionScore: match.visionScore,
          };

          avgKda += match.challenges.kda;
          matchHistoryArr.push(matchObject);
        }

        setMatchHistory(matchHistoryArr);

        setavgKDA((avgKda / 10).toFixed(2));
      }

      fetchMatches();

      setLoading(false);
    }
  }, [puuid]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div id="match-history">
      {wrTen && (
        <div id="last-ten" className="pb-5">
          <h4 className="text-center pb-3">Last 10 Games</h4>
          <div className="d-flex align-items-center justify-content-center">
            {" "}
            <img
              className="champion-image"
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${mostFreq}.png`}
              alt={"champion"}
            ></img>
            <div className="px-2">
              <span className="small-font">10G {wrTen && `${wrTen.win}W ${wrTen.lose}L`}</span>
              <br />
              <span className="small-font">
                {wrTen &&
                  `Win Rate ` +
                    parseInt((wrTen.win / (wrTen.lose + wrTen.win)) * 100) +
                    "%"}
              </span>
            </div>
            <div className="px-2">
              <span>{avgKDA} KDA</span>
            </div>
          </div>
        </div>
      )}
      <ul>
        {matchHistory &&
          matchHistory.map((match) => <Match key={match.id} match={match} />)}
      </ul>
    </div>
  );
}

export default MatchHistory;
