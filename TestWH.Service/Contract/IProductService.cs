using AngularDatatable.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestWH.Service.Dto;

namespace TestWH.Service.Contract
{
    public interface IProductService
    {
        Task<bool> Create(ProductCreateDto input);
        Task<bool> Delete(int Id);
        Task<PagedResponse<ProductDto>> GetAll(int pageNumber, int pageSize, string search = "");
        Task<ProductDto> GetById(int Id);
        Task<bool> Update(ProductEditDto input);
        PagingResponse<ProductDto> GetDataTablePaggedList(PagingRequest paging);
    }
}