USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[GetDeviceTypes]    Script Date: 05.08.2020 13:09:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[CreateUser]
	@login varchar(50) = NULL,
	@password varchar(50) = NULL,
	@roleId int = NULL,
	@name varchar(50) = NULL,
	@surname varchar(50) = NULL,
	@patronymic varchar(50) = NULL,
	@email varchar(50) = NULL,
	@comment varchar(max) = NULL,
	@company varchar(100) = NULL,
	@department varchar(100) = NULL,
	@position varchar(100) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF(@login IS NULL
		OR @password IS NULL
		OR @roleId IS NULL
		OR @name IS NULL
		OR @surname IS NULL)
	BEGIN
		SELECT 'Не был передан обязательный параметр для создания пользователя' AS MESSAGE, '0' AS RESULT
		RETURN;
	END

	IF EXISTS(SELECT Id FROM interface.Users WHERE Login = @login)
	BEGIN
		SELECT 'Пользователь с указанным логином уже существует' AS MESSAGE, '0' AS RESULT
		RETURN;
	END

	INSERT INTO interface.Users (Login, RoleId, Name, Surname, Patronymic, Email, Comment, Department, Position, Password)
	VALUES (@login, @roleId, @name, @surname, @patronymic, @email, @comment, @department, @position, @password)

	SELECT CAST(@@IDENTITY as varchar(50)) AS MESSAGE, '1' AS RESULT
END
