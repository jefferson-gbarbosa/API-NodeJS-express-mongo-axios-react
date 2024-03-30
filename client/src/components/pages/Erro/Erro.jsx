import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="container">
            <h2>404</h2>
            <p>Page not found!</p>
            <Link to="/" className="btn">
                Go Home
            </Link>
        </div>
    );
};

export default Error;