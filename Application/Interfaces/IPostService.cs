using Application.Models;

namespace Application.Interfaces
{
    public interface IPostService : ICrud<PostModel>
    {
        Task<IEnumerable<CommentModel>> GetAllPostCommentAsync(int postModelId);

        Task<IEnumerable<PostModel>> GetPostsByPeriodAsync(DateTime startDate, DateTime endDate);

        Task AddCommentAsync(CommentModel commentModel);

        Task UpdateCommentAsync(CommentModel commentModel);

        Task RemoveCommentAsync(int commentModelId);
    }
}
