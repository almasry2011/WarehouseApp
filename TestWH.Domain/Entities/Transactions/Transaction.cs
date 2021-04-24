using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Entities.Partners;
using TestWH.Domain.Entities.Products;

namespace TestWH.Domain.Entities.Transactions
{
   public class Transaction:BaseEntity
    {
        public TransactionType TransactionType { get; private set; }

        [Required]
        public decimal Total { get; private set; }

        public int PartnerId { get; private set; }
        public virtual Partner Partner { get; private set; }

        public virtual IReadOnlyCollection<TransactionLine> TransactionLines => _transactionLines.AsReadOnly();
        private List<TransactionLine> _transactionLines = new List<TransactionLine>();

        public Transaction()
        { }

        public Transaction(Partner partner,TransactionType transactionType)
        {
            Partner = partner;
            TransactionType = transactionType;
            PartnerId = partner.Id;
        }

        public void AddTransactionLine(Product product, int quantity)
        {

            var trxLine = new TransactionLine
            {
                Product = product,
                Transaction = this,
                Quantity = quantity,
                UnitPrice = product.Price,
                ProductId=product.Id
            };

            product.RecordTransaction(trxLine);
            _transactionLines.Add(trxLine);
            Total = _transactionLines.Sum(s => s.UnitPrice * s.Quantity);
        }

    }
}
