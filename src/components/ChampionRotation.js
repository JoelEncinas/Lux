import React, { useState, useEffect } from "react";
import axios from "axios";

function ChampionRotation() {
  const [data, setData] = useState(null);

  const CHAMPIONS =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/";
  // id.name => to get name of champion

  const getChampionNames = async (freeChampionIds) => {
    const namesArr = [];
    for (const id of freeChampionIds) {
      const response = await fetch(CHAMPIONS + id + ".json");
      const data = await response.json();
      namesArr.push(data.name);
    }
    return namesArr;
  };

  useEffect(() => {
    // avoid react warning by moving api key inside hook
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`
      )
      .then(async (res) => {
        const namesArr = await getChampionNames(res.data.freeChampionIds);
        setData(namesArr);
      })
      .catch((err) => {
        console.error("API request error: ", err);
      });
  }, []);

  return (
    <div>
      <h3>Free weekly rotation</h3>
      {data === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChampionRotation;
