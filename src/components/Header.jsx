import { Link } from 'react-router-dom';

function Header () {
    return (
    <header>
        <Link to={`/`}>
        <h1>Northcoders News</h1>
        </Link> 
        <p>The North's favourite news outlet</p>
    </header>
    )
}

export default Header