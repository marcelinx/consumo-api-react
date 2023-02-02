import './App.css';
import { Component } from 'react';


//componente de classe stateless
class App extends Component {
  //para aproximar classes das funcoes
    state = {
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
        }
      ]
    };

  render() {
    const { posts } = this.state;

    return(
      <div className="App">
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
