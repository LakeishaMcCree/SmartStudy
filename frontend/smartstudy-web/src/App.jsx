import {useEffect, useState} from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [color, setColor] = useState("");

  const fetchCourses = () => {
    fetch("http://localhost:5209/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = { 
      name, 
      instructor, 
      color 
    };

    try {
      const response = await fetch("http://localhost:5209/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      setName("");
      setInstructor("");
      setColor("");
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <h1>SmartStudy Dashboard</h1>

    <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>

      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} - {course.instructor} - {course.color}
          </li>
        ))}
      </ul>
    </div>
  );
}

  
export default App;
