using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TestWH.Domain.Entities;
using TestWH.Domain.Entities.Partners;
using TestWH.Domain.Entities.Products;
using TestWH.Domain.Entities.Transactions;

namespace TestWH.Persistence
{
    public interface IApplicationDbContext
    {
         DbSet<Product> Products { get; set; }
         DbSet<Transaction> Transactions { get; set; }
         DbSet<Partner> Partners { get; set; }

 
        Task<int> SaveChangesAsync();



    }
}
