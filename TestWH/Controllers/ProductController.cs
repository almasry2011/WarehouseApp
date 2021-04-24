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
    [Route("api/[controller]")]
    public class ProductController : ControllerBase 
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
           _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductCreateDto input)
        {
            try
            {
            return Ok(await _productService.Create(input));

            }
            catch (Exception e)
            {

                throw;
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            return Ok( await _productService.Delete(Id) );
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string search = "")
        {
            return Ok(await _productService.GetAll( pageNumber,  pageSize,  search = ""));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _productService.GetById(Id));
        }


        [HttpPut]
        public async Task<IActionResult> Update(ProductEditDto input)
        {
            return Ok(await _productService.Update(input));
        }

        [HttpPost]
        [Route("GetDataTablePaggedList")]
        public IActionResult GetDataTablePaggedList([FromBody] PagingRequest paging)
        {
            var res = _productService.GetDataTablePaggedList(paging);
            return Ok(res);
        }


    }
}
