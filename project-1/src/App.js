import './App.css';

import { Component } from 'react';

import { loadPosts } from './utils/load-posts'
import { Posts } from './components/Posts';

//componente de classe stateless
class App extends Component {
  //para aproximar classes das funcoes
    state = {
      posts: []
    };

    //trazendo uma api e a convertendo em JSON
    async componentDidMount() {
      await this.loadPosts()
    }

    loadPosts = async () => {
      const postsAndPhotos = await loadPosts()
      this.setState({ posts: postsAndPhotos})

    }

  render() {
    const { posts } = this.state;

    return(
      <section className='container'>
        <Posts posts={posts}/>
      </section>
    )
  }
}


// function App() {
//   return (
//   );
// }

export default App;
