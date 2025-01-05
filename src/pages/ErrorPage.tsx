import { Link } from 'react-router-dom'; // Import Link for navigation

const ErrorPage = () => {
  return (
    <main role="main" aria-labelledby="error-title">
      <h1 id="error-title">404: Page Not Found</h1>
      <h2>¯\_(ツ)_/¯</h2>
      <p>
        Oops! It looks like the page you’re looking for doesn’t exist.
      </p>
      <p>
        You can go back to the <Link to="/">homepage</Link> or check the URL for typos.
      </p>
    </main>
  );
};

export default ErrorPage;