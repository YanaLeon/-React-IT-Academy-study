import React from 'react';

import "./BlockWithText.css";

export default props => {

  return (
    <div className = "wordsBlock">
      {props.words.map((word, index) => {
        return <p key={index} >{word}</p>
      })}
    </div>
  );
};