import { useAuth } from "../../context/AuthContext.jsx";

function ProtectedPage({ children, pageName, onGoHome }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <section>
        <h2>Login required</h2>
        <p>You need to be logged in to access {pageName}.</p>
        <button type="button" onClick={onGoHome}>
          Go to Home
        </button>
      </section>
    );
  }

  return children;
}

export default ProtectedPage;
