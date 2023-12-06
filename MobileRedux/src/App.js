import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/clients.js'

import { MobileCompany } from './components/MobileCompany.js';

let name = [ 
    {fam: "Фамилия", im: "Имя", otch: "Отчество", balance: "Баланс", status: "Статус", edit: "Редактировать", delete: "Удалить", id: 1}
  ];

export const App = () => (
    <Provider store={store}>
        <MobileCompany name={name}/>
    </Provider>
);
