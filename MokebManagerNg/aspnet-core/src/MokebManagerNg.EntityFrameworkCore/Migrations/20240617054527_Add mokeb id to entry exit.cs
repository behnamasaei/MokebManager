using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class Addmokebidtoentryexit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MokebId",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_AppZaer_PassportNo",
                table: "AppZaer",
                column: "PassportNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppZaer_PhoneNumber",
                table: "AppZaer",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppMokeb_Name",
                table: "AppMokeb",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppEntryExitZaer_MokebId",
                table: "AppEntryExitZaer",
                column: "MokebId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntryExitZaer_AppMokeb_MokebId",
                table: "AppEntryExitZaer",
                column: "MokebId",
                principalTable: "AppMokeb",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntryExitZaer_AppMokeb_MokebId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropIndex(
                name: "IX_AppZaer_PassportNo",
                table: "AppZaer");

            migrationBuilder.DropIndex(
                name: "IX_AppZaer_PhoneNumber",
                table: "AppZaer");

            migrationBuilder.DropIndex(
                name: "IX_AppMokeb_Name",
                table: "AppMokeb");

            migrationBuilder.DropIndex(
                name: "IX_AppEntryExitZaer_MokebId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "MokebId",
                table: "AppEntryExitZaer");
        }
    }
}
