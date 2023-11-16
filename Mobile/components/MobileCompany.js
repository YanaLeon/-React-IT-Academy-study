import React from 'react';

import MobileClient from './MobileClient';
import MobileClientEditAdd from './MobileClientEditAdd';
import {companyEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  state = {
    name: this.props.name,
    clients: this.props.clients,
    idEdit: null,
    add: false,
    filter: 0 // 0 - все клиенты, 1 - активные, 2 - заблокированные
  };

  componentDidMount = () => {
    companyEvents.addListener('EClentDelete',this.delete);
    companyEvents.addListener('EClentEdit',this.edit);
    companyEvents.addListener('EClentSave',this.change);
    companyEvents.addListener('EClentAdd',this.addClient);
    companyEvents.addListener('EClentCancelAddClient',this.cancel);
    companyEvents.addListener('EClentAll',this.allClients);
    companyEvents.addListener('EClentActive',this.active);
    companyEvents.addListener('EClentBlock',this.blocked);
  };

  componentWillUnmount = () => {
    companyEvents.removeListener('EClentDelete',this.delete);
    companyEvents.removeListener('EClentEdit',this.edit);
    companyEvents.removeListener('EClentSave',this.change);
    companyEvents.removeListener('EClentAdd',this.addClient);
    companyEvents.removeListener('EClentCancelAddClient',this.cancel);
    companyEvents.removeListener('EClentAll',this.allClients);
    companyEvents.removeListener('EClentActive',this.active);
    companyEvents.removeListener('EClentBlock',this.blocked);
  };
  
  delete = (id) => {
    let newClients = [...this.state.clients];
    newClients = newClients.filter(client => {
      let newClient = {...client};
      return newClient.id !== id;
    });
    this.setState({clients: newClients})
  };

  edit = (id) => {
    this.setState({idEdit: id})
  };

  change = (id, fam, im, otch, balance) => {
      let newClients = [...this.state.clients];
      newClients.forEach((client, index) => {
        if(client.id === id) {
          let newClient = {...client};
          newClient.fam = fam;
          newClient.im = im;
          newClient.otch = otch;
          newClient.balance = balance;
          newClient.status = balance>0?true:false;
          newClients[index] = newClient
        }
    });
    this.setState({clients: newClients, idEdit: null})
  };

  add = () => {
    this.setState({add: true})
  };

  addClient = (fam, im, otch, balance) => {
    let newClients = [...this.state.clients];
    newClients.push({id: newClients.length+1, fam, im, otch, balance, status: balance>0?true:false, edit: "Редактировать", delete: "Удалить"});
    this.setState({clients: newClients, add: false})
  };

  cancel = (cancelFlag) => {
    this.setState({add: cancelFlag, idEdit: null});
  };

  allFilter = () => {
    companyEvents.emit("EClentAll", true)
  };

  activFilter = () => {
    companyEvents.emit("EClentActive", true)
  };

  blockFilter = () => {
    companyEvents.emit("EClentBlock", true)
  };

  allClients = () => {
    this.setState({filter: 0})
  };

  active = () => {
    this.setState({filter: 1})
  };

  blocked = () => {
    this.setState({filter: 2})
  };

  render() {

    console.log("MobileCompany render");

    let filter = <div>
                  <input type = 'button' value = "Все" onClick={this.allFilter}/>
                  <input type = 'button' value = "Активные" onClick={this.activFilter}/>
                  <input type = 'button' value = "Заблокированные" onClick={this.blockFilter}/>
                </div>;

    let nameCode = this.state.name.map(element => {
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

    let filterClients = this.state.clients.filter(client => {
      if (this.state.filter === 0) {
        return client;
      } else if (this.state.filter === 1) {
        return client.balance > 0;
      } else if (this.state.filter === 2) {
        return client.balance <= 0;
      }
    });

    let clientCode = filterClients.map( client => {
      if (client.id === this.state.idEdit) {
        return (<MobileClientEditAdd key = {client.id}
          id = {client.id}
          info = {client}
          add = {this.state.add} />);
      } else {
        return (<MobileClient key = {client.id}
          id = {client.id}
          info = {client} />);
      }
      }
    );

    let add = <tr>
                <td>
                  <input type = 'button' value = "Добавить клиента" onClick={this.add}/>
                </td>
              </tr>;

    let newClientAdd = <MobileClientEditAdd 
        key = {this.state.clients.length+1}
        add = {this.state.add} />;

    return (
      <div>{filter}
        <table className='MobileCompany'>
          <tbody>{nameCode}{clientCode}{this.state.add?newClientAdd:null}{add}</tbody>
        </table>
        </div>
    )
    ;

  }

}

export default MobileCompany;


// начальное состояние
// стейт клиенты все
// нажата кнопка активные а - копия всех
//                        с - отфильтрованные
// нажата кнопка меняем если есть а - меняем в а и в с
// нажата кнопка блокированые 

// allClients = () => {
//   if (this.state.active) {
//     let copyClients = [...this.state.active];
//     this.setState({clients: copyClients, active: null});
//   }
// };
// 
// active = () => {
//   if (this.state.active) {
//     let copyClient = [...this.state.active];
//     copyClient = copyClient.filter(client => {
//       return client.balance > 0;
//     });
//     this.setState({clients: copyClient});
//     console.log(1, this.state.clients, this.state.active)
//   } else {
//     let copyClient = [...this.state.clients];
//     let copy = [...this.state.clients];
//     copyClient = copyClient.filter(client => {
//       return client.balance > 0;
//     });
//   this.setState({clients: copyClient, active: copy});
//   console.log(2, this.state.clients, this.state.active)
// }
// };
// 
// blocked = () => {
//   if (this.state.active) {
//     let copyClient = [...this.state.active];
//     copyClient = copyClient.filter(client => {
//       return client.balance <= 0;
//     });
//     this.setState({clients: copyClient});
//     console.log(3, this.state.clients, this.state.active)
//   } else {
//     let copyClient = [...this.state.clients];
//     let copy = [...this.state.clients];
//     copyClient = copyClient.filter(client => {
//     return client.balance <= 0;
//   });
//   this.setState({clients: copyClient, active: copy});
//   console.log(4, this.state.clients, this.state.active)
// }
// };