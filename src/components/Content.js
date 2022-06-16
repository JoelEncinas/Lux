import React from "react"

const API_KEY = 'RGAPI-7819e65a-6c8e-483c-bd8f-7da17490dbe5'
const SPACE = '%20'

function Content() {
    return (
        <main className="content">
            <h1 className="content__title">LolFinder</h1>
            <input className="search-player-input" type='text'></input>
            <button className="search-player-btn" onClick={userAction}>Search</button>
        </main>
    )
}

export default Content

/* api logic */

const userAction = async () => {
    let inputValue = document.getElementsByClassName('search-player-input').value;
    const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputValue}?api_key=${API_KEY}`);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    // pass info to another component and display data
  }
  