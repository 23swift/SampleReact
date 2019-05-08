using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SampleReact.Data
{
    public partial class AddDateCreatedToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Posts",
                nullable: false,
                defaultValue: new DateTime(2019, 5, 8, 15, 21, 48, 86, DateTimeKind.Local).AddTicks(2717));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2019, 5, 8, 15, 21, 48, 95, DateTimeKind.Local).AddTicks(2191));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Third post");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Body", "Title" },
                values: new object[] { "et iusto sed quo iure\\nvoluptatem occaecati omnis eligendi aut ad\\nvoluptatem doloribus vel accusantium quis pariatur\\nmolestiae porro eius odio et labore et velit aut", "fourth post" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Body", "Title" },
                values: new object[] { "ullam et saepe reiciendis voluptatem adipisci\\nsit amet autem assumenda provident rerum culpa\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit", "5 post" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Posts");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Second post");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Body", "Title" },
                values: new object[] { "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto", "Second post" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Body", "Title" },
                values: new object[] { "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto", "Second post" });
        }
    }
}
