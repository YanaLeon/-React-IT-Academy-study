import React, { useState, useEffect } from 'react';

import MobileClient from './MobileClient';
import MobileClientEditAdd from './MobileClientEditAdd';
import {companyEvents} from './events';

import './MobileCompany.css';

const MobileCompany = props => {

  const [clients, setClients] = useState(props.clients);
  const [idEdit, setIdEdit] = useState(null);
  const [add, setAdd] = useState(false);
  const [filter, setFilter] = useState(0); // 0 - все клиенты, 1 - активные, 2 - заблокированные
  
  useEffect(
    ()=>{
      companyEvents.addListener('EClentDelete', deleteClient);
      companyEvents.addListener('EClentEdit', edit);
      companyEvents.addListener('EClentSave', change);
      companyEvents.addListener('EClentAdd', addClient);
      companyEvents.addListener('EClentCancelAddClient', cancel);
      return ()=>{
        companyEvents.removeListener('EClentDelete', deleteClient);
        companyEvents.removeListener('EClentEdit', edit);
        companyEvents.removeListener('EClentSave', change);
        companyEvents.removeListener('EClentAdd', addClient);
        companyEvents.removeListener('EClentCancelAddClient', cancel);
      };
    },
    [clients]
  );

  function deleteClient (id) {
    let newClients = clients.filter(client => {
      return client.id !== id;
    });
    setClients(newClients);
  };
 
   function edit (id) {
     setIdEdit(id);
   };
 
   function change (id, fam, im, otch, balance) {
     let newClients = [...clients];
     newClients.forEach((client, index) => {
       if(client.id === id) {
         let newClient = {...client};
           newClient.fam = fam;
           newClient.im = im;
           newClient.otch = otch;
           newClient.balance = balance;
           newClients[index] = newClient
       }
     });
     setClients(newClients);
     setIdEdit(null);
   };
 
   function addCl () {
     setAdd(true);
   };
 
   function addClient (fam, im, otch, balance) {
     let newClients = [...clients];
     newClients.push({id: Math.random(), fam, im, otch, balance});
     setClients(newClients);
     setAdd(false);
   };
 
   function cancel (cancelFlag) {
     setAdd(cancelFlag);
     setIdEdit(null);
   };
 
   function allClients () {
     setFilter(0);
   };
 
   function active () {
     setFilter(1);
   };
 
   function blocked () {
     setFilter(2);
   };
 
    console.log("MobileCompany render")
    let filterBlock = <div>
                  <input type = 'button' value = "Все" onClick={allClients}/> 
                  <input type = 'button' value = "Активные" onClick={active}/>
                  <input type = 'button' value = "Заблокированные" onClick={blocked}/>
                </div>;

    let nameCode = props.name.map(element => {
      return (
        <tr key={element.id}>
              <td className='MobileClient'>{element.fam}</td>
              <td className='MobileClient'>{element.im}</td>
              <td className='MobileClient'>{element.otch}</td>
              <td className='MobileClient'>{element.balance}</td>
              <td className='MobileClient'>{element.status}</td>
              <td className='MobileClient'>{element.edit}</td>
              <td className='MobileClient'>{element.delete}</td>
          </tr>
      )
    })

    let filterClients = clients.filter(client => {
      if (filter === 0) {
        return client;
      } else if (filter === 1) {
        return client.balance > 0;
      } else if (filter === 2) {
        return client.balance <= 0;
      }
    });

    let clientCode = filterClients.map( client => {
       if (client.id === idEdit) {
         return (<MobileClientEditAdd key = {client.id}
           id = {client.id}
           info = {client}
           add = {add} />);
       } else {
        return (<MobileClient key = {client.id}
          id = {client.id}
          info = {client} />);
       }
      }
    );

  let addBlock = <tr>
              <td>
                <input type = 'button' value = "Добавить клиента" onClick={addCl}/>
              </td>
            </tr>;

  let newClientAdd = <MobileClientEditAdd
      add = {add} />;

    return (
      <div>{filterBlock}
        <table className='MobileCompany'>
          <tbody>{nameCode}{clientCode}{add?newClientAdd:null}{addBlock}</tbody>
        </table>
        </div>
    )
    ;

}

export default MobileCompany;
