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

  const deleteClient = useCallback( 
    function deleteClient (id) {
    dispatch( clientDelete(id) );
  }, [] );

  const change = useCallback( 
    function change (id, fam, im, otch, balance) {
    dispatch(clientChange({id: id, fam: fam, im: im, otch: otch, balance: balance}))
    setIdEdit(null);
  }, [] );

  function addClient (fam, im, otch, balance) {
    dispatch(clientAdd({fam: fam, im: im, otch: otch, balance: balance}))
    setAdd(false);
  };

  const cancel = useCallback( 
    function cancel (cancelFlag) {
    setAdd(cancelFlag);
    setIdEdit(null);
  }, [] )
 
  console.log("MobileCompany render")
  let filterBlock = <div>
                      <input type = 'button' value = "Все" onClick={() => setFilter(0)}/> 
                      <input type = 'button' value = "Активные" onClick={() => setFilter(1)}/>
                      <input type = 'button' value = "Заблокированные" onClick={() => setFilter(2)}/>
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
  });

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
           cbChange = {change}
           cbCancel = {cancel} />);
       } else {
        return (<MobileClient key = {client.id}
          id = {client.id}
          info = {client}
          cbDelete = {deleteClient}
          cbEdit = {setIdEdit} />);
       }
      }
  );

  let addBlock = <tr>
              <td>
                <input type = 'button' value = "Добавить клиента" onClick={() => setAdd(true)}/>
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

