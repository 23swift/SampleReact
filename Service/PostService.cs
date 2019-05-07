using System.Collections.Generic;
using SampleReact.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace SampleReact.Service
{
    public class PostService : IPostService
    {
         private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Post> postRepo;
        public  Task<List<Post>> FetchPosts()
        {
            return  postRepo.GetAll().ToListAsync();
        }
    }
}