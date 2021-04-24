using System.ComponentModel.DataAnnotations;
using TestWH.Domain.Entities.Products;

namespace TestWH.Domain.Entities.Transactions
{
    public class TransactionLine
    {
        public int Id { get; private set; }

        [Required]
        public int ProductId { get; init; }
        public virtual TestWH.Domain.Entities.Products.Product Product { get; init; }

        [Required]
        public Transaction Transaction { get; init; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; init; }

        [Required]
        public decimal UnitPrice { get; init; }
    }
}