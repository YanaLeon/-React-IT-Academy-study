import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';

let wordsArray = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

ReactDOM.render(
  <Filter words = {wordsArray} />
  , document.getElementById('container') 
);

