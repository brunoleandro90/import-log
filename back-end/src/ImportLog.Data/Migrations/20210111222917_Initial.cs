using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ImportLog.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Batches",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FileName = table.Column<string>(type: "varchar(200)", nullable: false),
                    NumberLogs = table.Column<decimal>(type: "numeric", nullable: false),
                    FileAsBase64 = table.Column<string>(type: "varchar(5000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Batches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Ip = table.Column<string>(type: "varchar(30)", nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    Method = table.Column<string>(type: "varchar(10)", nullable: false),
                    Url = table.Column<string>(type: "varchar(200)", nullable: false),
                    HttpVersion = table.Column<string>(type: "varchar(50)", nullable: false),
                    HttpStatus = table.Column<decimal>(type: "numeric(5)", nullable: false),
                    Length = table.Column<decimal>(type: "numeric(10)", nullable: false),
                    Referer = table.Column<string>(type: "varchar(200)", nullable: false),
                    UserAgent = table.Column<string>(type: "varchar(2000)", nullable: false),
                    BatchId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Logs_Batches_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Logs_BatchId",
                table: "Logs",
                column: "BatchId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Batches");
        }
    }
}
