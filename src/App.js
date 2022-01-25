// import logo from './logo.svg';
import "./App.css";
import { KeyboardArrowDown } from "@material-ui/icons";
import { useState, useContext } from "react";

import {AppContext} from './context/appContext'

function App() {

  
  
  const {from, setFrom, to, setTo, wallets, input, setInput, result, setResult, balance} = useContext(AppContext)

  
  const convert = () => {
    let ans
    if(parseInt(input.source) <= balance){
      if (from.code == 'USD'){
        ans = parseInt(input.source) / 0.002
      } else{
        ans = parseInt(input.source) * 0.002
      }
      setResult(ans)
    }
    else{
      alert('')
    }
    console.log(input)
  }

  return (
    <div className="App">
      <div className="container">
      <p className="main-title">Convert from one to another currency</p>
      <div className="main">
        <div className="col">
          <RenderCustomSelect type="source" />
          <RenderCustomSelect />


          <button className="convert" onClick={convert}>Convert</button>
        </div>
        <div className="col blue-bg">
          <div className="content">
            <p className="">You're converting : {from == 'USD' ? 'N' : 'USD'}{input.source}</p>
            <p className="">You'll get : N{result ? result : null}</p>
            <p className="">Source: {to.name}</p>
            <p className="">Destination: {from.name}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}


const RenderCustomSelect = ({type}) => {
  const [showList, setShowList] = useState(false);

  const {from, setFrom, to, setTo, wallets, input, setInput} = useContext(AppContext)

  const handleSelection = (wallet) => {
    if(type == 'source'){
      setFrom(wallet)
      setTo('')
    }else{
      setTo(wallet)
    }
    setShowList(false)
  }

  const handleChange =(e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value
    });
}
  

  return (
    <>
      <div className="select-container">
        <div className="choice">
          <p className="">{ type == 'source' ? 'Convert from ' +  from !== null && from.name : 'Convert to ' + to !== null && to.name }</p>
          <KeyboardArrowDown onClick={() => setShowList(!showList)} />
        </div>
        <div className="balance">
          <p className="title">Balance</p>
          <h2 className="amount">{type == "source" ? "N699,995" : "0"}</h2>
        </div>
        {
          showList && (<div className="list">
          <ul>
            {wallets.filter(item => item.code != from.name).map((wallet) => (
              <li onClick={() => handleSelection(wallet)} >{wallet.name}</li>
            ))}
          </ul>
        </div>)
        }
        
      </div>

      <input type="number" value={type=='source' ? input.source : input.destination} onChange={(e) => handleChange(e)} name={type == 'source' ? 'source' : 'destination'} className="convertion-input" />
    </>
  );
};

export default App;
