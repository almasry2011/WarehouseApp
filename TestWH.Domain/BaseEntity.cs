using System;
using System.ComponentModel.DataAnnotations;
using TestWH.Domain.Common;

namespace TestWH.Domain
{
    public class BaseEntity:IAudited
    {
        [Key]
        public int Id { get; private set; }

        public string CreatedBy { get;  set; }

        public DateTime CreatedAt { get;  set; }

        public string LastModifiedBy { get;  set; }
        public DateTime? LastModifiedAt { get;  set; }
    }
}
