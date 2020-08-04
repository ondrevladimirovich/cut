USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[Login]    Script Date: 04.08.2020 14:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[GetUsers]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT [Id]
      ,[Login]
      ,[RoleId]
      ,[Name]
      ,[Surname]
      ,[Patronymic]
      ,[Email]
      ,[Comment]
      ,[Company]
      ,[Department]
      ,[Position]
	FROM [interface].[Users]
END
