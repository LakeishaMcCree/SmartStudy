using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStudy.Api.Data;
using SmartStudy.Api.Models;

namespace SmartStudy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AssignmentsController : ControllerBase
    {
            private readonly AppDbContext _context;

        public AssignmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignments()
        {
            var assignments = await _context.Assignments.ToListAsync();
            
            return Ok(assignments);
        }
        [HttpPost]
        public async Task<ActionResult<Assignment>> CreateAssignment(Assignment assignment)
        {
            var courseExists = await _context.Courses.AnyAsync(c => c.Id == assignment.CourseId);
            if (!courseExists)            
            {
                return BadRequest("Invalid CourseId. The selected course does not exist.");
            }

            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAssignments), new { id = assignment.Id }, assignment);
        }
    }
}