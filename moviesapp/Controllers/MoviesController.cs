using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using moviesapp.Models;

namespace moviesapp.Controllers
{
    [Produces("application/json")]
    [Route("api/Movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly moviesContext _context;

        public MoviesController(moviesContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [Route("~/api/GetAllMovies")]
        [HttpGet]
       // public IEnumerable<Movies> GetMovies()
        public async Task<ActionResult<IEnumerable<Movies>>> GetMovies()
        {
            //return _context.Movies.ToList();
            return await _context.Movies.ToListAsync();
        }

        // GET: api/Movies/5
        [Route("~/api/GetMovie")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Movies>> GetMovies(int id)
        {
            var movies = await _context.Movies.FindAsync(id);

            if (movies == null)
            {
                return NotFound();
            }

            return movies;
        }

        // PUT: api/Movies/5
        //[HttpPut("{id}")]
        [Route("~/api/UpdateMovie")]
        public async Task<IActionResult> PutMovies(int id, Movies movies)
        {
            if (id != movies.id)
            {
                return BadRequest();
            }

            _context.Entry(movies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MoviesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Movies
        [Route("~/api/AddMovie")]
        [HttpPost]
        public async Task<ActionResult<Movies>> PostMovies(Movies movies)
        {
            _context.Movies.Add(movies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovies", new { id = movies.id }, movies);
        }

        // DELETE: api/Movies/5
        [Route("~/api/DeleteMovie/{id}")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movies>> DeleteMovies(int id)
        {
            var movies = await _context.Movies.FindAsync(id);
            if (movies == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movies);
            await _context.SaveChangesAsync();

            return movies;
        }

        private bool MoviesExists(int id)
        {
            return _context.Movies.Any(e => e.id == id);
        }
    }
}
