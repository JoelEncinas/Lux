import React, { useState, useEffect } from "react";
import axios from "axios";
// import Loading from './Loading';

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

  // fake loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        console.log(data);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInput} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Content;
