DECLARE @StartDate DATETIME = GETDATE(); -- התחלת התאריכים (נכון להיום)
DECLARE @EndDate DATETIME = DATEADD(MONTH, 1, @StartDate); -- חודש קדימה
DECLARE @Duration INT = 45; -- משך כל תור (בminutes)

-- לולאת INSERT לתורים
WITH Days AS (
    SELECT @StartDate AS Date
    UNION ALL
    SELECT DATEADD(DAY, 1, Date)
    FROM Days
    WHERE Date < @EndDate
    AND DATENAME(WEEKDAY, Date) NOT IN ('Friday', 'Saturday') -- לא כולל שישי ושבת
),
Appointments AS (
    SELECT
        ROW_NUMBER() OVER (PARTITION BY Date ORDER BY Date) AS RowNum, -- פונקציה windowed כאן
        Date,
        WorkerId,
        DATEADD(MINUTE, (ROW_NUMBER() OVER (PARTITION BY Date ORDER BY Date) - 1) * @Duration, Date) AS AppointmentsTime -- חישוב הזמן של כל תור
    FROM Days
    CROSS JOIN (SELECT 1 AS WorkerId UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) Workers
)
INSERT INTO [dbo].[Appointments] ([Id], [WorkerId], [AppointmentsTime], [AppointmentsDuration])
SELECT
    ROW_NUMBER() OVER (ORDER BY Date) + 1000 AS Id, -- מחולל ID ייחודי
    WorkerId,
    AppointmentsTime,
    @Duration AS AppointmentsDuration
FROM Appointments
WHERE RowNum <= 4 -- רק 4 תורים ביום
OPTION (MAXRECURSION 0);
