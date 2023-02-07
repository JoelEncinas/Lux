import React, { useState, useEffect } from "react";
import axios from "axios";

function ChampionRotation() {
  const [data, setData] = useState(null);

  const CHAMPIONS =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/";
  // id.name => to get name of champion

  useEffect(() => {
    // avoid react warning by moving api key inside hook
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`
      )
      .then((res) => {
        let namesArr = [];

        res.data.freeChampionIds.forEach((id) => {
          fetch(CHAMPIONS + id + ".json")
            .then((response) => response.json())
            .then((data) => namesArr.push(data.name))
            .catch((err) => console.error(err));
        });

        setData(namesArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // empty array to avoid rerender everytime

  console.log(data);

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
