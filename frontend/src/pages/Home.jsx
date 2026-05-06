function Home({ setCurrentPage }) {
  return (
    <section>
      <button onClick={() => setCurrentPage("signup")}>Sign Up Now!</button>

      <h2>Home</h2>
      <p>Welcome to MoveUp!</p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi porro
        vitae labore corrupti, consequuntur ex delectus. Itaque odit, numquam
        asperiores, dolore ipsum amet sint tempore quisquam esse qui quibusdam
        deserunt!
      </p>
    </section>
  );
}

export default Home;
