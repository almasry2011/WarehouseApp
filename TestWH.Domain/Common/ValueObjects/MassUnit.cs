using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWH.Domain.Common.ValueObjects
{
    public class MassUnit
    {
        public string Name { get; init; }
        public string Symbol { get; init; }
        public float ConversionRateToGram { get; init; }

        public MassUnit()
        {}
        private MassUnit(string Name, string Symbol, float ConversionRateToGram)
        {
            this.Name = Name;
            this.Symbol = Symbol;
            this.ConversionRateToGram = ConversionRateToGram;
        }
 
        public static readonly MassUnit Tonne = new MassUnit( "tonne","t", 1000000f );
        public static readonly MassUnit Kilogram = new MassUnit("kilogram",  "kg",  1000f );
        public static readonly MassUnit Gram = new MassUnit( "gram",  "g", 1f );
        public static readonly MassUnit Pound = new MassUnit(  "pound",  "lb",  453.59237f );

        public static MassUnit FromSymbol(string unitSymbol)
        {
            return unitSymbol.ToLower() switch
            {
                "t"  => Tonne,
                "kg" => Kilogram,
                "g" => Gram,
                "lb" => Pound,
                _ => throw new ArgumentException($"Uknown {nameof(MassUnit)} value '{unitSymbol}'.", nameof(unitSymbol))

            };
}
    }
}
