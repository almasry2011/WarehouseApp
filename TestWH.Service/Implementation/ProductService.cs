using AngularDatatable.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Common.ValueObjects;
using TestWH.Domain.Entities.Products;
using TestWH.Persistence;
using TestWH.Service.Contract;
using TestWH.Service.Dto;
using TestWH.Service.Extensions;

namespace TestWH.Service.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Create(ProductCreateDto input)
        {
            var product = new Product( input.Name, input.Description, input.Price,new Mass(input.MassValue,input.MassUnitSymbol), input.NumberInStock);
            var AddedProduct = await _context.Products.AddAsync(product);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? true : false;
        }


        public async Task<bool> Update(ProductEditDto input)
        {
            var orignal = await _context.Products.SingleOrDefaultAsync(s => s.Id == input.Id);

            var MappedProduct = _mapper.Map(input, orignal);

            var UpdatedProduct = _context.Products.Update(MappedProduct);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? true : false;
        }


        public async Task<ProductDto> GetById(int Id)
        {
            var orignal = await _context.Products.SingleOrDefaultAsync(s => s.Id == Id);
            var MappedProduct = _mapper.Map<ProductDto>(orignal);
            return MappedProduct;
        }


        
        public async Task<PagedResponse<ProductDto>> GetAll(int pageNumber,int pageSize ,string search="")
        {

            var data = await _context.Products.GetPaggedAsync(pageNumber, pageSize, search);
            var MappedData = _mapper.Map<PagedResponse<ProductDto>>(data);
            return MappedData;
            //var data =  _context.Products.AsQueryable();
            //if (!string.IsNullOrEmpty(search))
            //{
            //   data= data.Where(s => s.Name.ToLower().Contains(search));
            //}
            //var ListedData = await data.Skip((pageNumber * pageSize)).Take(pageSize).ToListAsync();
            //var MappedProducts = _mapper.Map<List<ProductDto>>(ListedData);

            //var res = new PagedResponse<ProductDto>
            //{
            //    Data = MappedProducts,
            //    PageNumber = pageNumber,
            //    PageSize = pageSize,
            //    TotalPages = data.Count() / (pageSize),
            //    Search = search,
            //    TotalRecords = data.Count()
            //};

            //return res;
        }
         

        public async Task<bool> Delete(int Id)
        {
            var orignal = await _context.Products.SingleOrDefaultAsync(s => s.Id == Id);
            var RemovedProduct = _context.Products.Remove(orignal);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? true : false;
        }

        public PagingResponse<ProductDto> GetDataTablePaggedList(PagingRequest paging)
        {
            var data = _context.Products.AsQueryable().MapToDataTable(paging);
            var MappingResult = _mapper.Map<PagingResponse<ProductDto>>(data);
            return MappingResult;
        }
    }
}
