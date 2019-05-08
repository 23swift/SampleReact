using Microsoft.EntityFrameworkCore.Migrations;

namespace SampleReact.Data
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    BlogId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: false),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.BlogId);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Body = table.Column<string>(nullable: true),
                    BlogId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "BlogId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Blogs",
                columns: new[] { "BlogId", "Rating", "Url" },
                values: new object[] { 1, 0, "http://sample.com" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "BlogId", "Body", "Title" },
                values: new object[] { 1, 1, "Test 1", "First post" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "BlogId", "Body", "Title" },
                values: new object[] { 2, 1, "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto", "Second post" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "BlogId", "Body", "Title" },
                values: new object[] { 3, 1, "est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla", "Third post" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "BlogId", "Body", "Title" },
                values: new object[] { 4, 1, "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto", "fourth post" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "BlogId", "Body", "Title" },
                values: new object[] { 5, 1, "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto", "5 post" });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_BlogId",
                table: "Posts",
                column: "BlogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Blogs");
        }
    }
}
