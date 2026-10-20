using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopInventoryAPI.Data;
using ShopInventoryAPI.Models;

namespace ShopInventoryAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User request)
    {
        //Check if email already exists
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest(new { message = "Email is already in use." });
        }

        //Create the user 
        var user = new User
        {
            ShopName = request.ShopName,
            Email = request.Email,
            PasswordHash = request.PasswordHash // this is plain text for testing purposes...hash the password !!
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registration successful!", shopName = user.ShopName });
    }
}