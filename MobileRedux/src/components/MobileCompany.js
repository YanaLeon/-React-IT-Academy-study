import React, { useState, useCallback } from 'react';

import MobileClient from './MobileClient';
import MobileClientEditAdd from './MobileClientEditAdd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clientDelete, clientChange, clientAdd } from "../redux/clientsSlice.js";

import './MobileCompany.css';

export const MobileCompany = props => {

  const [idEdit, setIdEdit] = useState(null);
  const [add, setAdd] = useState(false);
  const [filter, setFilter] = useState(0); // 0 - все клиенты, 1 - активные, 2 - заблокированные

  const clients = useSelector( state => state.clients ); 
  const dispatch = useDispatch();

  function deleteClient (id) {
    dispatch( clientDelete(id) );
  };

  const memoizedDeleteClient = useCallback( deleteClient, [] );

  function edit (id) {
    setIdEdit(id);
  };

  const memoizedEdit = useCallback( edit, [] );

  function change (id, fam, im, otch, balance) {
    dispatch(clientChange({id: id, fam: fam, im: im, otch: otch, balance: balance}))
    setIdEdit(null);
  };

  const memoizedChange = useCallback( change, [] );

  function addCl () {
    setAdd(true);
  };

  function addClient (fam, im, otch, balance) {
    dispatch(clientAdd({fam: fam, im: im, otch: otch, balance: balance}))
    setAdd(false);
  };

  function cancel (cancelFlag) {
    setAdd(cancelFlag);
    setIdEdit(null);
  };

  const memoizedCancel = useCallback( cancel, [] )

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

     let filterClients = clients.clientsMobile.filter(client => {
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
           add = {add}
           cbChange = {memoizedChange}
           cbCancel = {memoizedCancel} />);
       } else {
        return (<MobileClient key = {client.id}
          id = {client.id}
          info = {client}
          cbDelete = {memoizedDeleteClient}
          cbEdit = {memoizedEdit} />);
       }
      }
    );

  let addBlock = <tr>
              <td>
                <input type = 'button' value = "Добавить клиента" onClick={addCl}/>
              </td>
            </tr>;

  let newClientAdd = <MobileClientEditAdd
      add = {add}
      cbCancel = {cancel}
      cbAddClient = {addClient} />;

    return (
      <div>{filterBlock}
        <table className='MobileCompany'>
          <tbody>{nameCode}{clientCode}{add?newClientAdd:null}{addBlock}</tbody>
        </table>
        </div>
    )
    ;

}

