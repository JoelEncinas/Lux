import React, { useState, useEffect } from "react";
import axios from "axios";

function ChampionRotation() {
  const [data, setData] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const CHAMPIONS =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/";

  useEffect(() => {
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`
      )
      .then((res) => {
        setData(res.data);
        // insert data inside state as array
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {data && (
        // loop data from state and show ids
      )}
    </div>
  );
}

export default ChampionRotation;
