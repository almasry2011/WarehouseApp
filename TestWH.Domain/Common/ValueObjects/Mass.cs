using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWH.Domain.Common.ValueObjects
{
    public class Mass
    {
        public float Value { get; init; }

        [Required]
        public MassUnit Unit { get; init; }

        public Mass()
        { }
        public Mass(float Value, string symbol)
        {
            this.Value = Value;
            this.Unit = MassUnit.FromSymbol(symbol);
        }
        public override string ToString()
        {
            return $"{Value} {Unit.Symbol}";
        }
    }
}
