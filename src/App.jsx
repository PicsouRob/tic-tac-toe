import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [firstPlayer, setfirstPlayer] = useState(0);
  const [secondPlayer, setSecondPlayer] = useState(0);
  const [turn, setTurn] = useState("x");

  const checkWinner = (squares) => {
    let combos = {
      accros: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((element) => {
        if (
          squares[element[0]] === "" ||
          squares[element[1]] === "" ||
          squares[element[2]] === ""
        ) {
          console.log("play", squares[element[0]]);
        } else if (
          squares[element[0]] === squares[element[1]] &&
          squares[element[1]] === squares[element[2]]
        ) {
          setWinner(squares[element[0]]);
          setTurn(squares[element[0]]);
          if (squares[element[0]] === "x") {
            setfirstPlayer((score) => score + 1);
          } else {
            setSecondPlayer((score) => score + 1);
          }
        } else {
          setCells(Array(9).fill(""));
        }
      });
    }
  };

  const handleClick = (num) => {
    console.log(cells[9]);
    if (cells[num] !== "") {
      alert("Already clicked");
      return;
    }

    let squares = [...cells];

    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }

    checkWinner(squares);
    setCells(squares);
  };

  const restart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ num }) => {
    return (
      <td
        className={`${
          cells[num] === "x" ? "text-red-600" : "text-gray-900"
        } h-[100px] w-[100px] border-2 border-gray-700 bg-white`}
        onClick={() => handleClick(num)}
      >
        {cells[num] && (
          <div className="text-center">
            <motion.p
              className="p-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {cells[num]}
            </motion.p>
          </div>
        )}
      </td>
    );
  };

  const eventCancle = (event) => {
    if (event.target.classList.contains("cancle")) {
      restart();
    }
  };

  return (
    <div className="mx-auto grid min-h-screen place-items-center bg-[#073b4c] text-4xl">
      <div className="flex items-center justify-center">
        <div className="h-full py-4 px-6">
          <div className="mb-10">
            <h1 className="text-center font-bold text-white">
              Pic Tic Tac Toe
            </h1>
          </div>
          <div className="relative flex items-center justify-between pb-6 text-xl text-white">
            <div className="flex gap-x-3">
              <p className="">X: </p>
              <p className="">{firstPlayer}</p>
            </div>
            <div className="flex gap-x-3">
              <p className="">O: </p>
              <p className="">{secondPlayer}</p>
            </div>
          </div>
          <table className="mx-auto">
            <tbody>
              <tr>
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
              </tr>
              <tr>
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
              </tr>
              <tr>
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
              </tr>
            </tbody>
          </table>
          <div className="grid w-full  place-items-center pt-6">
            <div className="cursor-pointer rounded-full bg-red-50 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => restart()}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
          {winner && (
            <div
              className="cancle absolute inset-0 z-10 grid place-items-center gap-y-5 bg-[rgba(0,0,0,0.3)] py-4"
              onClick={(e) => eventCancle(e)}
            >
              <motion.div
                className="grid max-w-screen-md gap-y-6 rounded-lg bg-white px-12 py-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <div className="flex items-center gap-x-3 text-center">
                  <p className="">Winner: </p>
                  <p className="font-bold">{winner}</p>
                </div>
                <button
                  className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-bold text-white md:text-base"
                  onClick={() => restart()}
                >
                  Replay again
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
