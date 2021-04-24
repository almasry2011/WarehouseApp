using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Entities.Transactions;
using TestWH.Domain.Entities.Products;

namespace TestWH.Domain.Entities.Partners
{
   public class Partner:BaseEntity
    {
        [Required]
        [StringLength(PartnerInvariants.NameMaxLength)]
        public string Name { get; private set; }

        [Required]
        public Address Address { get; private set; }

        public virtual IReadOnlyCollection<Transaction> Transactions => _transactions.AsReadOnly();
        private List<Transaction> _transactions = new List<Transaction>();

        public Partner()
        {

        }
        public Partner(string Name, Address Address)
        {
            this.Name = Name;
            this.Address = Address;
        }

        /// <summary>
        /// Generate a new sales transaction with this partner.
        /// </summary>
        public Transaction SellTo(IEnumerable<(Products.Product product, int quantity)> items)
            => CreateTransaction(items, TransactionType.Sales);


        /// <summary>
        /// Generate a new procurement transaction with this partner.
        /// </summary>
        public Transaction ProcureFrom(IEnumerable<(Products.Product product, int quantity)> items)
            => CreateTransaction(items, TransactionType.Procurement);


        private Transaction CreateTransaction(IEnumerable<(Products.Product product, int quantity)> items, TransactionType transactionType)
            {
               var transaction = new Transaction(this,transactionType);
                    foreach (var item in items)
                    {
                        transaction.AddTransactionLine(item.product, item.quantity);
                    }
            _transactions.Add(transaction);
            return transaction;
            }



       
        }
}
