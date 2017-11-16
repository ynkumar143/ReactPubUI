import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var peoplecontractabi = [{"constant":true,"inputs":[],"name":"getSubscriptionDetails","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"subscriptions","outputs":[{"name":"UserName","type":"bytes32"},{"name":"Topic","type":"bytes32"},{"name":"MailId","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_UserName","type":"bytes32"},{"name":"_Topic","type":"bytes32"},{"name":"_MailId","type":"bytes32"}],"name":"addSubscription","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
var peoplecontractaddress = '0x8d6ee67b53935707a94586766e4503db03959d13'

var peoplecontract = ETHEREUM_CLIENT.eth.contract(peoplecontractabi).at(peoplecontractaddress)

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            usernames: "",
            topics: "",
            mailids: ""
        }
    }

    componentWillMount(){
        var data = peoplecontract.getSubscriptionDetails();
        this.setState({
                usernames: String(data[0]),
                topics: String(data[1]),
                mailids: String(data[2])
            }
        )
        console.log(ETHEREUM_CLIENT)
    }
  render() {
    return (
       <div className="App-Context">
        <pre>(ETHEREUM_CLIENT.toAscii(this.state.usernames[index])) </pre>
        <pre>{this.state.topics}</pre>
        <pre>{this.state.mailids}</pre>
      </div>
    );
  }
}

export default App;
