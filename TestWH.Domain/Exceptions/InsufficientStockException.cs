using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Entities.Products;

namespace TestWH.Domain.Exceptions
{
   public class InsufficientStockException:Exception
    {
        public InsufficientStockException(Product product,int requestedQuantity ) : base($"Quantity requested for sale ({requestedQuantity}) " +
            $"from product '{product.Name}' exceeds number in stock ({product.NumberInStock}).") 
        {
           
        }

    }
}
