const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About TodoApp</h1>
        
        <div className="about-content">
          <p>
            TodoApp is a simple and elegant task management application built 
            with React. It helps you stay organized and productive by providing 
            an intuitive interface to manage your daily tasks.
          </p>
          
          <h2>How It Works</h2>
          <ol>
            <li>Create an account or login</li>
            <li>Add your tasks with categories and priorities</li>
            <li>Mark tasks as complete when done</li>
            <li>Track your progress on the dashboard</li>
          </ol>
          
          <h2>Features</h2>
          <ul>
            <li>User authentication</li>
            <li>Task management (CRUD operations)</li>
            <li>Filter tasks by status</li>
            <li>Dark/Light theme toggle</li>
            <li>Admin dashboard for user management</li>
            <li>Data persistence with localStorage</li>
          </ul>
          
          <div className="tech-stack">
            <h2>Built With</h2>
            <div className="tech-badges">
              <span className="badge">React</span>
              <span className="badge">React Router</span>
              <span className="badge">Context API</span>
              <span className="badge">Vite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;