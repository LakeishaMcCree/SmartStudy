using Microsoft.EntityFrameworkCore;
using SmartStudy.Api.Models;

namespace SmartStudy.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
    }
}