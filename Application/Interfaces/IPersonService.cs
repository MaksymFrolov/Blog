using Application.Models;

namespace Application.Interfaces
{
    public interface IPersonService : ICrud<PersonModel>
    {
        Task<IEnumerable<CommentModel>> GetAllPersonCommentsAsync(int personModelId);

        Task<IEnumerable<PostModel>> GetAllPersonPostsAsync(int personModelId);
    }
}
