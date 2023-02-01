import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


//componente de classe stateless
class App extends Component {
  //para aproximar classes das funcoes
    state = {
      name: 'Joao Luiz',
      counter: 0
    };

  handlePClick = () => {
    this.setState( { name: 'Beatryz' })
  }

  //arrow function puxa do proprio elemento pai
  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 })
  }

  render() {
    const { name, counter } = this.state;

    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name} {counter}
        </p>
        <a
          onClick={this.handleAClick}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Este é o link
        </a>
      </header>
    </div>
    )
  }
}


// function App() {
//   return (
//   );
// }

export default App;
