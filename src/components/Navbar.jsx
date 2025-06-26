import { Link } from 'react-router-dom';

function Navbar(){
return <nav className="nav">
    <Link to={`/`}>Home</Link>
    <Link to={`/coding`}>Coding</Link>
    <Link to={`/cooking`}>Cooking</Link>
    <Link to={`/football`}>Football</Link>
</nav>
}

export default Navbar

//add links to specific routes in navbar list