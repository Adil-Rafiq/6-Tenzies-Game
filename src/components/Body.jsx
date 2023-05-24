import React, { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import Confetti from "react-confetti";

export default function Body() {
  /* ---------------------- State ---------------------------- */
  const TILES = Array.from({ length: 10 }, (_, index) => index + 1);
  const [tiles, setTiles] = useState(
    TILES.map((id) => {
      return {
        key: id,
        id: id,
        number: Math.ceil(Math.random() * 9),
        isHeld: false,
      };
    })
  );
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const main = useRef();

  /* ---------------------- Side effects ---------------------------- */

  useEffect(() => {
    if (gameOver) return;
    setGameOver(isGameOver());
  }, [tiles]);

  /* -------------- State Control Functions ----------------- */

  const tileElements = tiles.map((tile) => (
    <Tile
      key={tile.key}
      id={tile.id}
      tileNumber={tile.number}
      isHeld={tile.isHeld}
      holdTile={holdTile}
    />
  ));

  function holdTile(event) {
    const id = event.target.id;
    const status = JSON.parse(event.target.getAttribute("data-isheld"));
    setTiles((prevTiles) => {
      return prevTiles.map((tile) =>
        tile.id == id ? { ...tile, isHeld: !status } : tile
      );
    });
  }

  function changeTilesNumbers(event) {
    if (gameOver) {
      resetGame();
      return;
    }

    buttonPressEffect(event);
    setScore((prevScore) => prevScore + 1);
    scoreTransition();
    setTiles((prevTiles) => {
      return prevTiles.map((tile) =>
        tile.isHeld ? tile : { ...tile, number: Math.ceil(Math.random() * 9) }
      );
    });
  }

  function isGameOver() {
    return tiles.every(
      (tile) => tile.number === tiles[0].number && tile.isHeld
    );
  }

  function resetGame() {
    setTiles(() =>
      TILES.map((id) => {
        return {
          key: id,
          id: id,
          number: Math.ceil(Math.random() * 9),
          isHeld: false,
        };
      })
    );

    setGameOver(false);
    setScore(0);
  }

  function buttonPressEffect(event) {
    event.target.classList.add("pressed");

    setTimeout(() => {
      event.target.classList.remove("pressed");
    }, 80);
  }

  function scoreTransition() {
    main.current.classList.add("show-after");
    setTimeout(function () {
      main.current.classList.remove("show-after");
    }, 200);
  }
  /* ----------------------- Markup ------------------------- */

  return (
    <>
      {gameOver && <Confetti />}
      <main ref={main} data={score}>
        {gameOver && <div className="score_card">Score {score}</div>}
        <div className="tiles" style={{ opacity: gameOver ? "0" : "1" }}>
          {tileElements}
        </div>
        <button className="bold" onClick={changeTilesNumbers}>
          {gameOver ? "Rest" : "Roll"}
        </button>
      </main>
    </>
  );
}
