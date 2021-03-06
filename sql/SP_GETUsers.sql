USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[GetUsers]    Script Date: 05.08.2020 10:20:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [interface].[GetUsers]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT U.Id
      ,U.Login
      ,U.RoleId
      ,U.Name
      ,U.Surname
      ,U.Patronymic
      ,U.Email
      ,U.Comment
      ,U.Company
      ,U.Department
      ,U.Position
	  ,UR.Name AS RoleName
	FROM [interface].[Users] U
	LEFT JOIN [interface].[UserRoles] UR ON U.RoleId = UR.Id
END
