import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free';
import styles from './Chatbot.module.scss';
import type { IChatbotProps } from './IChatbotProps';
//import ChatService from '../../../services/ChatService';
import { IChatbotState } from './IChatbotState'; 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import invokePrompt from '../../../services/ChatService';


export default class Chatbot extends React.Component<IChatbotProps, IChatbotState> {

  private chatContainerRef: React.RefObject<HTMLDivElement>;

  constructor (props: IChatbotProps){
    super(props)
    this.state = {
      messages: [],

      query : ""

    }

     this.chatContainerRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  

  public scrollToBottom() {
    if (this.chatContainerRef.current) {
      this.chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  

  componentDidMount(): void {
    

    this.setState(prevstate => ({
      messages: [...prevstate.messages,{role:"assistant", content:"How can I help you?"}]
    }))

    //invokePrompt(this.state.messages)

    //this.getPromptResponse()

    
  }

  public handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({query: event.currentTarget.value})
  }



  public async handleClick() {
    if (this.state.query.trim() === "") {
        return;
    }

    // Update state with user message
    this.setState(prevState => ({
        messages: [...prevState.messages, { role: "user", content: prevState.query }]
    }), async () => {
        try {
          
            // Invoke prompt and update state with chatbot response
            const botResponse = await invokePrompt(this.state.messages);

            this.setState(prevState => ({
                messages: [...prevState.messages, { role: "assistant", content: botResponse.toString() }]
            }), () => {
                console.log(this.state.messages); // Logging after state update
            });
        } catch (error) {
            console.error('Error invoking prompt:', error);
        }
    });
}


  public render(): React.ReactElement<IChatbotProps> {
    const {
      
    } = this.props;

    return (
      <section className={`${styles.chatbot}`}>
        <div className="container mt-5">
          {/* Chat container */}
          <div className="card" style={{ height: '400px', overflowY: 'auto', padding: '5px' }} ref={this.chatContainerRef}>
            <div className="card-body p-0">
              {/* Render chat messages */}
              {this.state.messages.map((message, index) => (
                <div key={index} className={`card border-${message.role === 'user' ? 'primary' : 'secondary'} mb-2`} style={{ maxWidth: '80%', marginLeft: message.role === 'user' ? 'auto' : '10px', marginRight: message.role === 'user' ? '10px' : 'auto', marginBottom: '10px' }}>
                  <div className="card-body py-2 px-3">
                    <div className={`font-weight-bold text-${message.role === 'user' ? 'primary' : 'secondary'}`}>{message.role === 'user' ? 'You' : 'Chatbot'}</div>
                    <div>{message.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Input field */}
          <form className="mt-3">
            <div className="row">
              <div className="col-10">
                <div className="form-group mb-0">
                  <input className="form-control" placeholder="Type your message..." onChange={this.handleInputChange}></input>
                </div>
              </div>
              <div className="col-2">
                <button onClick={this.handleClick} type="reset" className="btn btn-primary btn-block h-100">Send</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
