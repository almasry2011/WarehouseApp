﻿using System.ComponentModel.DataAnnotations;

namespace TestWH.Domain.Auth
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
