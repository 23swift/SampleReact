using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SampleReact.Model;

namespace SampleReact.Service
{
    public interface IPostService
    {
          IPagedList<Post> FetchPosts(int pageIndex,int pageSize);
          Post AddPost(Post post);
           Post EditPost(Post post);
          void DeletePost(int postId);
    }
}