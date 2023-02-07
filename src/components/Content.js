import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
// const SPACE = "%20";

function Content() {
//https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/tpa%20mistake?api_key=${API_KEY}

  return (
    <main>
      <input type="text"></input>
      <button>Search</button>
    </main>
  );
}

export default Content;
