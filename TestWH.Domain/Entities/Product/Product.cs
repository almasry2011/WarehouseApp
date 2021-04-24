using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestWH.Domain.Common.ValueObjects;
using TestWH.Domain.Entities.Products;
using TestWH.Domain.Entities.Transactions;
using TestWH.Domain.Exceptions;

namespace TestWH.Domain.Entities.Products
{
    public class Product : BaseEntity
    {
        [Required]
        [StringLength(ProductInvariants.NameMaxLength)]
        public string Name { get; private set; }

        [Required]
        [StringLength(ProductInvariants.DescriptionMaxLength)]
        public string Description { get; private set; }

        //[Required]
        //public decimal Amount { get; private set; }

        [Required]
        public decimal Price { get; private set; }
        [Required]
        public Mass Mass { get; private set; }

        public int NumberInStock { get; private set; }

        public Product()
        {

        }
        public Product(string Name, string Description, decimal Price, Mass Mass , int NumberInStock)
        {
            this.Name = Name;
            this.Description = Description;
            this.Price = Price;
            this.Mass = Mass;
            this.NumberInStock = NumberInStock;
        }
        /// <summary>
        /// Adjust product stock based on a transaction occurred.
        /// </summary>
        internal void RecordTransaction(TransactionLine transactionLine)
        {
            if (transactionLine.Quantity > NumberInStock)
            {
                throw new InsufficientStockException(this, transactionLine.Quantity);
            }

            if (transactionLine.Quantity < 1)
            {
                throw new ArgumentException("Product quantity in transaction must be 1 or greater.");
            }

            if (transactionLine.Transaction.TransactionType==TransactionType.Sales)
            {
                NumberInStock -= transactionLine.Quantity;
            }else if (transactionLine.Transaction.TransactionType == TransactionType.Procurement)
            {
                NumberInStock += transactionLine.Quantity;
            }
            else
            {
                throw new InvalidEnumArgumentException($"Unexpected {nameof(TransactionType)}: '{transactionLine.Transaction.TransactionType}'.");

            }
        }


    }
}
