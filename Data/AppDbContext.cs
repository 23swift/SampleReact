
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
            });
            #region PostSeed
            modelBuilder.Entity<Post>().HasData(
                new Post() { BlogId = 1, Id = 1, Title = "First post", Body = "Test 1" });
            #endregion

            #region AnonymousPostSeed
            modelBuilder.Entity<Post>().HasData(
                new { BlogId = 1, Id = 2, Title = "Second post", Body = @"
                quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" });

            #endregion

            
        }

         public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

       
    }


}