import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


//componente de classe stateless
class Home extends Component {
  //para aproximar classes das funcoes
    state = {
      posts: [],
      allPosts: [],
      //fazendo a paginacao dos posts
      page: 0,
      postPerPage: 2,
      //realizando pesquisas
      searchValue: ''
    };

    //trazendo uma api e a convertendo em JSON
    async componentDidMount() {
      await this.loadPosts()
    }

    // modulo para carregar posts com arrow function
    loadPosts = async () => {
      const { page, postPerPage } = this.state;

      const postsAndPhotos = await loadPosts()
      this.setState({ 
        posts: postsAndPhotos.slice(page, postPerPage),
        allPosts: postsAndPhotos,
      })

    }

    // funcao para carregar posts
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

    //funcao de mundanca enquanto pesquisa
    handleChange = (e) => {
      const { value } = e.target;
      this.setState({ searchValue: value })
    }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePost = page + postPerPage > allPosts.length;

    // retornando os posts filtrados
    const filteredPosts = !!posts ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
        );
    })
    : posts;

    return(
      <section className='container'>
        {/* criando pesquisas para buscar palavras em site */}
      <div className="search-container">
      {!!searchValue && (
        <h1>Valor de pesquisa: {searchValue} </h1>
      )}
        <TextInput searchValue ={searchValue} handleChange={this.handleChange}/>
        </div>


        {/* usando todos os posts filtrados em POSTS */}
        {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
        <p>Nao existem posts</p>
        )}


        <div className="button-container">

        {!searchValue && (
        <Button 
        text="Load more post"
        onClick={this.loadMorePosts}
        disabled={noMorePost}
          />
        )}
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
