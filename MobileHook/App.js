﻿import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let name = [ 
  {fam: "Фамилия", im: "Имя", otch: "Отчество", balance: "Баланс", status: "Статус", edit: "Редактировать", delete: "Удалить", id: 1}
];

let clientsArr=[ 
  {id: 1, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id: 2, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id: 3, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id: 4, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-220},
];

ReactDOM.render(
  <MobileCompany 
    name={name}
    clients={clientsArr}/>
  , document.getElementById('container') 
);

