using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ImportLog.Data.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity, new()
    {
        protected readonly ImportLogDbContext Db;
        protected readonly DbSet<TEntity> DbSet;

        protected Repository(ImportLogDbContext db)
        {
            Db = db;
            DbSet = db.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public virtual async Task<TEntity> Get(Guid id)
        {
            return await DbSet.FindAsync(id);
        }

        public virtual async Task<List<TEntity>> Get()
        {
            return await DbSet.ToListAsync();
        }

        public virtual async Task Add(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
        }

        public virtual async Task Add(List<TEntity> entities)
        {
            Db.ChangeTracker.AutoDetectChangesEnabled = false;
            Db.ChangeTracker.LazyLoadingEnabled = false;
            DbSet.AddRange(entities);
            await SaveChanges();
        }

        public virtual async Task Update(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
        }

        public virtual async Task Remove(Guid id)
        {
            DbSet.Remove(new TEntity { Id = id });
            await SaveChanges();
        }

        public async Task<int> SaveChanges()
        {
            return await Db.SaveChangesAsync();
        }

        public async Task DetachLocal(Func<TEntity, bool> predicate)
        {
            Task task = Task.Run(() =>
            {
                TEntity local = DbSet.Local.FirstOrDefault(predicate);
                if (local != null)
                {
                    Db.Entry(local).State = EntityState.Detached;
                }
            });
            await task;
        }

        public void Dispose()
        {
            Db?.Dispose();
        }
    }
}