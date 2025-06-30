
DECLARE @StartDate DATE = CAST(GETDATE() AS DATE);
DECLARE @EndDate DATE = DATEADD(MONTH, 1, @StartDate);

-- טבלה זמנית עם כל העובדים (רופאים)
DECLARE @Workers TABLE (WorkerId INT);

INSERT INTO @Workers (WorkerId)
VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10);

-- מזהה תור שמתחיל מהמספר הבא אחרי המספר הגדול ביותר בטבלה
DECLARE @AppointmentId INT = (SELECT ISNULL(MAX(Id), 0) FROM dbo.Appointments) + 1;

WHILE @StartDate < @EndDate
BEGIN
    -- בדיקה האם היום אינו שישי (6) או שבת (7)
    IF DATEPART(WEEKDAY, @StartDate) NOT IN (6,7)
    BEGIN
        DECLARE @CurrentWorkerId INT;

        DECLARE worker_cursor CURSOR FOR
        SELECT WorkerId FROM @Workers;

        OPEN worker_cursor;
        FETCH NEXT FROM worker_cursor INTO @CurrentWorkerId;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            DECLARE @Hour INT = 18;
            WHILE @Hour <= 21
            BEGIN
                INSERT INTO dbo.Appointments (Id, WorkerId, CustomerId, AppointmentsTime, AppointmentsDuration)
                VALUES (
                    @AppointmentId,
                    @CurrentWorkerId,
                    NULL,
                    DATEADD(HOUR, @Hour, CAST(@StartDate AS DATETIME)),
                    45
                );

                SET @AppointmentId = @AppointmentId + 1;
                SET @Hour = @Hour + 1;
            END

            FETCH NEXT FROM worker_cursor INTO @CurrentWorkerId;
        END

        CLOSE worker_cursor;
        DEALLOCATE worker_cursor;
    END

    SET @StartDate = DATEADD(DAY, 1, @StartDate);
END
