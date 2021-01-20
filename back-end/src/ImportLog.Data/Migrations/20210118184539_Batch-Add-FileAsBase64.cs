using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ImportLog.Data.Migrations
{
    public partial class BatchAddFileAsBase64 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "FileAsBase64",
                table: "Batches",
                type: "bytea",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileAsBase64",
                table: "Batches");
        }
    }
}
