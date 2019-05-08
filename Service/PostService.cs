using System.Collections.Generic;
using SampleReact.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace SampleReact.Service
{
    public class PostService : IPostService
    {
         private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Post> postRepo;
        private readonly IRepository< Blog> blogRepo;
         public PostService(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork; 

            this.postRepo=this._unitOfWork.GetRepository<Post>();
            this.blogRepo=this._unitOfWork.GetRepository<Blog>();
        }

        public Post AddPost(Post post)
        {
            
            var blog=this.blogRepo.GetFirstOrDefault(predicate: b => b.BlogId == 1, include: b=>b.Include(bb=>bb.Posts));
            blog.Posts.Add(post);
            this.blogRepo.Update(blog);
            this._unitOfWork.SaveChanges();
            
            var _post= new Post{
                Id=post.Id,Title=post.Title,Body=post.Body
            };
            return _post;
        }

        public  IPagedList<Post> FetchPosts()
        {
            var result=this.postRepo.GetPagedList(pageIndex: 0, pageSize: 100, orderBy:p=>p.OrderBy(x=>x.DateCreated));
            return  result;
        }
    }
}