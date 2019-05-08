using System;

namespace SampleReact.Model
{
     public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }

        public int BlogId { get; set; }
        public Blog Blog { get; set; }
        public DateTime DateCreated{get;set;}=DateTime.Now;
    }
}