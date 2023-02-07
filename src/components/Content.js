import React, { useState } from "react";
import axios from "axios";

function Content() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

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
        </div>
      )}
    </div>
  );
}

export default Content;
