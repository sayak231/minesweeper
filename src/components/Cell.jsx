import React from "react";
import classnames from "classnames";

export default function Cell({ details, revealcell }) {
  const { x, y, revealed, value } = details;
  return (
    <div
      className={classnames({
        checked: revealed && value !== "💣",
        cell: true,
        bomb: value === "💣",
      })}
      onClick={() => revealcell(x, y)}
    >
      {revealed ? value : ""}
    </div>
  );
}
