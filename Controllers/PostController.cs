using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SampleReact.Model;
using SampleReact.Service;
//using SampleReact.Models;

namespace SampleReact.Controllers
{
   
    [Route("api/[controller]")]
   
    public class PostController : ControllerBase
    {     private readonly IPostService  _postService;
        public PostController(IPostService postService) { 

            _postService=postService;
        }

        // GET api/PostControlle
        [HttpGet("[action]")]
        public ActionResult<Post> GetAll()
        {
            var result = _postService.FetchPosts();

            return Ok(result);


        }

        // GET api/PostControlle/5
        [HttpGet("{id}")]
        public ActionResult<string> GetById(int id)
        {
            return "value" + id;
        }

        // POST api/PostControlle
        [HttpPost]
        public ActionResult Post([FromBody] Post post) {
          var result=  _postService.AddPost(post);
            return Ok(result);
         }

        // PUT api/PostControlle/5
        [HttpPut("{Id}")]
        public void Put(int Id, [FromBody] string value) { }

        // DELETE api/PostControlle/5
        [HttpDelete("{Id}")]
        public ActionResult Delete(int Id) { 
              _postService.DeletePost(Id);
            return Ok(); 
        }
    }
}