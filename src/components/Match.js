import React from "react";

const Match = ({ match }) => {
  const {
    win,
    championId,
    level,
    kills,
    deaths,
    assists,
    kda,
    summoner1Id,
    summoner2Id,
    primaryPerk,
    secondaryPerk,
    items,
    totalDamageDealtToChampions,
    gold,
    visionScore,
    largestMultiKill,
    gameDuration,
    date,
  } = match;

  return (
    <li style={{ backgroundColor: win ? "#d2ebf5" : "#f7dddc" }}>
      <img
        className="champion-image"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}
        alt={"champion"}
        width={"30px"}
      ></img>
      <p>Lv.{level}</p>
      <p>
        {kills} / <span className="text-danger">{deaths}</span> / {assists}
      </p>
      <p>KDA: {kda && kda.toFixed(2)}</p>
      <img
        className="summoner-image"
        src={`./images/summoner/${summoner1Id}.png`}
        alt={"summoner1"}
        width={"30px"}
      ></img>
      <img
        className="summoner-image"
        src={`./images/summoner/${summoner2Id}.png`}
        alt={"summoner2"}
        width={"30px"}
      ></img>
      <img
        className="perk-image"
        src={`./images/runes/${primaryPerk}.png`}
        alt={"perk1"}
        width={"30px"}
      ></img>
      <img
        className="perk-image"
        src={`./images/runes/${secondaryPerk}.png`}
        alt={"perk2"}
        width={"30px"}
      ></img>
      {items.map((item, index) => (
        <img
          key={index}
          className="item-image"
          src={`./images/items/${item}.png`}
          alt={"item"}
          width={"30px"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "./images/items/4403.png";
          }}
        ></img>
      ))}
      <p>Dmg: {totalDamageDealtToChampions}</p>
      <p className="text-warning">
        {gold} <span className="text-muted">gold</span>
      </p>
      <p>Vision score: {visionScore}</p>
      {largestMultiKill > 4 ? (
        <span className="badge rounded-pill bg-danger">Penta kill</span>
      ) : largestMultiKill > 3 ? (
        <span className="badge rounded-pill bg-danger">Quadra kill</span>
      ) : largestMultiKill > 2 ? (
        <span className="badge rounded-pill bg-danger">Triple kill</span>
      ) : largestMultiKill > 1 ? (
        <span className="badge rounded-pill bg-danger">Double kill</span>
      ) : null}
      <p>{gameDuration}</p>
      <small>{date}</small>
      <p>Result: {win ? "Win" : "Lose"}</p>
    </li>
  );
};

export default Match;
