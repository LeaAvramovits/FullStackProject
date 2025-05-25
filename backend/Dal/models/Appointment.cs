using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Appointment
{
    public int Id { get; set; }

    public int WorkerId { get; set; }

    public int? CustomerId { get; set; }

    public DateTime AppointmentsTime { get; set; }

    public int AppointmentsDuration { get; set; }
}
