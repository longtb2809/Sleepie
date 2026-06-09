using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Sleepie.Backend.Models
{
    [Table("Products")]
    public class Product
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        // Lưu JSON array của các URL ảnh vào cột ImageUrl trong DB
        [Column("ImageUrl")]
        [JsonIgnore] // Ẩn trường raw này khỏi JSON trả về
        public string? ImageUrlJson { get; set; }

        // Trường này được serialize ra JSON cho Frontend, nhưng không ánh xạ vào DB
        [NotMapped]
        [JsonInclude] // Bắt buộc serialize dù là NotMapped
        public List<string> ImageUrls 
        {
            get 
            {
                if (string.IsNullOrEmpty(ImageUrlJson)) return new List<string>();
                try
                {
                    if (ImageUrlJson.TrimStart().StartsWith("["))
                        return System.Text.Json.JsonSerializer.Deserialize<List<string>>(ImageUrlJson) ?? new List<string>();
                    else
                        return new List<string> { ImageUrlJson };
                }
                catch
                {
                    return new List<string> { ImageUrlJson };
                }
            }
            set => ImageUrlJson = System.Text.Json.JsonSerializer.Serialize(value);
        }

        public int StockQuantity { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
