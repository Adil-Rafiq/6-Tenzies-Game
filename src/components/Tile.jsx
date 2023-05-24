import React from "react";

export default function Tile({ id, tileNumber, isHeld, holdTile }) {
  return (
    <div
      className={isHeld ? "tile bold hold" : "tile bold"}
      id={id}
      data-isheld={isHeld}
      onClick={holdTile}
    >
      {tileNumber}
    </div>
  );
}
