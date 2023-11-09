import React from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';

let text = "в студёную зимнюю";

import { withColorFrame } from './components/withColorFrame';

let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let DoubleButtonWithFrame = withColorFrame(colors)(DoubleButton)

ReactDOM.render(
<div>
  <DoubleButton caption1="однажды" caption2="пору" cbPressed={ num => alert(num) }>{text}</DoubleButton>
  <DoubleButtonWithFrame caption1="однажды" caption2="пору" cbPressed={ num => alert(num) }>{text}</DoubleButtonWithFrame>
</div>
  , document.getElementById('container') 
);

