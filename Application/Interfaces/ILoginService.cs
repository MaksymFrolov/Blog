using Application.Models;

namespace Application.Interfaces
{
    public interface ILoginService
    {
        Task<AuthenticatedResponseModel> Login(LoginModel model);
    }
}
