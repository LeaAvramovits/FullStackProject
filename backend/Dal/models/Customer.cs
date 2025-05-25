using System;
using System.Collections.Generic;

namespace Dal.models;

public  class Customer
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public double  Age { get; set; }

    public string Adress { get; set; } = null!;

    public string Phone { get; set; } = null!;
    
}
