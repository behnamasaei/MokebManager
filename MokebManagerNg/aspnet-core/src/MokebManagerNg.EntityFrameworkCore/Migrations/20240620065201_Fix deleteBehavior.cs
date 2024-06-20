using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class FixdeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntryExitZaer_AppMokeb_MokebId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropForeignKey(
                name: "FK_AppEntryExitZaer_AppZaer_ZaerId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropForeignKey(
                name: "FK_AppZaer_AppMokeb_MokebId",
                table: "AppZaer");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntryExitZaer_AppMokeb_MokebId",
                table: "AppEntryExitZaer",
                column: "MokebId",
                principalTable: "AppMokeb",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntryExitZaer_AppZaer_ZaerId",
                table: "AppEntryExitZaer",
                column: "ZaerId",
                principalTable: "AppZaer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppZaer_AppMokeb_MokebId",
                table: "AppZaer",
                column: "MokebId",
                principalTable: "AppMokeb",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntryExitZaer_AppMokeb_MokebId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropForeignKey(
                name: "FK_AppEntryExitZaer_AppZaer_ZaerId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropForeignKey(
                name: "FK_AppZaer_AppMokeb_MokebId",
                table: "AppZaer");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntryExitZaer_AppMokeb_MokebId",
                table: "AppEntryExitZaer",
                column: "MokebId",
                principalTable: "AppMokeb",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntryExitZaer_AppZaer_ZaerId",
                table: "AppEntryExitZaer",
                column: "ZaerId",
                principalTable: "AppZaer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppZaer_AppMokeb_MokebId",
                table: "AppZaer",
                column: "MokebId",
                principalTable: "AppMokeb",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
