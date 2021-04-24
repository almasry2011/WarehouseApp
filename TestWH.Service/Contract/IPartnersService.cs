using AngularDatatable.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestWH.Service.Dto;

namespace TestWH.Service.Contract
{
    public interface IPartnersService
    {
        Task<bool> Create(PartnersDto input);
        Task<bool> Delete(int Id);
        Task<PagedResponse<PartnersDto>> GetAll(int pageNumber, int pageSize, string search);

        Task<PartnersDto> GetById(int Id);
        Task<bool> Update(PartnersDto input);
        PagingResponse<PartnersDto> GetDataTablePaggedList(PagingRequest paging);
    }
}