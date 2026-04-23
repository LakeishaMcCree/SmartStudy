namespace SmartStudy.Api.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; } = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
        public string Priority { get; set; } = string.Empty;
        public bool IsComplete { get; set; }
        public int CourseId { get; set; }
    }
}