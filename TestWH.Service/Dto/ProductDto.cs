using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Common.ValueObjects;

namespace TestWH.Service.Dto
{
    public class ProductBaseDto:EntityDto{
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int NumberInStock { get; set; }
    }

    public class ProductDto: ProductBaseDto
    {
       public string MassStr { get; set; }
        public float MassValue { get; init; }
        public string MassUnitSymbol { get; init; }
    }

        public class ProductCreateDto: ProductBaseDto
        {
        public float MassValue { get; init; }
        public string MassUnitSymbol { get; init; }
    }    
        
        public class ProductEditDto: ProductBaseDto
        {
        public float MassValue { get; init; }
        public string MassUnitSymbol { get; init; }
     }

  

}
