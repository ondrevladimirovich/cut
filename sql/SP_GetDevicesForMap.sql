USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[GetRegions]    Script Date: 05.08.2020 15:37:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[GetDevicesForMap]
	@user_id int = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT PS.PHONE_ID
		,ISNULL(CAST(PA.POSTCODE AS VARCHAR), '') 
			+ CASE WHEN PA.REGION IS NULL THEN '' ELSE ' ' + PA.REGION END 
			+ CASE WHEN PA.MO_AREA IS NULL THEN '' ELSE ' ' + PA.MO_AREA END 
			+ CASE WHEN PA.MO_SETTLEMENT IS NULL THEN '' ELSE ' ' + PA.MO_SETTLEMENT END 
			+ CASE WHEN PA.LOCALITY IS NULL THEN '' ELSE ' ' + PA.LOCALITY END 
			+ CASE WHEN PA.STREET IS NULL THEN '' ELSE ' ' + PA.STREET END 
			+ CASE WHEN PA.HOUSE IS NULL THEN '' ELSE ' ' + PA.HOUSE END 
			+ CASE WHEN PA.NOTE IS NULL THEN '' ELSE ' ' + PA.NOTE END 
		AS PHONE_ADDRESS
		,CAST(PA.COORD_LAT AS VARCHAR(16)) LATITUDE
		,CAST(PA.COORD_LON AS VARCHAR(16)) LONGITUDE
	FROM PHONESSHORT PS
	LEFT JOIN PHONES_ADDRESSES PA ON PS.PHONE_ID = PA.PHONE_ID

	--TODO: задействовать @user_id

END
