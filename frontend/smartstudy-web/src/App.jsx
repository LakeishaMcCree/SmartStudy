import {useEffect, useState} from 'react';

function App() {
  const [course, setCourses] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5209/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error  ));
  }, []);

  return (
    <div>
      <h1>SmartStudy Dashboard</h1>

      <h2>Courses</h2>
      <ul>
        {course.map((course) => (
          <li key={course.id}>
            {course.name} - {course.instructor}
          </li>
        ))}
      </ul>
    </div>
  );
}

  
export default App;
