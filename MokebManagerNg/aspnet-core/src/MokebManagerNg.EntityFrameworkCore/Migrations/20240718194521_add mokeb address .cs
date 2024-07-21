using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class addmokebaddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "AppMokeb");
        }
    }
}
