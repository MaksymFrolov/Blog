namespace Application.Models
{
    public class CommentModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime CreatedDate { get; set; }

        public int PersonId { get; set; }

        public int PostId { get; set; }

        public int ParentCommentId { get; set; }
    }
}
