using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [Required]
    [EmailAddress(ErrorMessage = "Invalid email addres")]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
