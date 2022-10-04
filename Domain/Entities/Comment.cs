using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string Content { get; set; }

        public int PersonId { get; set; }

        public int PostId { get; set; }

        public int ParentCommentId { get; set; }

        public Person Person { get; set; }

        public Post Post { get; set; }

        public Comment ParentComment { get; set; }
    }
}
