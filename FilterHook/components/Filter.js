import React, { useState } from 'react';

import ToolsBar from "./ToolsBar";
import BlockWithText from "./BlockWithText";

import "./Filter.css";

export default props => {

  const [words, setWords] = useState(props.words);
  const [copyWords, setCopyWords] = useState(null);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState("");

  function sortArray(check) {
    change(check, filter)
    setSort(check);
  }

  function filterArray(value) {
    change(sort, value)
    setFilter(value);
  }

  function change (check, value) {
    let newWordsArray;
    if(copyWords) {
      newWordsArray = [...copyWords];
    } else {
      newWordsArray = [...words];
    }
    if(check) {
      newWordsArray.sort();
      setCopyWords([...props.words]);
    }
    if(value) {
      newWordsArray = newWordsArray.filter(word => word.includes(value));
      setCopyWords([...props.words]);
    }
    setWords(newWordsArray)
  }
  function resetFilter () {
    setWords(props.words);
    setSort(false);
    setFilter("");
  }
  return (
    <div>
      {<ToolsBar sort = {sort}
                 filter = {filter}
                 cbSortArray ={sortArray} 
                 cbFilterArray = {filterArray}
                 cbResetFilter = {resetFilter}/>}
      {<BlockWithText words = {words}/>}
    </div>
  );
};
