
using System;
using Microsoft.EntityFrameworkCore;
using SampleReact.Model;

namespace SampleReact.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext( DbContextOptions<AppDbContext> options)
        : base(options)
        {

        }
         protected override void OnModelCreating(ModelBuilder modelBuilder){
             modelBuilder.Entity<Blog>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
            });

            #region BlogSeed
            modelBuilder.Entity<Blog>().HasData(new Blog {BlogId = 1, Url = "http://sample.com"});
            #endregion

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.Posts)
                    .HasForeignKey("BlogId");
                    entity.Property(p=>p.DateCreated).HasDefaultValue(DateTime.Now);
            });
            #region PostSeed
            modelBuilder.Entity<Post>().HasData(
                new Post() { BlogId = 1, Id = 1, Title = "First post", Body = "Test 1" });
            #endregion

            #region AnonymousPostSeed
            modelBuilder.Entity<Post>().HasData(
                new { BlogId = 1, Id = 2, Title = "Second post", Body = @"quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" });
            modelBuilder.Entity<Post>().HasData(
                new { BlogId = 1, Id = 3, Title = "Third post", Body = @"est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla" });
                 modelBuilder.Entity<Post>().HasData(
                new { BlogId = 1, Id = 4, Title = "fourth post", Body = @"et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut" });
                 modelBuilder.Entity<Post>().HasData(
                new { BlogId = 1, Id = 5, Title = "5 post", Body = @"ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit" });



            #endregion

            
        }

         public DbSet<Blog> Blogs { get; set; }
         public DbSet<Post> Posts { get; set; }

       
    }


}