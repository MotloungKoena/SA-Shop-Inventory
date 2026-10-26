using System.ComponentModel.DataAnnotations;

namespace ShopInventoryAPI.Models;

public class Product
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public decimal CostPrice { get; set; }
    public decimal SellingPrice { get; set; }
    
    public int StockQuantity { get; set; } 
}