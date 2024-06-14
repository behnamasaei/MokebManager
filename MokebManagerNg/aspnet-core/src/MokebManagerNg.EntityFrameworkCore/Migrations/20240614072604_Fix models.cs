using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MokebManagerNg.Migrations
{
    /// <inheritdoc />
    public partial class Fixmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "LastModifierId",
                table: "AppZaer");

            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "LastModifierId",
                table: "AppMokeb");

            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "AppEntryExitZaer");

            migrationBuilder.DropColumn(
                name: "LastModifierId",
                table: "AppEntryExitZaer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "AppZaer",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppZaer",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LastModifierId",
                table: "AppZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "AppMokeb",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppMokeb",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LastModifierId",
                table: "AppMokeb",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppEntryExitZaer",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LastModifierId",
                table: "AppEntryExitZaer",
                type: "TEXT",
                nullable: true);
        }
    }
}
