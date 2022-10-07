using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        readonly IPersonService personService;

        public PeopleController(IPersonService personService)
        {
            this.personService = personService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonModel>>> Get()
        {
            return Ok(await personService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonModel>> GetById(int id)
        {
            var person = await personService.GetByIdAsync(id);

            if (person is null)
                return NotFound("Person not found.");

            return Ok(person);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PersonModel model)
        {
            try
            {
                await personService.AddAsync(model);

                return Ok(model);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] PersonModel model)
        {
            if (id != model.Id)
                return BadRequest("Ids don't match.");

            try
            {
                await personService.UpdateAsync(model);

                return Ok(model);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await personService.DeleteAsync(id);

            return Ok();
        }
    }
}
