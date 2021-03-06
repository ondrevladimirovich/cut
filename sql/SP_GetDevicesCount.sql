USE [CPCII]
GO
/****** Object:  StoredProcedure [interface].[GetDevices]    Script Date: 10.08.2020 10:40:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [interface].[GetDevicesCount]
	@user_id int = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT COUNT(D.PHONE_ID) AS DEVICES_TOTAL
	FROM
	(
		SELECT PT.PHONETYPEDESCR
			,0 AS AVAILABILITY --TODO
			,PS.PHONE_ID
			,PS.ABC_NUMB
			,CLT.ID AS LINE_TYPE_ID
			,CLT.DESCRIPTION
			,PS.SW_VERSION
			,ISNULL(CAST(PA.POSTCODE AS VARCHAR), '') 
				+ CASE WHEN PA.REGION IS NULL THEN '' ELSE ' ' + PA.REGION END 
				+ CASE WHEN PA.MO_AREA IS NULL THEN '' ELSE ' ' + PA.MO_AREA END 
				+ CASE WHEN PA.MO_SETTLEMENT IS NULL THEN '' ELSE ' ' + PA.MO_SETTLEMENT END 
				+ CASE WHEN PA.LOCALITY IS NULL THEN '' ELSE ' ' + PA.LOCALITY END 
				+ CASE WHEN PA.STREET IS NULL THEN '' ELSE ' ' + PA.STREET END 
				+ CASE WHEN PA.HOUSE IS NULL THEN '' ELSE ' ' + PA.HOUSE END 
				+ CASE WHEN PA.NOTE IS NULL THEN '' ELSE ' ' + PA.NOTE END 
			AS ADDRESS
			,0 AS LAST --TODO
			,1 AS STATUS --TODO
			,0 AS PHOTO_COUNT --TODO
		FROM PHONESSHORT PS
		LEFT JOIN PHONETYPES PT ON PS.PHONETYPE = PT.PHONETYPE_ID
		LEFT JOIN CONNECTION_LINE_TYPES CLT ON PS.CONNECTION_LINE_TYPE = CLT.ID
		LEFT JOIN PHONES_ADDRESSES PA ON PS.PHONE_ID = PA.PHONE_ID
	) D

	--TODO: задействовать @user_id

END
