USE [CPCII]
GO

/****** Object:  Table [interface].[Users]    Script Date: 05.08.2020 10:19:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [interface].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Login] [varchar](50) NOT NULL,
	[RoleId] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Surname] [varchar](50) NOT NULL,
	[Patronymic] [varchar](50) NULL,
	[Email] [varchar](100) NULL,
	[Comment] [varchar](max) NULL,
	[Company] [varchar](100) NULL,
	[Department] [varchar](100) NULL,
	[Position] [varchar](100) NULL,
	[Password] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Users_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


  INSERT INTO [CPCII].[interface].[UserRoles] (Id, Name) VALUES (1, 'Администратор');
  INSERT INTO [CPCII].[interface].[UserRoles] (Id, Name) VALUES (2, 'Пользователь');