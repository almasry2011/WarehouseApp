using AngularDatatable.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Service.Dto;

namespace TestWH.Service.Contract
{
    public  interface ITransactionService
    {
        Task<bool> CreateTransaction(TransactionDto input);
        Task<TransactionDto> GetById(int Id);
        Task<List<TransactionDto>> GetAll();
        PagingResponse<TransactionDto> GetDataTablePaggedList(PagingRequest paging);
    }
}
