using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokensController : ControllerBase
    {
        readonly ITokenService tokenService;

        public TokensController(ITokenService tokenService)
        {
            this.tokenService = tokenService;
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<TokenApiModel>> Refresh([FromBody] TokenApiModel tokenApiModel)
        {
            try
            {
                var model = await tokenService.Refresh(tokenApiModel);

                return Ok(model);
            }
            catch(BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("revoke"), Authorize]
        public async Task<ActionResult> Revoke([FromBody] TokenApiModel tokenApiModel)
        {
            try
            {
                await tokenService.Revoke(tokenApiModel);

                return Ok();
            }
            catch(BlogException ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
