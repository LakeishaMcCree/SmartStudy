using Microsoft.AspNetCore.Mvc;
using SmartStudy.Api.Models;

namespace SmartStudy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            var courses = new List<Course>
            {
                new Course { Id = 1, Name = "Math", Instructor = "Mrs. Johnson", Color = "Red" },
                new Course { Id = 2, Name = "Science", Instructor = "Mr. Smith", Color = "Green"}
            };

            return Ok(courses);
        }
    }
}