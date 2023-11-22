import React, { useState, useEffect } from 'react';

import ToolsBar from "./ToolsBar";
import BlockWithText from "./BlockWithText";

export default props => {

  const [words, setWords] = useState(props.words);
  const [copyWords, setCopyWords] = useState(null);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(
    ()=>{
      let newWordsArray;
      if(copyWords) {
        newWordsArray = [...copyWords];
      } else {
        newWordsArray = [...words];
      }
      if(sort) {
        newWordsArray.sort();
        setCopyWords([...props.words]);
      }
      if(filter) {
        newWordsArray = newWordsArray.filter(word => word.includes(filter));
        setCopyWords([...props.words]);
      }
      setWords(newWordsArray)
    },
    [sort, filter]
  );

  function sortArray(check) {
    setSort(check);
  }

  function filterArray(value) {
    setFilter(value);
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
