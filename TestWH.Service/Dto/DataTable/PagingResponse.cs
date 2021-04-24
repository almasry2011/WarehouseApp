
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AngularDatatable.Models
{
    public class PagingResponse<T> where T : class
    {
        [JsonProperty(PropertyName = "draw")]
        public int Draw { get; set; }

        [JsonProperty(PropertyName = "recordsFiltered")]
        public int RecordsFiltered { get; set; }

        [JsonProperty(PropertyName = "recordsTotal")]
        public int RecordsTotal { get; set; }

        [JsonProperty(PropertyName = "data")]
        public IReadOnlyList<T> Data { get; set; }
    }
}
