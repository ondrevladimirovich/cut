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
CREATE PROCEDURE [interface].[GetRegions]
	@user_id int = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT SS.DESCRIPTION
	,COUNT(PS.PHONE_ID) AS TOTAL
	,A.AVAILABLE
	FROM PHONESSHORT PS
	LEFT JOIN SUBSYSTEMS SS ON PS.CONTROLSYSTEM_ID = SS.CONTROLSYSTEM_ID
		AND PS.SUB_SYSTEM_ID = SS.SUB_SYSTEM_ID
	LEFT JOIN
	(
		SELECT COUNT(History.PHONE_ID) AS AVAILABLE
			,History.SUB_SYSTEM_ID
		FROM
		(
		SELECT PS.PHONE_ID
			,PS.SUB_SYSTEM_ID
			,MIN(PH.ERRORCODE) AS ERRORCODE
			,MAX(PH.REG_DATE_TIME) AS REG_DATE_TIME
		FROM PHONESSHORT PS
		LEFT JOIN PHONES_HISTORY PH ON PS.CONTROLSYSTEM_ID = PH.CONTROLSYSTEM_ID
			AND PS.SUB_SYSTEM_ID = PH.SUB_SYSTEM_ID
			AND PS.LOCAL_PHONE_ID = PH.PHONE_ID
		WHERE PH.REG_DATE_TIME >= '23.01.2019 00:00:00' --TODO: ПОТОМ ПОМЕНЯТЬ НА GETDATE и GETDATE - 1 соотвественно; сейчас в БД нет свежих данных
			AND PH.REG_DATE_TIME < '24.01.2019 12:00:00'
		GROUP BY PS.PHONE_ID, PS.SUB_SYSTEM_ID
		) AS History
		LEFT JOIN FAILMESSAGES FM ON History.ERRORCODE = FM.MESSAGECODE
		WHERE FM.CRITICAL = 0
		GROUP BY History.SUB_SYSTEM_ID
	) AS A ON PS.SUB_SYSTEM_ID = A.SUB_SYSTEM_ID
	GROUP BY SS.DESCRIPTION, A.AVAILABLE

	--TODO: задействовать @user_id

END
