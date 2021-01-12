﻿// <auto-generated />
using System;
using ImportLog.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ImportLog.Data.Migrations
{
    [DbContext(typeof(ImportLogDbContext))]
    [Migration("20210112021945_BatchId-Nullable")]
    partial class BatchIdNullable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("ImportLog.Business.Models.Batch", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("FileAsBase64")
                        .IsRequired()
                        .HasColumnType("varchar(5000)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<decimal>("NumberLogs")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.ToTable("Batches");
                });

            modelBuilder.Entity("ImportLog.Business.Models.Log", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("BatchId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<decimal>("HttpStatus")
                        .HasColumnType("numeric(5)");

                    b.Property<string>("HttpVersion")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Ip")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.Property<decimal>("Length")
                        .HasColumnType("numeric(10)");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Referer")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("UserAgent")
                        .IsRequired()
                        .HasColumnType("varchar(2000)");

                    b.HasKey("Id");

                    b.HasIndex("BatchId");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("ImportLog.Business.Models.Log", b =>
                {
                    b.HasOne("ImportLog.Business.Models.Batch", "Batch")
                        .WithMany("Logs")
                        .HasForeignKey("BatchId");
                });
#pragma warning restore 612, 618
        }
    }
}
