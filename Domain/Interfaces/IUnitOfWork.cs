using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUnitOfWork
    {
        ICommentRepository CommentRepository { get; }

        IPersonRepository PersonRepository { get; }

        IPostRepository PostRepository { get; }

        Task SaveAsync();
    }
}
