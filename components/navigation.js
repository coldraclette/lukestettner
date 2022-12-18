export const Navigation = ({ backgroundColor }) => {
  return (
    <nav id="top" style={{ backgroundColor: backgroundColor }}>
      <div className="topleft">
        <h1>luke stettner</h1>
      </div>

      {/* mobile nav */}
      <div className="topright">index</div>
    </nav>
  );
};
