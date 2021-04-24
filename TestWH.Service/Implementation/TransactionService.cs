using AngularDatatable.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain;
using TestWH.Domain.Entities.Transactions;
using TestWH.Persistence;
using TestWH.Service.Contract;
using TestWH.Service.Dto;
using TestWH.Service.Extensions;

namespace TestWH.Service.Implementation
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TransactionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateTransaction(TransactionDto input)
        {
            try
            {
                var partener = await _context.Partners.AsNoTracking().SingleOrDefaultAsync(s => s.Id == input.PartnerId);
                _context.Entry(partener).State =EntityState.Unchanged;

                var transaction = new Transaction(partener, input.TransactionType);

                //var mapped= _mapper.Map<Transaction>(input);

                foreach (var item in input._transactionLines)
                {
                    var product = await _context.Products.SingleOrDefaultAsync(s => s.Id == item.ProductId);
                    transaction.AddTransactionLine(product, item.Quantity);
                }

                var AddedTransaction = await _context.Transactions.AddAsync(transaction);

 
                var res = await _context.SaveChangesAsync();
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        public async Task<TransactionDto> GetById(int Id)
        {
            var orignal = await _context.Transactions
                                                    .Include(s=>s.Partner)
                                                    .Include(s => s.TransactionLines)
                                                    .ThenInclude(s=>s.Product)
                                                    .SingleOrDefaultAsync(s => s.Id == Id);

           var MappedTransaction = _mapper.Map<TransactionDto>(orignal);
            return MappedTransaction;
        }


        public async Task<List<TransactionDto>> GetAll()
        {
            var data =   _context.Transactions
                  .Include(s => s.TransactionLines)
                  .Include(s => s.Partner);
           
            var sql = data.ToQueryString();
            var MappedTransactions = _mapper.Map<List<TransactionDto>>(await data.ToListAsync());
            return MappedTransactions;
        }

        public PagingResponse<TransactionDto> GetDataTablePaggedList(PagingRequest paging)
        {
            var data = _context.Transactions
                .Include(s=>s.TransactionLines).Include(s=>s.Partner).AsQueryable().MapToDataTable(paging);
            var MappingResult = _mapper.Map<PagingResponse<TransactionDto>>(data);
            return MappingResult;
        }




    }
}
