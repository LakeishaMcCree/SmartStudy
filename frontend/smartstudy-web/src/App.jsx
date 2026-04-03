import {useEffect, useState} from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [color, setColor] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [courseId, setCourseId] = useState("");

  const fetchCourses = () => {
    fetch("http://localhost:5209/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const fetchAssignments = () => {
    fetch("http://localhost:5209/api/assignments")
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error("Error fetching assignments:", error));
  };
  
  useEffect(() => {
    fetchCourses();
    fetchAssignments();
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

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();

    const newAssignment = {
      title,
      description,
      dueDate,
      priority,
      isComplete: false,
      courseId: Number(courseId),
    };

    try {
      const response = await fetch("http://localhost:5209/api/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAssignment)
      });

      if (!response.ok) {
        throw new Error("Failed to create assignment");
      }

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");
      setCourseId("");
      fetchAssignments();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const markComplete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5209/api/assignments/${id}/complete`, 
        {
          method: "PUT",
        }
    );

      if (!response.ok) {
        throw new Error("Failed to mark assignment as complete");
      }

      fetchAssignments();
    } catch (error) {
      console.error("Error marking assignment as complete:", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5209/api/courses/${id}`, 
        {
          method: "DELETE",
        }
      );
    
      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      fetchCourses();
      fetchAssignments();
    }
    catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const deleteAssignment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5209/api/assignments/${id}`, 
        {
          method: "DELETE",
        }
      );
    
      if (!response.ok) {
        throw new Error("Failed to delete assignment");
      }

      fetchAssignments();
    }
    catch (error) {
      console.error("Error deleting assignment:", error);
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
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add Assignment</h2>
      <form onSubmit={handleAssignmentSubmit}>
        <div>
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
        </div>
        <button type="submit">Add Assignment</button>
      </form>

      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => { 
          const course = courses.find((c) => c.id === assignment.courseId);
          
          return (
            <li key={assignment.id}>
              {assignment.title} - Due: {assignment.dueDate} - Course: {course ? course.name : "Unknown"}

              {assignment.isComplete ? (
                <span> (Completed)</span> 
              ) : (
                <button onClick={() => markComplete(assignment.id)}> 
                  Mark Complete
                </button>
              )}

              <button onClick={() => deleteAssignment(assignment.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

  
export default App;
