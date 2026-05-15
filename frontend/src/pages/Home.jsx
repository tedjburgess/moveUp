import GuestReminder from "../components/home/GuestReminder.jsx";

function Home({ setCurrentPage }) {
  return (
    <section>
      <button onClick={() => setCurrentPage("signup")}>Sign Up Now!</button>

      <h2>Home</h2>
      <p>Welcome to MoveUp!</p>

      <p>
        Build healthier movement habits with reminders and movement tracking.
      </p>

      <GuestReminder />
    </section>
  );
}

export default Home;
