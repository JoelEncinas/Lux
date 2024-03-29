function About() {
  return (
    <div id="about">
      <h1 className="text-center pb-5">About</h1>
      <h2 className="text-info">The Idea</h2>
      <p className="pb-5">
        I've always used pages like{" "}
        <a href="https://www.op.gg/" target="_blank" rel="noreferrer">
          opgg
        </a>{" "}
        or{" "}
        <a href="https://u.gg/" target="_blank" rel="noreferrer">
          ugg
        </a>{" "}
        to look up my league of legends profile, so I decided to practice my
        react skills and put together a page that has similar functionality.
      </p>
      <h2 className="text-info">Tech</h2>
      <p>
        The page uses the core functionality of{" "}
        <span className="text-success">React</span> like conditional rendering
        or passing props to children components. It also implements hooks like{" "}
        <code>useState</code> and <code>useEffect</code>. I've used{" "}
        <code>react-router-dom</code> too so the page isn't a spa. The data is
        pulled from the{" "}
        <a
          href="https://developer.riotgames.com/"
          target="_blank"
          rel="noreferrer"
        >
          riot api
        </a>{" "}
        using <span className="text-success">axios</span> and some of the assets
        are scraped using <span className="text-success">python</span> from the
        riot cdn. It uses a <span className="text-success">bootstrap</span>{" "}
        theme for the styling.
      </p>
    </div>
  );
}

export default About;
