using ImportLog.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImportLog.Data.Mappings
{
    public class LogMapping : IEntityTypeConfiguration<Log>
    {
        public void Configure(EntityTypeBuilder<Log> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Ip)
                .IsRequired()
                .HasColumnType("varchar(30)");

            builder.Property(p => p.Date)
                .IsRequired()
                .HasColumnType("timestamp with time zone");

            builder.Property(p => p.Method)
                .IsRequired()
                .HasColumnType("varchar(10)");

            builder.Property(p => p.Url)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.HttpVersion)
                .IsRequired()
                .HasColumnType("varchar(50)");

            builder.Property(p => p.HttpStatus)
                .IsRequired()
                .HasColumnType("numeric(5)");

            builder.Property(p => p.Length)
                .HasColumnType("numeric(10)");

            builder.Property(p => p.Referer)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.UserAgent)
                .IsRequired()
                .HasColumnType("varchar(2000)");

            builder.HasOne<Batch>(s => s.Batch)
                .WithMany(g => g.Logs)
                .HasForeignKey(s => s.BatchId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Logs");
        }
    }
}