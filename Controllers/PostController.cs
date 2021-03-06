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
            var result = _postService.FetchPosts(0,5);

            return Ok(result);


        }

         [HttpGet("GetPaged")]
        public ActionResult<Post> GetPaged(int pageIndex,int pageSize)
        {
            var result = _postService.FetchPosts(pageIndex,pageSize);

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
        [HttpPut]
        public ActionResult Put([FromBody] Post post) {

            var result=  _postService.EditPost(post);
            return Ok(result);
            // return BadRequest();
         }

        // DELETE api/PostControlle/5
        [HttpDelete("{Id}")]
        public ActionResult Delete(int Id) { 
              _postService.DeletePost(Id);
            return Ok(); 
        }
    }
}