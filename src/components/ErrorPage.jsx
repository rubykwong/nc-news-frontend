import { Link } from "react-router-dom"
function ErrorPage () {
    return (
        <section className="error-page">
            <h2>404 - Page Not Found</h2>
            <p>Hmm...looks like that page doesn't exist.</p>
            <Link to="/" className="back-home-button">Back to Home </Link>
            </section>
    )
}

export default ErrorPage