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
      // console.log(data);
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
        <button onClick={() => handleFilter(null)}><img src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/096_eye_of_the_observer.png"} width={'20px'} alt={'all damage'}></img> All</button>
        <button onClick={() => handleFilter("kPhysical")}><img src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3071_fighter_t3_blackcleaver.png"} width={'20px'} alt={'physical damage'}></img> Physical</button>
        <button onClick={() => handleFilter("kMagic")}><img src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3089_mage_t3_deathcap.png"} width={'20px'} alt={'magic damage'}></img> Magical</button>
        <button onClick={() => handleFilter("kMixed")}><img src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3100_mage_t3_lichbane.png"} width={'20px'} alt={'mixed damage'}></img> Mixed</button>
      </div>
      {championData === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          {championData
            .filter((champion) => !filter || champion.damageType === filter)
            .map((champion) => (
              <a key={champion.name}
                href={CHAMPION_INFO + champion.name.replace(/[\s']+/g, '-')}
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
