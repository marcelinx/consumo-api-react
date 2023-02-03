import './App.css';
import { Component } from 'react';

//componente de classe stateless
class App extends Component {
  //para aproximar classes das funcoes
    state = {
      counter: 0,
      posts: [
        {
          id: 1,
          title: 'titulo 1',
          body: 'corpo 1'
        },
        {
          id: 2,
          title: 'titulo 2',
          body: 'corpo 2'
        },
        {
          id: 3,
          title: 'titulo 3',
          body: 'corpo 3'
        },
      ]
    };
    timeoutUpdate = null;

    //metodo do tipo render
    //com tempo para minhas informacoes aparecem, 5 segundos
    componentDidMount() {
      this.handleTimeout()
    }

    componentDidUpdate() {
      this.handleTimeout()
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutUpdate)
    }

    handleTimeout = () => {
      const { posts, counter } = this.state;
      posts[0].title = 'o titulo mudou';

     this.timeoutUpdate = setTimeout(() => {
        this.setState({ posts, counter: counter + 1 })
     }, 1000)
    }

  render() {
    const { posts, counter } = this.state;
    
    return(
      <div className="App">
        <h1>{ counter }</h1>
        {/* retornando os objetos da array */}
        {posts.map(post => (
        <>
        <h1 key={post.id}>{post.title}</h1>
        <p>{post.body}</p>
        </>
        ))}
    </div>
    )
  }
}


// function App() {
//   return (
//   );
// }

export default App;
