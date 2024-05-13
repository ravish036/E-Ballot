import React, {useState, useEffect} from 'react';
// import './App.css';
import VoterComponent from './component/voter_component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminComponent from './component/admin_component';
import {connectWeb3Metamask} from './web3_functions'
import Main from './component/subcomponents/main'
import Winner from './component/winner';
// import './Main.css'

function App() {

  const [contractInstance, setContract] = useState(null)
  const [accounts, setAccounts] = useState()

  useEffect(()=>{ 
    async function connect(){
      try {
        let {accounts, instance} = await connectWeb3Metamask();
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        // -32002 error code means metamask is trying to take permission
        if(error.code != -32002){
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
        }
        console.log(error);
      }
    }
    setTimeout(connect, 1500);
  },[])

  return (
    <div className="App">
       { contractInstance == null ? 
        <>
          <h2 style={{textAlign: "center"}}> Loading Application </h2>
        </> :
        <>
        {/* <Main /> */}
          <BrowserRouter>
            <Routes>
              <Route index path='/' element={<Main />} />
              <Route path='/admin' element={<AdminComponent contractInstance={contractInstance} account={accounts[0]} />}/>
              <Route path="/voting" element={<VoterComponent  contractInstance={contractInstance} account={accounts[0]} />} />
              <Route path="/winner" element={<Winner  contractInstance={contractInstance} account={accounts[0]} />} />
              {/* <Route path='/winner' element={ <winner />} /> */}
            </Routes>
          </BrowserRouter>
        </>}
      
    </div>
  );
}

export default App;
