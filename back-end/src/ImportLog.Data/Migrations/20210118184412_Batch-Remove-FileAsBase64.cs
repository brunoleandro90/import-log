using Microsoft.EntityFrameworkCore.Migrations;

namespace ImportLog.Data.Migrations
{
    public partial class BatchRemoveFileAsBase64 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileAsBase64",
                table: "Batches");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileAsBase64",
                table: "Batches",
                type: "varchar(5000)",
                nullable: true);
        }
    }
}
