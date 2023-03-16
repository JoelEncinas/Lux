import React, { useState } from "react";
import axios from "axios";
import MatchHistory from "./MatchHistory";
import {
  CHALLENGER_ICON,
  GRANDMASTER_ICON,
  MASTER_ICON,
  DIAMOND_ICON,
  PLATINUM_ICON,
  GOLD_ICON,
  SILVER_ICON,
  BRONZE_ICON,
  IRON_ICON,
} from "../utils/assets";

function Content() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [puuid, setPuuid] = useState(null);
  const [rankData, setRankData] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const PROFILE_PIC =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/";

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // clear data
    document.getElementById("error").style.display = "none";
    setData(null);
    setPuuid(null);
    setRankData(null);

    axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputValue}?api_key=${API_KEY}`
      )
      .then((res) => {
        setData(res.data);
        setPuuid(res.data.puuid);

        axios
          .get(
            `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${res.data.id}?api_key=${API_KEY}`
          )
          .then((res) => {
            setRankData({
              tier: res.data[0].tier,
              rank: res.data[0].rank,
              leaguePoints: res.data[0].leaguePoints,
              wins: res.data[0].wins,
              losses: res.data[0].losses,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        document.getElementById("error").style.display = "block";
        console.log(err);
      });
  };

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleInput}
          id="summoner-name"
          placeholder="Enter summoner name"
        />
        <small id="summoner-name-euw" className="form-text text-muted">
          *EUW Only
        </small>
      </div>
      <button className="btn btn-success" onClick={handleSearch}>
        Search
      </button>

      {data && (
        <div id="data" className="bg-yellow">
          <p>name: {data.name}</p>
          <p>
            rank :{" "}
            {rankData
              ? `${rankData.tier} ${rankData.rank} ${rankData.leaguePoints} lp`
              : "Unranked"}{" "}
          </p>
          {rankData && rankData.tier === "CHALLENGER" && (
            <img
              className="player-rank"
              src={CHALLENGER_ICON}
              alt="Challenger Icon"
            />
          )}
          {rankData && rankData.tier === "GRANDMASTER" && (
            <img
              className="player-rank"
              src={GRANDMASTER_ICON}
              alt="Grandmaster Icon"
            />
          )}
          {rankData && rankData.tier === "MASTER" && (
            <img className="player-rank" src={MASTER_ICON} alt="Master Icon" />
          )}
          {rankData && rankData.tier === "DIAMOND" && (
            <img
              className="player-rank"
              src={DIAMOND_ICON}
              alt="Diamond Icon"
            />
          )}
          {rankData && rankData.tier === "PLATINUM" && (
            <img
              className="player-rank"
              src={PLATINUM_ICON}
              alt="Platinum Icon"
            />
          )}
          {rankData && rankData.tier === "GOLD" && (
            <img src={GOLD_ICON} alt="Gold Icon" />
          )}
          {rankData && rankData.tier === "SILVER" && (
            <img className="player-rank" src={SILVER_ICON} alt="Silver Icon" />
          )}
          {rankData && rankData.tier === "BRONZE" && (
            <img className="player-rank" src={BRONZE_ICON} alt="Bronze Icon" />
          )}
          {rankData && rankData.tier === "IRON" && (
            <img className="player-rank" src={IRON_ICON} alt="Iron Icon" />
          )}
          <p>
            {rankData &&
              `W${rankData.wins} L${rankData.losses} WinRate ` +
                parseInt(
                  (rankData.wins / (rankData.losses + rankData.wins)) * 100
                ) +
                "%"}
          </p>
          <p>summoner level: {data.summonerLevel}</p>
          <img
            src={`${PROFILE_PIC}${data.profileIconId}.jpg`}
            width={"50px"}
            alt={"summoner profile"}
          ></img>
        </div>
      )}
      <div id="error" className="text-danger" style={{ display: "none" }}>
        Oops! Summoner not found...
      </div>
      <div>{puuid && <MatchHistory puuid={puuid} />}</div>
    </div>
  );
}

export default Content;
