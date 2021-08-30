import Wallet from '@project-serum/sol-wallet-adapter';
import React,{FC ,useEffect , useState} from 'react';
import {render} from 'react-dom';
import Input from './Input';
import Messages from './messageList';
import {initWallet} from './walletConn';
import "./style.css";


interface IProps{

}
 
export const Popup: FC<IProps> = () => {

  const [textData, setTextData] = useState("");



  useEffect(() => {

    //to load video name
    var url ="";
    
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      url = tabs[0].url;
      fetch(`https://noembed.com/embed?dataType=json&url=${tabs[0].url}`)
      .then(res => res.json())
      .then(data =>   setTextData("Liked '"+data.title+"' !! Say Thanks by sending SOL-BUCKs")
      );
   }

     

)


   var content1 = document.querySelector(".content-1");
        content1.classList.add("activecontent-1");

  }, [])


    const accountValidate = () => {
        initWallet();
      };


      const homeView = () => {

        var content2 = document.querySelector(".content-2");
        content2.classList.remove("activecontent-2");

        var content1 = document.querySelector(".content-1");
        content1.classList.add("activecontent-1");


      };

      const mesageView = () => {

        var content1 = document.querySelector(".content-1");
        content1.classList.remove("activecontent-1");
        
        var content2 = document.querySelector(".content-2");
        content2.classList.add("activecontent-2");

      };

      const aboutView = () => {

        
       
      };
    

    return (
      <div className="wrapper">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <input type="radio" name="slider" id="transaction" checked />
      <input type="radio" name="slider" id="message" />
      <input type="radio" name="slider" id="about" />
      <div>
        <img src="sb_48.png"/>
        <header>Sol-Buck</header>
      </div>
      
      <div>
      <nav>
      {/* <label htmlFor="transaction" className="transaction"><i className="fa fa-bank"></i></label>
       <label htmlFor="message" className="message"><i className="fa fa-comment"></i></label>
       <label htmlFor="about" className="about"><i className="fa fa-info-circle"></i></label>
        <div className="slider"></div> */}
      <button className="btn" onClick= {homeView}><i className="fa fa-bank"></i></button>
      <button className="btn" onClick= {mesageView}><i className="fa fa-comment"></i></button>
      <button className="btn" onClick= {aboutView}><i className="fa fa-info-circle"></i></button>


     </nav>
     </div>
     <section>
       <div className="content content-1">
       
       <div className="send-button-xtream">
          <button className="validate-buttons" onClick={accountValidate}>
            Validate Wallet
          </button>
        </div>
       <div className="App">
          <div className="App-body">
            <p>{textData}</p>
            <Input />
         
          </div>
        </div>
       </div>
       <div className="content content-2">
         <div className="inside_box">
         <Messages  />
         </div>
       </div>
       <div className="content content-3">
         <div className="inside_box">
           <p>About Page</p>
         </div>
       </div>
     </section>

     <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
 
    </div>

    
      );
}

render(<Popup />, document.getElementById("popup"));