using ImportLog.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ImportLog.Business.Intefaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task Add(TEntity entity);
        Task Add(List<TEntity> entities);
        Task<TEntity> Get(Guid id);
        Task<List<TEntity>> Get();
        Task Update(TEntity entity);
        Task Remove(Guid id);
        Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> predicate);
        Task<int> SaveChanges();
        Task DetachLocal(Func<TEntity, bool> predicate);
    }
}