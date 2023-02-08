import React, { useState, useEffect } from "react";
import axios from "axios";

function ChampionRotation() {
  const [championData, setChampionData] = useState(null);
  const [filter, setFilter] = useState(null);

  // id.name => get name of champion
  const CHAMPIONS =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/";

  // id.png => get image of champion
  const CHAMPION_ICONS =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/";

  const CHAMPION_INFO = "https://www.leagueoflegends.com/es-es/champions/";

  const getChampionNames = async (freeChampionIds) => {
    const championData = [];
    for (const id of freeChampionIds) {
      const response = await fetch(CHAMPIONS + id + ".json");
      const data = await response.json();
      console.log(data);
      championData.push({
        id: id,
        name: data.name,
        damageType: data.tacticalInfo.damageType,
      });
    }

    return championData;
  };

  useEffect(() => {
    // avoid react warning by moving api key inside hook
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`
      )
      .then(async (res) => {
        const data = await getChampionNames(res.data.freeChampionIds);
        setChampionData(data);
      })
      .catch((err) => {
        console.error("API request error: ", err);
      });
  }, []);

  const handleFilter = (damageType) => {
    setFilter(damageType);
  };

  return (
    <div>
      <h3>Free weekly rotation</h3>
      <div>
        <button onClick={() => handleFilter(null)}>All</button>
        <button onClick={() => handleFilter("kPhysical")}>Physical</button>
        <button onClick={() => handleFilter("kMagic")}>Magical</button>
        <button onClick={() => handleFilter("kMixed")}>Mixed</button>
      </div>
      {championData === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          {championData
            .filter((champion) => !filter || champion.damageType === filter)
            .map((champion) => (
              <a
                href={CHAMPION_INFO + champion.name}
                target={"_blank"}
                rel={"noreferrer"}
              >
                <img
                  src={CHAMPION_ICONS + champion.id + ".png"}
                  alt="portrait of the champion"
                  width={"50px"}
                />
              </a>
            ))}
        </div>
      )}
    </div>
  );
}

export default ChampionRotation;
