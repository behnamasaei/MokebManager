using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class deleteimagenamefromzaer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFileName",
                table: "AppZaer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageFileName",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);
        }
    }
}
