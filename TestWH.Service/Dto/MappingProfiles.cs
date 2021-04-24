using AngularDatatable.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Common.ValueObjects;
using TestWH.Domain.Entities.Partners;
using TestWH.Domain.Entities.Products;
using TestWH.Domain.Entities.Transactions;

namespace TestWH.Service.Dto
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductDto>()
                .ForMember(dest => dest.MassStr, src => src.MapFrom(s => s.Mass.ToString()))
                .ForMember(dest => dest.MassValue, src => src.MapFrom(s => s.Mass.Value))
                .ForMember(dest => dest.MassUnitSymbol, src => src.MapFrom(s => s.Mass.Unit.Symbol))
                .ReverseMap();
        

            CreateMap<ProductEditDto, Product>().ReverseMap();

           CreateMap(typeof(PagingResponse<>), typeof(PagingResponse<>));
           CreateMap(typeof(PagedResponse<>), typeof(PagedResponse<>));

            CreateMap<TransactionLineDo, TransactionLine>().ReverseMap();
     

            //CreateMap<TransactionDto, Transaction>()
            //     .ForMember(dest => dest.TransactionLines, src => src.MapFrom(s => s._transactionLines))

            //    .ReverseMap();   
            
            
            CreateMap<Transaction,TransactionDto>()
                 .ForMember(dest => dest.TransactionTypeStr, src => src.MapFrom(s => Enum.GetName(typeof(TransactionType), s.TransactionType)))
                 .ForMember(dest => dest.PartnerName, src => src.MapFrom(s => s.Partner.Name))
                 .ForMember(dest => dest.Total, src => src.MapFrom(s => s.TransactionLines.Sum(l=>(l.Quantity*l.UnitPrice))))
                 .ForMember(dest => dest.CreatedAt, src => src.MapFrom(s => s.CreatedAt.ToString("dd/mm/yyy")))
                .ReverseMap();


            CreateMap<PartnersDto, Partner>()
                .ForPath(dest => dest.Address.City, src => src.MapFrom(s => s.City))
                .ForPath(dest => dest.Address.Country, src => src.MapFrom(s => s.Country))
                .ForPath(dest => dest.Address.Street, src => src.MapFrom(s => s.Street))
                .ForPath(dest => dest.Address.ZipCode, src => src.MapFrom(s => s.ZipCode))
                .ReverseMap()
                    .ForMember(dest => dest.City, src => src.MapFrom(s => s.Address.City))
                    .ForMember(dest => dest.Country, src => src.MapFrom(s => s.Address.Country))
                    .ForMember(dest => dest.Street, src => src.MapFrom(s => s.Address.Street))
                    .ForMember(dest => dest.ZipCode, src => src.MapFrom(s => s.Address.ZipCode))
                   .ForMember(dest => dest._address, src => src.MapFrom(s => s.Address.ToString())) ;
          
            //CreateMap<AddressBook, AddressBookForReturnDto>()
            //      .ForMember(dest => dest.DepartmentName, src => src.MapFrom(s => s.Department.DepartmentName))
            //      .ForMember(dest => dest.Dob, src => src.MapFrom(s => s.Dob != null ? s.Dob.ToShortDateString() : ""))
            //      .ForMember(dest => dest.Age, src => src.MapFrom(s => DateTime.Now.Year - s.Dob.Year))
            //      .ForMember(dest => dest.TitleName, src => src.MapFrom(s => s.Title.TitleName));
  


        }
    }
}
