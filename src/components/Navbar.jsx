import { Link } from 'react-router-dom';

function Navbar(){
return <nav className="nav">
    <Link to={`/articles`}>Home</Link>
    <Link to={`/topics/coding`}>Coding</Link>
    <Link to={`/topics/cooking`}>Cooking</Link>
    <Link to={`/topics/football`}>Football</Link>
</nav>
}

export default Navbar
