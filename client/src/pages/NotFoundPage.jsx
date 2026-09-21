import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container page-section not-found">
      <h1>404</h1>
      <p>The page you are looking for could not be found.</p>
      <Link to="/" className="btn btn-primary">Go home</Link>
    </div>
  );
}

export default NotFoundPage;
