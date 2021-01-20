using Microsoft.EntityFrameworkCore.Migrations;

namespace ImportLog.Data.Migrations
{
    public partial class BatchRemodelagem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberLogs",
                table: "Batches");

            migrationBuilder.RenameColumn(
                name: "FileAsBase64",
                table: "Batches",
                newName: "Bytes");

            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "Batches",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Length",
                table: "Batches",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "Batches");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Batches");

            migrationBuilder.RenameColumn(
                name: "Bytes",
                table: "Batches",
                newName: "FileAsBase64");

            migrationBuilder.AddColumn<decimal>(
                name: "NumberLogs",
                table: "Batches",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
