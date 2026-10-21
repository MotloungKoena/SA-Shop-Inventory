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

    // [HttpPost("login")]
    // public async Task<IActionResult> Login([FromBody] User request)
    // {
    //     //Find user by email
    //     var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

    //     //Check if user exists and the plain text password matches
    //     if (user == null || user.PasswordHash != request.PasswordHash)
    //     {
    //         return Unauthorized(new { message = "Invalid email or password." });
    //     }

    //     //login successful
    //     return Ok(new
    //     {
    //         message = "Login successful!",
    //         shopName = user.ShopName,
    //         email = user.Email
    //     });
    // }



    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        //Find the user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        //If user doesn't exist, or password doesn't match
        if (user == null || user.PasswordHash != request.Password)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        return Ok(new
        {
            message = "Login successful!",
            shopName = user.ShopName
        });
    }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}