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
    visionScore,
    largestMultiKill,
    gameDuration,
    date,
  } = match;

  return (
    <li
      className="d-flex justify-content-between align-items-center match my-2"
      style={{ backgroundColor: win ? "#d2ebf5" : "#f7dddc" }}
    >
      <div className="px-2">
        <span className={win ? "text-info" : "text-danger"}>
          {win ? "Win" : "Lose"}
        </span>
        <br />
        <span className="small-font">{date}</span> <br />
        <span>{gameDuration}</span>
      </div>
      <div className="champion-container">
        <img
          className="champion-image"
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}
          alt={"champion"}
        ></img>
        <span className="badge bg-primary level-badge">
          <small>{level}</small>
        </span>
      </div>
      <div className="d-flex px-2">
        <div className="d-flex flex-column justify-content-center px-1">
          <img
            className="summoner-image"
            src={`./images/summoner/${summoner1Id}.png`}
            alt={"summoner1"}
          ></img>
          <img
            className="summoner-image"
            src={`./images/summoner/${summoner2Id}.png`}
            alt={"summoner2"}
          ></img>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <img
            className="perk-image"
            src={`./images/runes/${primaryPerk}.png`}
            alt={"perk1"}
          ></img>
          <img
            className="perk-image"
            src={`./images/runes/${secondaryPerk}.png`}
            alt={"perk2"}
          ></img>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center px-2">
        <span className="text-center">
          {kills}/<span className="text-danger">{deaths}</span>/{assists}
        </span>
        <span className="text-center text-primary">
          {kda && kda.toFixed(2)} <small className="small-font">KDA</small>
        </span>
        <span className="text-dark small-font text-center">
          {visionScore} Vision
        </span>
        {largestMultiKill > 4 ? (
          <span className="badge rounded-pill bg-danger">Penta kill</span>
        ) : largestMultiKill > 3 ? (
          <span className="badge rounded-pill bg-danger">Quadra kill</span>
        ) : largestMultiKill > 2 ? (
          <span className="badge rounded-pill bg-danger">Triple kill</span>
        ) : largestMultiKill > 1 ? (
          <span className="badge rounded-pill bg-danger">Double kill</span>
        ) : null}
      </div>
      <div className="d-flex justify-content-center flex-wrap items-container">
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
      </div>
    </li>
  );
};

export default Match;
