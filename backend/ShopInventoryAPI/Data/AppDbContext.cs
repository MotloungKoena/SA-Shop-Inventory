using Microsoft.EntityFrameworkCore;
using ShopInventoryAPI.Models;

namespace ShopInventoryAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products{get;set;}
}