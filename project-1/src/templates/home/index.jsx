import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';


//componente de classe stateless
class Home extends Component {
  //para aproximar classes das funcoes
    state = {
      posts: [],
      allPosts: [],
      //fazendo a paginacao dos posts
      page: 0,
      postPerPage: 2
    };

    //trazendo uma api e a convertendo em JSON
    async componentDidMount() {
      await this.loadPosts()
    }

    loadPosts = async () => {
      const { page, postPerPage } = this.state;

      const postsAndPhotos = await loadPosts()
      this.setState({ 
        posts: postsAndPhotos.slice(page, postPerPage),
        allPosts: postsAndPhotos,
      })

    }

    loadMorePosts = () => {
      const {
        page,
        postPerPage,
        allPosts,
        posts
      } = this.state
      const nextPage = page + postPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)

      posts.push(...nextPosts)

      this.setState({ posts, page: nextPage})
    } 

  render() {
    const { posts, page, postPerPage, allPosts } = this.state;
    const noMorePost = page + postPerPage > allPosts.length;

    return(
      <section className='container'>
        <Posts posts={posts}/>

        <div className="button-container">
        <Button 
        text="Load more post"
        onClick={this.loadMorePosts}
        disabled={noMorePost}
        />
        </div>

    
      </section>
    )
  }
}


// function App() {
//   return (
//   );
// }

export default Home;
