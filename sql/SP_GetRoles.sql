USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[GetUsers]    Script Date: 05.08.2020 11:42:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[GetRoles]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT UR.Id
	  ,UR.Name
	FROM [interface].[UserRoles] UR
END
