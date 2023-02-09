import React, { useState } from "react";
import axios from "axios";
import MatchHistory from "./MatchHistory";

function Content() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [puuid, setPuuid] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const PROFILE_PIC =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/";

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    // clear data
    document.getElementById("error").style.display = "none";
    setData(null);
    setPuuid(null);

    axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputValue}?api_key=${API_KEY}`
      )
      .then((res) => {
        setData(res.data);
        setPuuid(res.data.puuid);
        console.log(res.data);
      })
      .catch((err) => {
        document.getElementById("error").style.display = "block";
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {data && (
        <div id="data">
          <p>name: {data.name}</p>
          <p>summoner level: {data.summonerLevel}</p>
          <img
            src={`${PROFILE_PIC}${data.profileIconId}.jpg`}
            width={"50px"}
            alt={"summoner profile"}
          ></img>
        </div>
      )}
      <div id="error" style={{ display: "none" }}>
        Summoner not found
      </div>
      <div>{puuid && <MatchHistory puuid={puuid} />}</div>
    </div>
  );
}

export default Content;
