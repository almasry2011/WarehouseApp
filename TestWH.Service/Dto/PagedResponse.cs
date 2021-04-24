using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWH.Service.Dto
{
     public class PagedResponse<T> where T :class
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }

        public string Search { get; set; }
        public IReadOnlyCollection<T> Data { get; set; }
  
     
    }
}
