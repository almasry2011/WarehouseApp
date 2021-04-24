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
    public class PartnersController : ControllerBase 
    {
        private readonly IPartnersService _PartnersService;

        public PartnersController(IPartnersService PartnersService)
        {
           _PartnersService = PartnersService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(PartnersDto input)
        {
            try
            {
            return Ok(await _PartnersService.Create(input));

            }
            catch (Exception e)
            {

                throw;
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            return Ok( await _PartnersService.Delete(Id) );
        }

      

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string search = "")
        {
            return Ok(await _PartnersService.GetAll(pageNumber, pageSize, search = ""));
        }





        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _PartnersService.GetById(Id));
        }


        [HttpPut]
        public async Task<IActionResult> Update(PartnersDto input)
        {
            return Ok(await _PartnersService.Update(input));
        }

        [HttpPost]
        [Route("GetDataTablePaggedList")]
        public IActionResult GetDataTablePaggedList([FromBody] PagingRequest paging)
        {
            var res = _PartnersService.GetDataTablePaggedList(paging);
            return Ok(res);
        }


    }
}
