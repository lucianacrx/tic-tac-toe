import React from "react";

export const Square = ({
	onClick,
}) => {
	return (
		<div className='square' onClick={onClick}></div>
	)
}