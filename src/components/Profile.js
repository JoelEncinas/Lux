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

function Profile() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [puuid, setPuuid] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [hasError, setHasError] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const PROFILE_PIC =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/";

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    setHasError(false);
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
        setHasError(true);
        console.log(err);
      });
  };

  const rankIcons = {
    CHALLENGER: CHALLENGER_ICON,
    GRANDMASTER: GRANDMASTER_ICON,
    MASTER: MASTER_ICON,
    DIAMOND: DIAMOND_ICON,
    PLATINUM: PLATINUM_ICON,
    GOLD: GOLD_ICON,
    SILVER: SILVER_ICON,
    BRONZE: BRONZE_ICON,
    IRON: IRON_ICON,
  };

  return (
    <div>
      <div className="form-group d-flex flex-column align-items-center">
        <div className="d-flex">
          <input
            type="text"
            className={`form-control summoner-search ${
              hasError ? "is-invalid" : ""
            }`}
            value={inputValue}
            onChange={handleInput}
            id="summoner-name"
            placeholder="Enter summoner name"
          />
          <button className="btn btn-success" onClick={handleSearch}>
            Search
          </button>
        </div>
        <small id="summoner-name-euw" className="form-text text-muted p-2">
          *EUW Only
        </small>
      </div>

      {data && (
        <div id="data" className="my-5">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <img
              className="profile-pic mx-2"
              src={`${PROFILE_PIC}${data.profileIconId}.jpg`}
              width={"50px"}
              alt={"summoner profile"}
            ></img>
            <div>
              <p className="h2 m-0">{data.name}</p>
              <p className="h5 text-muted m-0">{data.summonerLevel}</p>
            </div>
          </div>

          {rankData && rankData.tier in rankIcons && (
            <img
              className="player-rank"
              src={rankIcons[rankData.tier]}
              alt={`${rankData.tier} Icon`}
            />
          )}
          <p>
            rank :{" "}
            {rankData
              ? `${rankData.tier} ${rankData.rank} ${rankData.leaguePoints} lp`
              : "Unranked"}{" "}
          </p>

          <p>
            {rankData &&
              `W${rankData.wins} L${rankData.losses} WinRate ` +
                parseInt(
                  (rankData.wins / (rankData.losses + rankData.wins)) * 100
                ) +
                "%"}
          </p>
        </div>
      )}
      <div
        id="error"
        className="text-danger text-center p-5"
        style={{ display: "none" }}
      >
        Oops! Summoner not found...
      </div>
      <div>{puuid && <MatchHistory puuid={puuid} />}</div>
    </div>
  );
}

export default Profile;
