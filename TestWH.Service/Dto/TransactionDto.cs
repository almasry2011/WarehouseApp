using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Entities.Transactions;

namespace TestWH.Service.Dto
{
    public  class TransactionDto:EntityDto
    {
        public TransactionType TransactionType { get; set; }
        public string TransactionTypeStr { get; set; }
        public string PartnerName { get; set; }
        public decimal Total { get; set; }
        public int PartnerId { get; set; }

        public string CreatedBy { get; set; }

        public string CreatedAt { get; set; }

        public  PartnersDto _partner { get; set; }
        public List<TransactionLineDo> _transactionLines { get; set; }

    }

    public class TransactionLineDo
    {
        public int Id { get;  set; }

        [Required]
        public int ProductId { get; init; }
        public  ProductDto Product { get; init; }
 

        [Range(1, int.MaxValue)]
        public int Quantity { get; init; }

        [Required]
        public decimal UnitPrice { get; init; }
    }






}
