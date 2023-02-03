import './App.css';
import { Component } from 'react';
import PostCard from './components';

//componente de classe stateless
class App extends Component {
  //para aproximar classes das funcoes
    state = {
      posts: [],
      photos: []
    };

    //trazendo uma api e a convertendo em JSON
    componentDidMount() {
      this.loadPosts()
    }

    loadPosts = async () => {
      const postReponse = fetch('https://jsonplaceholder.typicode.com/posts')
      const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

      const [ posts, photos ] = await Promise.all([postReponse, photosResponse])
      
      const postJson = await posts.json()
      const photosJson = await photos.json()

      const postsAndPhotos = postJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
      })
      
      this.setState({ posts: postsAndPhotos})

    }

  render() {
    const { posts } = this.state;

    return(
      <section className='container'>
        <div className="posts">
        {posts.map(post => (
          <PostCard 
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
          cover={post.cover}
          post={post}
          />
        ))}
    </div>
      </section>
    )
  }
}


// function App() {
//   return (
//   );
// }

export default App;
