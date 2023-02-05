import { useEffect, useState, useCallback} from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  //usando estados para trazer meus 'arrays'
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  
  const noMorePost = page + postPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase()
      );
  })
  : posts;

      const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPosts()

      setPosts(postsAndPhotos.slice(page, postPerPage));
      setAllPosts(postsAndPhotos);
    }, [])

    useEffect(() => {
      handleLoadPosts(0, postPerPage);
    }, [handleLoadPosts, postPerPage])

    // funcao para carregar posts
    const loadMorePosts = () => {
      const nextPage = page + postPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
      posts.push(...nextPosts)

      setPosts(posts);
      setPage(nextPage);
    } 

    //funcao de mundanca enquanto pesquisa
    const handleChange = (e) => {
      const { value } = e.target;
      setSearchValue(value)
    }


  return(
    <section className='container'>
      {/* criando pesquisas para buscar palavras em site */}
    <div className="search-container">
    {!!searchValue && (
      <h1>Valor de pesquisa: {searchValue} </h1>
    )}
      <TextInput searchValue ={searchValue} handleChange={handleChange}/>
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
      onClick={loadMorePosts}
      disabled={noMorePost}
        />
      )}
      </div>
    </section>
  )

}

export default Home;
