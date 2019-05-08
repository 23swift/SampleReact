using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SampleReact.Model;

namespace SampleReact.Service
{
    public interface IPostService
    {
          IPagedList<Post> FetchPosts();
          Post AddPost(Post post);
    }
}