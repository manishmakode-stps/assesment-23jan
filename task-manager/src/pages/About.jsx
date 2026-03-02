function About() {
  return (
    <main className="page page-narrow">
      <h1>About</h1>
      <section className="panel">
        <p>
          This is a Trello-style task manager built with React Router, Context API, and
          useReducer.
        </p>
        <p>
          Features include CRUD operations, task movement across board columns, search and
          filters, performance optimizations, and localStorage persistence.
        </p>
      </section>
    </main>
  );
}

export default About;
