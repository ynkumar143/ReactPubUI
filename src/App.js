import React, { Component } from 'react';
import './App.css';
import web3 from 'web3';
import _ from 'lodash';

var ETH_CLIENT = new web3(new web3.providers.HttpProvider("http://localhost:8545"));

var pubsubcontractabi = [{"constant":true,"inputs":[],"name":"getSubscriptionDetails","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"subscriptions","outputs":[{"name":"UserName","type":"bytes32"},{"name":"Topic","type":"bytes32"},{"name":"MailId","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_UserName","type":"bytes32"},{"name":"_Topic","type":"bytes32"},{"name":"_MailId","type":"bytes32"}],"name":"addSubscription","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

var pubsubcontractaddress = '0xe587252949897726657821c41af97a6d5c2f827a'

var pubsubcontract = ETH_CLIENT.eth.contract(pubsubcontractabi).at(pubsubcontractaddress)

ETH_CLIENT.eth.defaultAccount = ETH_CLIENT.eth.coinbase;

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            usernames: "",
            topics: "",
            mailids: "",

        }
      this.SubscribeUser = this.SubscribeUser.bind(this);
      this.retrieveData = this.retrieveData.bind(this);

    }

    componentWillMount(){
        var data = pubsubcontract.getSubscriptionDetails();
        this.setState({
                usernames: String(data[0]).split(','),
                topics: String(data[1]).split(','),
                mailids: String(data[2]).split(',')
            }
        )
    }

  SubscribeUser(){
    const transaction_id = pubsubcontract.addSubscription(this.refs.username_ref.value,this.refs.topic_ref.value,this.refs.urlname_ref.value);
    if (transaction_id){
      alert("Successfully added to Block, Blockchain Ref No:");
      alert(transaction_id);
    }else{
      alert("Transaction not added Successfully");
    }
    this.refs.username_ref.value = '';
    this.refs.topic_ref.value = '';
    this.refs.urlname_ref.value = '';
    this.retrieveData();
  }

  retrieveData(){
    var data = pubsubcontract.getSubscriptionDetails();
    this.setState({
            usernames: String(data[0]).split(','),
            topics: String(data[1]).split(','),
            mailids: String(data[2]).split(',')
        }
    )
  }
  render() {
      var TableRows = [];
      _.each(this.state.usernames,(value,index) => {
          TableRows.push(
            <tr>
            <td>{ETH_CLIENT.toAscii(this.state.usernames[index])}</td>
            <td>{ETH_CLIENT.toAscii(this.state.topics[index])}</td>
            <td>{ETH_CLIENT.toAscii(this.state.mailids[index])}</td>
            </tr>
          )
      })
    return (
       <div className="App-Context">
       <input type = "text" ref = "username_ref"/>
       <input type = "text" ref = "topic_ref"></input>
       <input type = "text" ref = "urlname_ref"></input>
       <button onClick = {this.SubscribeUser}>SUBSCRIBE</button>
       <table>
       <thead>
       <tr>
        <th className="eight wide">UserName</th>
        <th>Topic</th>
        <th>URLName</th>
       </tr>
       </thead>
       <tbody>
        {TableRows}
       </tbody>
       </table>
       <input type = "text" ref = "pub_topic_ref"/>
       <input type = "text" ref = "pub_msg_ref"></input>
       <button onClick = {this.submitData}>PUBLISH</button>
      </div>
    );
  }
}

export default App;
