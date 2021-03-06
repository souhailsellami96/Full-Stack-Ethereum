import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Token from './artifacts/contracts/Token.sol/SSToken.json'

const tokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

function App() {

  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

 

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <div className="App-header">
      <div> SEND </div>

          <div className='box'>
            <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
            <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
            <button onClick={sendCoins}>Send Coins</button>
            {/*            <button onClick={getBalance}>Get Balance</button>*/ }
            </div>
      </div>
    </div>
  );
}

export default App;

