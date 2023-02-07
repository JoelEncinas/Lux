import React, { useState } from "react";
import axios from "axios";

function Content() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const PROFILE_PIC = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/';

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputValue}?api_key=${API_KEY}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {data && (
        <div>
          <p>name: {data.name}</p>
          <p>summoner level: {data.summonerLevel}</p>
          <img src={`${PROFILE_PIC}${data.profileIconId}.jpg`} width={'50px'}></img>
        </div>
      )}
    </div>
  );
}

export default Content;
