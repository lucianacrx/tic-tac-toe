import React, { useState, useRef, useEffect } from "react";
import { Square } from "./Square";

export const Board = ({
	winner,
	setReset,
	setWinner,
}) => {
	const [turn, setTurn] = useState(0);
	const [boardStatus, setBoardStatus] = useState([
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
	]);
  
	const boardRef = useRef(null);

	const checkRow = () => {
		let result = false;
		for (let i = 0; i < 9; i += 3) {
			result |= 
				boardStatus[i] === boardStatus[i + 1] && 
				boardStatus[i] === boardStatus[i + 2] && 
				boardStatus[i] !== "";
		}
		return result;
	}

	const checkColumn = () => {
		let result = false;
		for (let i = 0; i < 3; i++) {
			result |= 
				boardStatus[i] === boardStatus[i + 3] && 
				boardStatus[i] === boardStatus[i + 6] && 
				boardStatus[i] !== "";
		}
		return result;
	}

	const checkDiagonal = () => {
		return (
			(boardStatus[0] === boardStatus[4] && boardStatus[0] === boardStatus[8] &&
			boardStatus[0] !== "") || 
			(boardStatus[2] === boardStatus[4] && boardStatus[2] === boardStatus[6] &&
				boardStatus[2] !== "")
		)
	}

	const verifyWin = () => {
		return checkRow() || checkColumn() || checkDiagonal();
	}

	const verifyTie = () => {
		let count = 0;
		boardStatus.forEach((square) => {
			if (square !== "") {
				count++;
			}
		});
		return count === 9;
	}

	useEffect(() => {
		// Clear state
		setBoardStatus(["", "", "", "", "", "", "", "", ""]);
		const cells = boardRef.current.children;

		for (let i = 0; i < 9; i++) {
			cells[i].innerText = "";
		}

		setTurn(0);
		setWinner("");
		setReset(false);
	}, [setWinner])

	const drawOnBoard = (e, index) => {
		if (boardStatus[index - 1] === "" && winner === "") {
			const current = turn === 0 ? "X" : "O";
			const newStatus = [...boardStatus];
			newStatus[index - 1] = current;
			setBoardStatus(newStatus);
			e.target.innerText = current;
			setTurn(turn === 0 ? 1 : 0);
		}
	}

	useEffect(() => {
			if (verifyWin()) {
			setWinner(
				turn === 0 ? "Winner: Player 2" : "Winner: Player 1"
			)
		} else if (verifyTie()) {
			setWinner("Tie");
		} 
	})

	return (
		<>
			<div ref={boardRef} className="board">
				<Square onClick={(e) => drawOnBoard(e, 1)} />
				<Square onClick={(e) => drawOnBoard(e, 2)} />
				<Square onClick={(e) => drawOnBoard(e, 3)} />

			
				<Square onClick={(e) => drawOnBoard(e, 4)} />
				<Square onClick={(e) => drawOnBoard(e, 5)} />
				<Square onClick={(e) => drawOnBoard(e, 6)} />
			
				<Square onClick={(e) => drawOnBoard(e, 7)} />
				<Square onClick={(e) => drawOnBoard(e, 8)} />
				<Square onClick={(e) => drawOnBoard(e, 9)} />
			</div>
		</>
	)
}