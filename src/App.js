import React from "react"
import Navbar from "./components/Navbar"
import Content from "./components/Content"
import Footer from "./components/Footer"

const APIkey = 'RGAPI-7819e65a-6c8e-483c-bd8f-7da17490dbe5';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
