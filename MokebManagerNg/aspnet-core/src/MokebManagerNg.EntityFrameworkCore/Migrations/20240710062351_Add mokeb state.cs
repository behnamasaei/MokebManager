using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class Addmokebstate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppMokebState",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MokebId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ZaerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    State = table.Column<int>(type: "INTEGER", nullable: false),
                    ExtraProperties = table.Column<string>(type: "TEXT", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppMokebState", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppMokebState_AppMokeb_MokebId",
                        column: x => x.MokebId,
                        principalTable: "AppMokeb",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppMokebState_AppZaer_ZaerId",
                        column: x => x.ZaerId,
                        principalTable: "AppZaer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppZaer_Id",
                table: "AppZaer",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppMokebState_MokebId",
                table: "AppMokebState",
                column: "MokebId");

            migrationBuilder.CreateIndex(
                name: "IX_AppMokebState_ZaerId",
                table: "AppMokebState",
                column: "ZaerId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppMokebState");

            migrationBuilder.DropIndex(
                name: "IX_AppZaer_Id",
                table: "AppZaer");
        }
    }
}
