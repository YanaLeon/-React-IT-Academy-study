import React from 'react';
import ReactDOM from 'react-dom';

import BrBlock from './components/BrBlock';

let text="первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
  <BrBlock text={text}/>
  , document.getElementById('container') 
);

