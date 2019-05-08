using System.Collections.Generic;
using System.Threading.Tasks;
using SampleReact.Model;

namespace SampleReact.Service
{
    public interface IPostService
    {
         Task<List<Post>> FetchPosts();
    }
}