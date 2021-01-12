using ImportLog.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImportLog.Data.Mappings
{
    public class BatchMapping : IEntityTypeConfiguration<Batch>
    {
        public void Configure(EntityTypeBuilder<Batch> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.FileName)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.NumberLogs)
                .IsRequired()
                .HasColumnType("numeric");

            builder.Property(p => p.FileAsBase64)
                .HasColumnType("varchar(5000)");

            builder.ToTable("Batches");
        }
    }
}