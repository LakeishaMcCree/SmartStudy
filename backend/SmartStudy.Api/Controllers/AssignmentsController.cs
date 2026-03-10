using Microsoft.AspNetCore.Mvc;
using SmartStudy.Api.Models;

namespace SmartStudy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AssignmentsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Assignment>> GetAssignments()
        {
            var assignments = new List<Assignment>
            {
                new Assignment
                {
                    Id = 1,
                    Title = "Homework 1",
                    Description = "Complete algebra problems",
                    DueDate = DateTime.Now.AddDays(2),
                    Priority = "High",
                    IsComplete = false,
                    CourseId = 1
                },
                new Assignment
                {
                    Id = 2,
                    Title = "Science Lab",
                    Description = "Write lab summary",
                     DueDate = DateTime.Now.AddDays(3),
                    Priority = "Medium",
                    IsComplete = false,
                    CourseId = 2
                }
            };
            
            return Ok(assignments);
        }
    }
}