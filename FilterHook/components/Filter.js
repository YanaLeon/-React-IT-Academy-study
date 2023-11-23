import React, { useState, useEffect } from 'react';

import ToolsBar from "./ToolsBar";
import BlockWithText from "./BlockWithText";

export default props => {

  const [words, setWords] = useState(props.words);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(
    ()=>{
      let newWordsArray = [...props.words];
      if(sort) {
        newWordsArray.sort();
      }
      if(filter) {
        newWordsArray = newWordsArray.filter(word => word.includes(filter));
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
