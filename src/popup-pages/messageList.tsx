import  { useState, useEffect } from "react";


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
        setMessage("hi");

        };


        const onClickAddMessages = async (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => { 
            e.preventDefault();
            setMessage("hello");
            };

            const onClickAddDiv = async (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => { 

                var output = document.getElementById('output') || null;
                var messages =  JSON.parse(localStorage.getItem('msgList'));

                var elems = document.querySelectorAll(".inner");
                elems.forEach(function(element) {
                  element.parentNode.removeChild(element);
                });

                
                for(var i=0; i < messages.length;i++ )
                {

                  if(messages[i] != ""){
                   
                        var ele = document.createElement("div");
                        ele.setAttribute("class","inner");
                        ele.innerHTML=messages[i];
                        output.appendChild(ele);
                  }
                }

                };

    useEffect(() => {

        
        messageList.push(message);
        localStorage.setItem('msgList', JSON.stringify(messageList));


    }, [message])

    return (
      <div className="out" id="output">
          <h2>Messgae is {message}</h2>
          <button className="send-buttons" onClick={onClickShowMessages}>
            Show Messages
          </button>
          <button className="send-buttons" onClick={onClickAddMessages}>
            Add Messages
          </button>
          <button className="send-buttons" onClick={onClickAddDiv}>
            Refresh
          </button>
      </div>
    );
  }

export default Messages;
