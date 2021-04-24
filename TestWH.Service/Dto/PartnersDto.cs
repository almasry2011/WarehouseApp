using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestWH.Domain.Entities.Partners;

namespace TestWH.Service.Dto
{
   public class PartnersDto
    {
        public int  Id { get;  set; }
        public string Name { get;  set; }

    
        public string _address { get;  set; }

        [Required, MinLength(1), MaxLength(100)]
        public string Street { get; init; }

        [Required, MinLength(1), MaxLength(100)]
        public string City { get; init; }

        [Required, MinLength(1), MaxLength(100)]
        public string Country { get; init; }

        [Required, MinLength(1), MaxLength(100)]
        public string ZipCode { get; init; }

        private List<TransactionDto> _transactions { get; set; }

    }


 





}
