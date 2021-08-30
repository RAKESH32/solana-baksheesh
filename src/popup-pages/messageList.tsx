import  { useState, useEffect } from "react";
import { reportGreetings } from "./walletConn";

const getLocalItmes = () => {
    
    let list = localStorage.getItem('msgList');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('msgList') || '[]');
    } else {
        return [];
    }
}

function Messages() {
    
    const [message, setMessage] = useState("");
    //const [messageList[] , setMessageList] = useState(getLocalItmes());
    var messageList = new Array(); 
    messageList = getLocalItmes();
    const onClickShowMessages = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => { 
        e.preventDefault();
        var checkStr = await reportGreetings();
        var resp = checkStr.split(":");
        setMessage(resp[0]);
        await onClickAddDiv();

        };


     

            const onClickAddDiv = async () => { 

                var output = document.getElementById('output') || null;
                var messages =  JSON.parse(localStorage.getItem('msgList'));

                var elems = document.querySelectorAll(".message-blue");
                elems.forEach(function(element) {
                  element.parentNode.removeChild(element);
                });

                
                for(var i=0; i < messages.length;i++ )
                {

                  if(messages[i] != ""){
                   
                        // var ele = document.createElement("div");
                        // ele.setAttribute("class","inner");
                        // ele.innerHTML=messages[i];
                        // output.appendChild(ele);
                      var blue_cont = document.createElement("div");
                      blue_cont.setAttribute("class","message-blue");
                      blue_cont.innerHTML=messages[i];
                      output.appendChild(blue_cont);


                  }
                }

                };

    useEffect(() => {

        
        messageList.push(message);
        localStorage.setItem('msgList', JSON.stringify(messageList));


    }, [message])

    return (
      <div className="out">
          {/* <h2>Messgae is {message}</h2> */}
          <div className="msg_container"  id="output">



          </div>
          <button className="send-buttons" onClick={onClickShowMessages}>
            Show Messages
          </button>
      </div>
    );
  }

export default Messages;
