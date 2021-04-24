using AngularDatatable.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Linq.Dynamic.Core;

using System.Text;
using System.Threading.Tasks;
using TestWH.Service.Dto;
using Microsoft.EntityFrameworkCore;

namespace TestWH.Service.Extensions
{
    public static class AppExtensions
    {

        public static IQueryable<T> Search<T>(this IQueryable<T> source, string searchTerm)
        {
            List<T> returnList = new List<T>();
            foreach (T t in source)
            {
                List<string> propertyValues = new List<string>();

                foreach (PropertyInfo pi in typeof(T).GetProperties())
                {
                    var pv= pi.GetValue(t, null);
                    if (pv != null)
                    {
                        propertyValues.Add(pv.ToString());
                    }
                }

                foreach (var item in propertyValues)
                {
                    if (item.ToLower().Contains(searchTerm.ToLower().Trim()))
                    {
                        returnList.Add(t);
                    }
                }
            }
            return returnList.Distinct().AsQueryable();
        }

         
        public static PagingResponse<T> MapToDataTable<T>(this IQueryable<T> query,  PagingRequest paging ) where T : class
        {
            var pagingResponse = new PagingResponse<T>()
            {
                Draw = paging.Draw
            };

            if (!paging.SearchCriteria.IsPageLoad)
            {
                if (!string.IsNullOrEmpty(paging.SearchCriteria.Filter))
                {
                    query = query.Search(paging.SearchCriteria.Filter);
                }
                var recordsTotal = query.Count();
                if (paging.Order != null)
                {
                    string sortBy = paging.Columns[paging.Order[0].Column].Data;
                    string sortDir = paging.Order[0].Dir.ToLower();
                    query = query.OrderBy($"{sortBy} {sortDir}");
                }
                pagingResponse.Data = query.Skip(paging.Start).Take(paging.Length).ToList();
                pagingResponse.RecordsTotal = recordsTotal;
                pagingResponse.RecordsFiltered = recordsTotal;
            }
            return pagingResponse;
        }


        public static async Task<PagedResponse<T>> GetPaggedAsync<T>(this IQueryable<T> queryable, int pageNumber, int pageSize, string search = "")  where T : class
        {
            
            var ListedData = await queryable.Skip((pageNumber * pageSize)).Take(pageSize).ToListAsync();

            var res = new PagedResponse<T>
            {
                Data = ListedData,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = ListedData.Count() / (pageSize),
                Search = search,
                TotalRecords = ListedData.Count()
            };

            return res;
        }


    }
}
