USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[CreateUser]    Script Date: 05.08.2020 14:31:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[DeleteUser]
	@id int = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE interface.Users OUTPUT DELETED.Id WHERE Id = @id

END
