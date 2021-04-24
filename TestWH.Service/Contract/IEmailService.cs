using System.Threading.Tasks;
using TestWH.Domain.Settings;

namespace TestWH.Service.Contract
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailRequest);

    }
}
