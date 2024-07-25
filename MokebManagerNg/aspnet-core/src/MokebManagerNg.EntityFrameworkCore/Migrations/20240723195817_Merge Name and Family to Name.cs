using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class MergeNameandFamilytoName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Family",
                table: "AppZaer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Family",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);
        }
    }
}
