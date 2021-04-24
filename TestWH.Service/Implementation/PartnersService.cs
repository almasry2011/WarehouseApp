using AngularDatatable.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Entities.Partners;
using TestWH.Persistence;
using TestWH.Service.Contract;
using TestWH.Service.Dto;
using TestWH.Service.Extensions;

namespace TestWH.Service.Implementation
{
    public class PartnersService : IPartnersService
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PartnersService(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Create(PartnersDto input)
        {

            var mapped= _mapper.Map<Partner>(input);
            //var Partners = new Partner( input.Name, new Address(input.Street,input.City,input.Country,input.ZipCode));
            var AddedPartners = await _context.Partners.AddAsync(mapped);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? true : false;
        }


        public async Task<bool> Update(PartnersDto input)
        {
            var orignal = await _context.Partners.SingleOrDefaultAsync(s => s.Id == input.Id);
            var MappedPartners = _mapper.Map(input, orignal);
            var UpdatedPartners = _context.Partners.Update(MappedPartners);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? true : false;
        }


        public async Task<PartnersDto> GetById(int Id)
        {
            var orignal = await _context.Partners.SingleOrDefaultAsync(s => s.Id == Id);
           var MappedPartners = _mapper.Map<PartnersDto>(orignal);
            return MappedPartners;
        }


      
        public async Task<PagedResponse<PartnersDto>> GetAll(int pageNumber, int pageSize, string search)
        {
            var data = await _context.Partners.GetPaggedAsync(pageNumber, pageSize, search);
            var MappedData = _mapper.Map<PagedResponse<PartnersDto>>(data);
            return MappedData;
        }

        public async Task<bool> Delete(int Id)
        {
            var orignal = await _context.Partners.SingleOrDefaultAsync(s => s.Id == Id);
            var RemovedPartners = _context.Partners.Remove(orignal);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? true : false;
        }

        public PagingResponse<PartnersDto> GetDataTablePaggedList(PagingRequest paging)
        {
            var data = _context.Partners.AsQueryable().MapToDataTable(paging);
            var MappingResult = _mapper.Map<PagingResponse<PartnersDto>>(data);
            return MappingResult;
        }

     
    }
}
