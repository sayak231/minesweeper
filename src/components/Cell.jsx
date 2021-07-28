import React from "react";
import classnames from "classnames";

export default function Cell({ details, revealcell }) {
  return (
    <div
      className={classnames({
        checked: details.revealed && details.value !== "💣",
        cell: true,
        bomb: details.value === "💣",
      })}
      onClick={() => {
        revealcell(details.x, details.y);
      }}
    >
      {details.revealed ? details.value : ""}
    </div>
  );
}
