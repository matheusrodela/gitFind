import {useState} from "react"
import { Header } from "../../components/Header";
import backgroundImage from "../../assets/backgroundImage.png";
import ItemList from "../../components/ItemList"
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  const handleKeyDown = event => {
    console.log('User pressed: ', event.key);

    if (event.key === 'Enter') {
      handleGetData()
    }
  };

  return <div className="App"> 
    <Header></Header>
    <div className="conteudo">
      <img src = {backgroundImage} className="backgroundImage" alt="github's logo"/>
      <div className="info">
        <div>
          <input name="usuario" value={user} onKeyDown={handleKeyDown} onChange={event => setUser(event.target.value)} placeholder="@username"/>
          <button onClick={handleGetData}>Buscar</button>
        </div>
        {currentUser?.name ? (
        <>
          <div className="perfil">
          <img src={currentUser.avatar_url} className="profile" alt="profile pic"/>
          <div className="profileText">
            <h3>{currentUser.name}</h3>
            <span>@{currentUser.login}</span>
            <p>{currentUser.bio}</p>
          </div>
          </div>
          <hr />
        </>
        ): null}

        {repos?.length  ? (
          <div>
            <h4 className="repositorio">Repositórios</h4>
            {repos.map(repo => (
              <a href={repo.html_url} target="blank_"><ItemList title={repo.name} description={repo.description}/></a>
            ))}
          </div>
        ): null}
      </div>
    </div>
  </div>
}

export default App;
