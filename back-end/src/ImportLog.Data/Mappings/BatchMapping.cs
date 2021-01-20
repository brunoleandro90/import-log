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

            builder.Property(p => p.ContentType)
                .IsRequired()
                .HasColumnType("varchar(50)");
            
            builder.Property(p => p.Length)
                .IsRequired()
                .HasColumnType("numeric");

            builder.Property(p => p.Bytes)
                .HasColumnType("bytea");

            builder.ToTable("Batches");
        }
    }
}