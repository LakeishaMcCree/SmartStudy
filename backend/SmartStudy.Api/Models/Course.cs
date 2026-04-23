namespace SmartStudy.Api.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}