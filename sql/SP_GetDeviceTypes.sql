USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[GetUsers]    Script Date: 04.08.2020 15:37:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[GetDeviceTypes]
	@user_id int = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT PT.PHONETYPEDESCR
		,COUNT(PS.PHONE_ID) AS TOTAL
	FROM PHONESSHORT PS
	LEFT JOIN PHONETYPES PT ON PS.PHONETYPE = PT.PHONETYPE_ID
	GROUP BY PT.PHONETYPEDESCR
	ORDER BY COUNT(PS.PHONE_ID) DESC

	--TODO: задействовать @user_id

END
