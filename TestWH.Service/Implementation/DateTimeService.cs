using System;
using TestWH.Service.Contract;

namespace TestWH.Service.Implementation
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime NowUtc => DateTime.UtcNow;
    }
}