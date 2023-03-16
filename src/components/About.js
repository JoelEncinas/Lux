function About() {
  return (
    <div id="about">
      <h1 className="text-center pb-5">About</h1>
      <h2 className="text-info">The Idea</h2>
      <p className="pb-5">
        I've always used pages like{" "}
        <a href="https://www.op.gg/" target="_blank">
          opgg
        </a>{" "}
        or{" "}
        <a href="https://u.gg/" target="_blank">
          ugg
        </a>{" "}
        to look up my league of legends profile, so I decided to practice my
        react skills and put together a page that has similar functionality.
      </p>
      <h2 className="text-info">Tech</h2>
      <p>
        The page uses the core functionality of{" "}
        <span className="text-success">React</span>. I've used{" "}
        <code>react-dom-router</code> too so the page isn't a spa. The data is
        pulled from the{" "}
        <a href="https://developer.riotgames.com/" target="_blank">
          riot api
        </a>{" "}
        using <span className="text-success">axios</span> and it uses a{" "}
        <span className="text-success">bootstrap</span> theme for the styling.
      </p>
    </div>
  );
}

export default About;
