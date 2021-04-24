using AngularDatatable.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWH.Service.Contract;
using TestWH.Service.Dto;

namespace TestWH.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase 
    {
        private readonly ITransactionService _TransactionService;

        public TransactionController(ITransactionService TransactionService)
        {
           _TransactionService = TransactionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction(TransactionDto input)
        {
            try
            {
            return Ok(await _TransactionService.CreateTransaction(input));

            }
            catch (Exception e)
            {

                throw;
            }
        }

  
       

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _TransactionService.GetAll());
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _TransactionService.GetById(Id));
        }

        [HttpPost]
        [Route("GetDataTablePaggedList")]
        public IActionResult GetDataTablePaggedList([FromBody] PagingRequest paging)
        {
            var res = _TransactionService.GetDataTablePaggedList(paging);
            return Ok(res);
        }

    }
}
