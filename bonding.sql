-- -------------------------------------------------------------
-- TablePlus 5.1.0(468)
--
-- https://tableplus.com/
--
-- Database: bonding
-- Generation Time: 2022-11-27 00:10:43.7810
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `award_tip`;
CREATE TABLE `award_tip` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '標題',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容',
  `publishDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '排程日期',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft' COMMENT '狀態',
  PRIMARY KEY (`id`),
  KEY `IDX_dae815d71dfe420302661f46e6` (`createTime`),
  KEY `IDX_db49b86f2dd640c40e9fab804c` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `award_tip_category`;
CREATE TABLE `award_tip_category` (
  `awardTipId` int NOT NULL,
  `industryCategoryId` int NOT NULL,
  PRIMARY KEY (`awardTipId`,`industryCategoryId`),
  KEY `IDX_87f84a1fdcf928032b0dd22605` (`awardTipId`),
  KEY `IDX_aa35d86677050492d195ce958f` (`industryCategoryId`),
  CONSTRAINT `FK_87f84a1fdcf928032b0dd22605e` FOREIGN KEY (`awardTipId`) REFERENCES `award_tip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_aa35d86677050492d195ce958f9` FOREIGN KEY (`industryCategoryId`) REFERENCES `industry_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `award_tip_collection`;
CREATE TABLE `award_tip_collection` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `awardTipId` int DEFAULT NULL COMMENT 'ID',
  `userId` int DEFAULT NULL COMMENT 'ID',
  PRIMARY KEY (`id`),
  KEY `IDX_eb8cd0d3bab0963599c12aa42b` (`createTime`),
  KEY `IDX_a84fa02b5a72f191ff1047a0a2` (`updateTime`),
  KEY `FK_ca917bcb2a3d0bb5dbec70ffdff` (`awardTipId`),
  KEY `FK_fc0300ae03194150782492b0980` (`userId`),
  CONSTRAINT `FK_ca917bcb2a3d0bb5dbec70ffdff` FOREIGN KEY (`awardTipId`) REFERENCES `award_tip` (`id`),
  CONSTRAINT `FK_fc0300ae03194150782492b0980` FOREIGN KEY (`userId`) REFERENCES `base_sys_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `award_tip_view`;
CREATE TABLE `award_tip_view` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `userId` int DEFAULT NULL COMMENT 'ID',
  `awardTipId` int DEFAULT NULL COMMENT 'ID',
  PRIMARY KEY (`id`),
  KEY `IDX_bbcccb0fee5e8f861d80bf7c95` (`createTime`),
  KEY `IDX_d1767b7c075fb2bbdae6ed329e` (`updateTime`),
  KEY `FK_35cea6be22a229c502cb93e0a92` (`awardTipId`),
  KEY `FK_8fd6c2ad439a21e4bc368a97930` (`userId`),
  CONSTRAINT `FK_35cea6be22a229c502cb93e0a92` FOREIGN KEY (`awardTipId`) REFERENCES `award_tip` (`id`),
  CONSTRAINT `FK_8fd6c2ad439a21e4bc368a97930` FOREIGN KEY (`userId`) REFERENCES `base_sys_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_conf`;
CREATE TABLE `base_sys_conf` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `cKey` varchar(255) NOT NULL COMMENT '配置键',
  `cValue` varchar(255) NOT NULL COMMENT '配置值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9be195d27767b4485417869c3a` (`cKey`),
  KEY `IDX_905208f206a3ff9fd513421971` (`createTime`),
  KEY `IDX_4c6f27f6ecefe51a5a196a047a` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_department`;
CREATE TABLE `base_sys_department` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `name` varchar(255) NOT NULL COMMENT '部门名称',
  `parentId` bigint DEFAULT NULL COMMENT '上级部门ID',
  `orderNum` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  KEY `IDX_be4c53cd671384fa588ca9470a` (`createTime`),
  KEY `IDX_ca1473a793961ec55bc0c8d268` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_menu`;
CREATE TABLE `base_sys_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `parentId` bigint DEFAULT NULL COMMENT '父菜单ID',
  `name` varchar(255) NOT NULL COMMENT '菜单名称',
  `router` varchar(255) DEFAULT NULL COMMENT '菜单地址',
  `perms` varchar(255) DEFAULT NULL COMMENT '权限标识',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '类型 0：目录 1：菜单 2：按钮',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `orderNum` int NOT NULL DEFAULT '0' COMMENT '排序',
  `viewPath` varchar(255) DEFAULT NULL COMMENT '视图地址',
  `keepAlive` tinyint NOT NULL DEFAULT '1' COMMENT '路由缓存',
  `isShow` tinyint NOT NULL DEFAULT '1' COMMENT '是否显示',
  PRIMARY KEY (`id`),
  KEY `IDX_05e3d6a56604771a6da47ebf8e` (`createTime`),
  KEY `IDX_d5203f18daaf7c3fe0ab34497f` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_param`;
CREATE TABLE `base_sys_param` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `keyName` varchar(255) NOT NULL COMMENT '键位',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `data` text NOT NULL COMMENT '数据',
  `dataType` tinyint NOT NULL DEFAULT '0' COMMENT '数据类型 0:字符串 1：数组 2：键值对',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `IDX_cf19b5e52d8c71caa9c4534454` (`keyName`),
  KEY `IDX_7bcb57371b481d8e2d66ddeaea` (`createTime`),
  KEY `IDX_479122e3bf464112f7a7253dac` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_role`;
CREATE TABLE `base_sys_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `userId` varchar(255) NOT NULL COMMENT '用户ID',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `label` varchar(50) DEFAULT NULL COMMENT '角色标签',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `relevance` int NOT NULL DEFAULT '1' COMMENT '数据权限是否关联上下级',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_469d49a5998170e9550cf113da` (`name`),
  UNIQUE KEY `IDX_f3f24fbbccf00192b076e549a7` (`label`),
  KEY `IDX_6f01184441dec49207b41bfd92` (`createTime`),
  KEY `IDX_d64ca209f3fc52128d9b20e97b` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_role_department`;
CREATE TABLE `base_sys_role_department` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  `departmentId` bigint NOT NULL COMMENT '部门ID',
  PRIMARY KEY (`id`),
  KEY `IDX_e881a66f7cce83ba431cf20194` (`createTime`),
  KEY `IDX_cbf48031efee5d0de262965e53` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_role_menu`;
CREATE TABLE `base_sys_role_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  `menuId` bigint NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`),
  KEY `IDX_3641f81d4201c524a57ce2aa54` (`createTime`),
  KEY `IDX_f860298298b26e7a697be36e5b` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=912 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_user`;
CREATE TABLE `base_sys_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `departmentId` bigint DEFAULT NULL COMMENT '部門ID',
  `username` varchar(100) NOT NULL COMMENT '用戶名',
  `password` varchar(255) NOT NULL COMMENT '密碼',
  `passwordV` int NOT NULL DEFAULT '1' COMMENT '密碼版本, 作用是改完密碼, 讓原來的token失效',
  `phone` varchar(20) DEFAULT NULL COMMENT '電話(帶區碼)',
  `email` varchar(255) DEFAULT NULL COMMENT 'Email',
  `socketId` varchar(255) DEFAULT NULL COMMENT 'socketId',
  `createBy` bigint NOT NULL COMMENT '建立用戶ID',
  `updateBy` bigint NOT NULL COMMENT '更新用戶ID',
  `status` enum('normal','suspend','delete') NOT NULL DEFAULT 'normal',
  `firstName` varchar(255) NOT NULL COMMENT '姓',
  `lastName` varchar(255) NOT NULL COMMENT '名',
  `idCard` varchar(255) DEFAULT NULL COMMENT '身分證',
  `birthday` varchar(255) DEFAULT NULL COMMENT '生日',
  `headImg` varchar(255) DEFAULT NULL COMMENT '頭像',
  `gender` enum('male','female','intersex') NOT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '備注',
  `intro` varchar(255) DEFAULT NULL COMMENT '簡介',
  `deleteBy` bigint DEFAULT NULL COMMENT '刪除用戶ID',
  `deleteTime` datetime(6) DEFAULT NULL COMMENT '刪除時間',
  `emailVerify` enum('unverified','verify','pending') NOT NULL DEFAULT 'unverified',
  `identifyVerify` enum('unverified','pending','rejected','verify') NOT NULL DEFAULT 'unverified',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_469ad55973f5b98930f6ad627b` (`username`),
  UNIQUE KEY `IDX_400a3f7d29883f1ace87ff93d3` (`email`),
  UNIQUE KEY `IDX_9ec6d7ac6337eafb070e4881a8` (`phone`),
  UNIQUE KEY `IDX_a8903023c24cf63cdb21db4cd8` (`idCard`),
  KEY `IDX_0cf944da378d70a94f5fefd803` (`departmentId`),
  KEY `IDX_ca8611d15a63d52aa4e292e46a` (`createTime`),
  KEY `IDX_a0f2f19cee18445998ece93ddd` (`updateTime`),
  KEY `IDX_d264b9f0e4ae49a17a7150d93e` (`createBy`),
  KEY `IDX_06ca72f509a1ac2cf339c9d917` (`updateBy`),
  KEY `IDX_2313dc36bdabec27461abe0264` (`deleteBy`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_user_identity`;
CREATE TABLE `base_sys_user_identity` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `positive` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '正面照',
  `negative` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '背面照',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  `createBy` bigint NOT NULL COMMENT '建立用戶ID',
  `updateBy` bigint NOT NULL COMMENT '更新用戶ID',
  `idCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '身分證號',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_937215ab83a5d4ea78a9c95328` (`userId`),
  KEY `IDX_a0da48c942110aeaced4cb0bbe` (`createTime`),
  KEY `IDX_d7c1586a1672effb311225f3d1` (`updateTime`),
  KEY `IDX_7b94ece1304851fe39cab141d2` (`createBy`),
  KEY `IDX_bc39816e16e7da41e040ba5bf0` (`updateBy`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `base_sys_user_role`;
CREATE TABLE `base_sys_user_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `userId` bigint NOT NULL COMMENT '用户ID',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`),
  KEY `IDX_fa9555e03e42fce748c9046b1c` (`createTime`),
  KEY `IDX_3e36c0d2b1a4c659c6b4fc64b3` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `collection_article`;
CREATE TABLE `collection_article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_58d24a12c7c68fabafae201fe6` (`createTime`),
  KEY `IDX_f669b717c78d169aa15b210ac7` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `collection_award_tip`;
CREATE TABLE `collection_award_tip` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `awardTipId` bigint NOT NULL COMMENT '文章ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_304d238e534bea8304c9dfeea0` (`createTime`),
  KEY `IDX_e79c40c96f0bbd11b7c9a4295a` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `collection_tip`;
CREATE TABLE `collection_tip` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `tipId` bigint NOT NULL COMMENT '小知識ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_45fcdb95d6b5d636f814fd1d33` (`createTime`),
  KEY `IDX_6d49b67b022e19c26902cbe79b` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `industry_category`;
CREATE TABLE `industry_category` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分類名稱',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分類描述',
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分類代稱',
  `parentId` int DEFAULT NULL COMMENT '上層分類',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Icon',
  `orderNum` int DEFAULT NULL COMMENT '排序號',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9f26e3c0d649615ec7849aea05` (`name`),
  UNIQUE KEY `IDX_e1ac4d7245b7ddca94c319ddb6` (`slug`),
  KEY `IDX_81fc5e3804320468d01bf78ee9` (`createTime`),
  KEY `IDX_30a9d37811e3ccea0e65d93fc0` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_article`;
CREATE TABLE `news_article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '標題',
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '縮圖',
  `commentOpen` tinyint NOT NULL DEFAULT '1' COMMENT '開啟評論',
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '代稱',
  `publishTime` datetime DEFAULT NULL COMMENT '發布時間',
  `createBy` bigint NOT NULL COMMENT '建立用戶ID',
  `updateBy` bigint NOT NULL COMMENT '更新用戶ID',
  `deleteBy` bigint DEFAULT NULL COMMENT '刪除用戶ID',
  `deleteTime` datetime(6) DEFAULT NULL COMMENT '刪除時間',
  `status` enum('draft','pending','reject','published','delete','schedule') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'meta標題',
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '完整文章',
  `metaDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'meta描述',
  `isTop` tinyint NOT NULL DEFAULT '0' COMMENT '置頂新聞',
  `isHot` tinyint NOT NULL DEFAULT '0' COMMENT '熱門新聞',
  `type` enum('normal','video') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `videoUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '影片網址',
  `content_preview` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '預覽內容',
  `excerpt` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '摘錄',
  `authorAvatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '作者頭像',
  `authorName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作者姓名',
  `authorIntro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '作者簡介',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c6bbfb15842493169f3e616fab` (`slug`),
  KEY `IDX_b7b4846ec5875b3dc81f5ac7f4` (`createTime`),
  KEY `IDX_902afd9ace5423046d21f494f0` (`updateTime`),
  KEY `IDX_1d3e381e731aa621ec5a603344` (`createBy`),
  KEY `IDX_bb27ae67761c4b2e9b88613f51` (`updateBy`),
  KEY `IDX_39edf5217ba60642cfc03aab6d` (`deleteBy`),
  KEY `IDX_ff0cb9036098cdbad4f8e5a2a3` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_article_category`;
CREATE TABLE `news_article_category` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  `categoryId` bigint NOT NULL COMMENT '分類ID',
  PRIMARY KEY (`id`),
  KEY `IDX_0416b2346e597f06ff372de297` (`createTime`),
  KEY `IDX_cd1f3e05b74cce06fa7826037d` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_article_collection`;
CREATE TABLE `news_article_collection` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_e6a898e0eaba2bc4a78335fc3c` (`createTime`),
  KEY `IDX_025cdbad16c922f9cfac3fefb3` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_article_like`;
CREATE TABLE `news_article_like` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_b9204c3ff90d945591cdfaa628` (`createTime`),
  KEY `IDX_a753f2bbb362a608bcec8d2c00` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_article_view`;
CREATE TABLE `news_article_view` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  `count` bigint NOT NULL COMMENT 'count',
  PRIMARY KEY (`id`),
  KEY `IDX_eb9555c1591ca3ba5b5684f08e` (`createTime`),
  KEY `IDX_d9f3a6f6b7000d28075b946150` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_comment`;
CREATE TABLE `news_comment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `createBy` bigint NOT NULL COMMENT '建立用戶ID',
  `updateBy` bigint NOT NULL COMMENT '更新用戶ID',
  `deleteBy` bigint DEFAULT NULL COMMENT '刪除用戶ID',
  `deleteTime` datetime(6) DEFAULT NULL COMMENT '刪除時間',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  `parentId` bigint DEFAULT NULL COMMENT '父ID',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ip',
  `ipAddr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ip地址',
  PRIMARY KEY (`id`),
  KEY `IDX_81d8221c5139f5a00795e4dd3a` (`createTime`),
  KEY `IDX_84c2537550971c57cf909b8e8d` (`updateTime`),
  KEY `IDX_7e38467cc7ad60351701fbe03c` (`createBy`),
  KEY `IDX_b27a10c6c06ff89fae9ef3d9ed` (`updateBy`),
  KEY `IDX_b060795bbfc06659628c01f82d` (`deleteBy`),
  KEY `IDX_2483843be6a021565c5c5e97c0` (`ip`),
  KEY `IDX_7fd311599f53bb51d61d55b02e` (`ipAddr`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `news_comment_like`;
CREATE TABLE `news_comment_like` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `commentId` bigint NOT NULL COMMENT '留言ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  `articleId` bigint NOT NULL COMMENT '文章ID',
  PRIMARY KEY (`id`),
  KEY `IDX_84e6b703c6cc0742aa879e140b` (`createTime`),
  KEY `IDX_2f129025b265ccc9f71ce067d5` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `space_info`;
CREATE TABLE `space_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '地址',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类型',
  `classifyId` bigint DEFAULT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`),
  KEY `IDX_eb1da2f304c760846b5add09b3` (`createTime`),
  KEY `IDX_d7a2539961e9aacba8b353f3c9` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `space_type`;
CREATE TABLE `space_type` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类别名称',
  `parentId` tinyint DEFAULT NULL COMMENT '父分类ID',
  PRIMARY KEY (`id`),
  KEY `IDX_6669449501d275f367ca295472` (`createTime`),
  KEY `IDX_0749b509b68488caecd4cc2bbc` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `task_info`;
CREATE TABLE `task_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `jobId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '任務ID',
  `repeatConf` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '任務配置',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名稱',
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'cron',
  `limit` int DEFAULT NULL COMMENT '最大執行次數 不傳為無限次',
  `every` int DEFAULT NULL COMMENT '每間隔多少毫秒執行一次 如果cron設置了 這項設置就無效',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '備註',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '狀態 0:停止 1：運行',
  `startDate` datetime DEFAULT NULL COMMENT '開始時間',
  `endDate` datetime DEFAULT NULL COMMENT '結束時間',
  `data` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '數據',
  `service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '執行的service實例ID',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '狀態 0:系統 1：用戶',
  `nextRunTime` datetime DEFAULT NULL COMMENT '下一次執行時間',
  `taskType` tinyint NOT NULL DEFAULT '0' COMMENT '狀態 0:cron 1：時間間隔',
  PRIMARY KEY (`id`),
  KEY `IDX_6ced02f467e59bd6306b549bb0` (`createTime`),
  KEY `IDX_2adc6f9c241391126f27dac145` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `task_log`;
CREATE TABLE `task_log` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `taskId` bigint DEFAULT NULL COMMENT '任务ID',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '状态 0:失败 1：成功',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '详情描述',
  PRIMARY KEY (`id`),
  KEY `IDX_b9af0e100be034924b270aab31` (`createTime`),
  KEY `IDX_8857d8d43d38bebd7159af1fa6` (`updateTime`),
  KEY `IDX_1142dfec452e924b346f060fda` (`taskId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tip`;
CREATE TABLE `tip` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '標題',
  `publishDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '發布日期',
  `status` enum('draft','published') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft' COMMENT '狀態',
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容',
  PRIMARY KEY (`id`),
  KEY `IDX_def3234e0a0f6f6cc76e7393e3` (`createTime`),
  KEY `IDX_8abd3a4b5c0010cb338091b8f4` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tip_category`;
CREATE TABLE `tip_category` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `tipId` bigint NOT NULL COMMENT '小知識ID',
  `categoryId` bigint NOT NULL COMMENT '分類ID',
  PRIMARY KEY (`id`),
  KEY `IDX_068920b1090cbb0c7ccf2dba57` (`createTime`),
  KEY `IDX_50e8fe8d0a30bcba80526e2dad` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tip_collection`;
CREATE TABLE `tip_collection` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `tipId` bigint NOT NULL COMMENT '小知識ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_1fa7a4f407b6bf3bda104ef5bf` (`createTime`),
  KEY `IDX_7a2bc2777a58faab0983d08455` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tip_view`;
CREATE TABLE `tip_view` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '創建時間',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新時間',
  `tipId` bigint NOT NULL COMMENT '小知識ID',
  `userId` bigint NOT NULL COMMENT '用戶ID',
  PRIMARY KEY (`id`),
  KEY `IDX_1c1e85a2f0e6602e239d81ad67` (`createTime`),
  KEY `IDX_40a90c49e1358d470def40ae03` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `base_sys_conf` (`id`, `createTime`, `updateTime`, `cKey`, `cValue`) VALUES
(1, '2021-02-25 14:23:26.810981', '2021-02-25 14:23:26.810981', 'logKeep', '31');

INSERT INTO `base_sys_department` (`id`, `createTime`, `updateTime`, `name`, `parentId`, `orderNum`) VALUES
(1, '2021-02-24 21:17:11.971397', '2022-05-30 19:38:50.000000', '鍵結科技', NULL, 0),
(11, '2021-02-26 14:17:06.690613', '2022-05-30 19:38:50.000000', '開發', 1, 2),
(12, '2021-02-26 14:17:11.576369', '2022-05-30 19:38:50.000000', '管理', 1, 1),
(13, '2021-02-26 14:28:59.685177', '2022-05-30 19:38:50.000000', '用戶', 1, 3),
(15, '2022-07-02 17:46:03.239000', '2022-07-02 17:46:03.239000', '創作者', 13, 1),
(16, '2022-07-02 17:46:10.826000', '2022-07-02 17:48:36.366781', '一般用戶', 13, 0),
(17, '2022-07-02 17:49:31.327000', '2022-07-02 17:49:48.871000', '系統', 12, 0),
(18, '2022-07-02 17:49:39.465000', '2022-07-02 17:49:39.465000', '編輯', 12, 1);

INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES
(1, '2019-09-11 11:14:44.000000', '2022-05-25 17:47:09.618000', NULL, '工作台', '/', NULL, 0, 'icon-workbench', 11, NULL, 1, 0),
(2, '2019-09-11 11:14:47.000000', '2022-05-25 17:54:12.291000', NULL, '系统管理', '/sys', NULL, 0, 'icon-system', 22, NULL, 1, 1),
(8, '1900-01-20 23:19:57.000000', '2022-05-25 17:58:54.510000', 27, '選單列表', '/sys/menu', NULL, 1, 'icon-menu', 2, 'cool/modules/base/views/menu.vue', 1, 1),
(10, '1900-01-20 00:19:27.325000', '1900-01-20 00:19:27.325000', 8, '新增', NULL, 'base:sys:menu:add', 2, NULL, 1, NULL, 0, 1),
(11, '1900-01-20 00:19:51.101000', '1900-01-20 00:19:51.101000', 8, '删除', NULL, 'base:sys:menu:delete', 2, NULL, 2, NULL, 0, 1),
(12, '1900-01-20 00:20:05.150000', '1900-01-20 00:20:05.150000', 8, '修改', NULL, 'base:sys:menu:update', 2, NULL, 3, NULL, 0, 1),
(13, '1900-01-20 00:20:19.341000', '1900-01-20 00:20:19.341000', 8, '查询', NULL, 'base:sys:menu:page,base:sys:menu:list,base:sys:menu:info', 2, NULL, 4, NULL, 0, 1),
(22, '2019-09-12 00:34:01.000000', '2021-03-08 22:59:23.000000', 27, '角色列表', '/sys/role', NULL, 1, 'icon-common', 3, 'cool/modules/base/views/role.vue', 1, 1),
(23, '1900-01-20 00:34:23.459000', '1900-01-20 00:34:23.459000', 22, '新增', NULL, 'base:sys:role:add', 2, NULL, 1, NULL, 0, 1),
(24, '1900-01-20 00:34:40.523000', '1900-01-20 00:34:40.523000', 22, '删除', NULL, 'base:sys:role:delete', 2, NULL, 2, NULL, 0, 1),
(25, '1900-01-20 00:34:53.306000', '1900-01-20 00:34:53.306000', 22, '修改', NULL, 'base:sys:role:update', 2, NULL, 3, NULL, 0, 1),
(26, '1900-01-20 00:35:05.024000', '1900-01-20 00:35:05.024000', 22, '查询', NULL, 'base:sys:role:page,base:sys:role:list,base:sys:role:info', 2, NULL, 4, NULL, 0, 1),
(27, '2019-09-12 15:52:44.000000', '2022-05-25 17:53:23.013000', 2, '權限管理', NULL, NULL, 0, 'icon-auth', 1, NULL, 0, 1),
(29, '2019-09-12 17:35:51.000000', '2022-05-25 17:58:38.288000', 105, '請求紀錄', '/sys/log', NULL, 1, 'icon-log', 1, 'cool/modules/base/views/log.vue', 1, 1),
(30, '2019-09-12 17:37:03.000000', '2021-03-03 10:16:26.000000', 29, '权限', NULL, 'base:sys:log:page,base:sys:log:clear,base:sys:log:getKeep,base:sys:log:setKeep', 2, NULL, 1, NULL, 0, 1),
(43, '2019-11-07 14:22:34.000000', '2021-03-08 23:02:51.000000', 45, 'crud 示例', '/crud', NULL, 1, 'icon-favor', 1, 'cool/modules/demo/views/crud.vue', 1, 1),
(45, '2019-11-07 22:36:57.000000', '2019-11-11 15:21:10.000000', 1, '组件库', '/ui-lib', NULL, 0, 'icon-common', 2, NULL, 1, 1),
(47, '2019-11-08 09:35:08.000000', '2022-05-25 17:46:53.299000', NULL, '框架教程', '/tutorial', NULL, 0, 'icon-task', 14, NULL, 1, 0),
(48, '2019-11-08 09:35:53.000000', '2021-03-03 11:03:21.000000', 47, '文档', '/tutorial/doc', NULL, 1, 'icon-log', 0, 'https://cool-js.com', 1, 1),
(49, '2019-11-09 22:11:13.000000', '2021-03-09 09:50:46.000000', 45, 'quill 富文本编辑器', '/editor-quill', NULL, 1, 'icon-favor', 2, 'cool/modules/demo/views/editor-quill.vue', 1, 1),
(59, '2019-11-18 16:50:27.000000', '2019-11-18 16:50:27.000000', 97, '部门列表', NULL, 'base:sys:department:list', 2, NULL, 0, NULL, 1, 1),
(60, '2019-11-18 16:50:45.000000', '2019-11-18 16:50:45.000000', 97, '新增部门', NULL, 'base:sys:department:add', 2, NULL, 0, NULL, 1, 1),
(61, '2019-11-18 16:50:59.000000', '2019-11-18 16:50:59.000000', 97, '更新部门', NULL, 'base:sys:department:update', 2, NULL, 0, NULL, 1, 1),
(62, '2019-11-18 16:51:13.000000', '2019-11-18 16:51:13.000000', 97, '删除部门', NULL, 'base:sys:department:delete', 2, NULL, 0, NULL, 1, 1),
(63, '2019-11-18 17:49:35.000000', '2019-11-18 17:49:35.000000', 97, '部门排序', NULL, 'base:sys:department:order', 2, NULL, 0, NULL, 1, 1),
(65, '2019-11-18 23:59:21.000000', '2019-11-18 23:59:21.000000', 97, '用户转移', NULL, 'base:sys:user:move', 2, NULL, 0, NULL, 1, 1),
(78, '2019-12-10 13:27:56.000000', '2022-05-25 17:53:30.829000', 2, '參數配置', NULL, NULL, 0, 'icon-common', 4, NULL, 1, 1),
(79, '1900-01-20 13:29:33.000000', '2022-05-25 17:58:46.100000', 78, '參數列表', '/sys/param', NULL, 1, 'icon-menu', 0, 'cool/modules/base/views/param.vue', 1, 1),
(80, '1900-01-20 13:29:50.146000', '1900-01-20 13:29:50.146000', 79, '新增', NULL, 'base:sys:param:add', 2, NULL, 0, NULL, 1, 1),
(81, '1900-01-20 13:30:10.030000', '1900-01-20 13:30:10.030000', 79, '修改', NULL, 'base:sys:param:info,base:sys:param:update', 2, NULL, 0, NULL, 1, 1),
(82, '1900-01-20 13:30:25.791000', '1900-01-20 13:30:25.791000', 79, '删除', NULL, 'base:sys:param:delete', 2, NULL, 0, NULL, 1, 1),
(83, '1900-01-20 13:30:40.469000', '1900-01-20 13:30:40.469000', 79, '查看', NULL, 'base:sys:param:page,base:sys:param:list,base:sys:param:info', 2, NULL, 0, NULL, 1, 1),
(84, '2020-07-25 16:21:30.000000', '2020-07-25 16:21:30.000000', NULL, '通用', NULL, NULL, 0, 'icon-radioboxfill', 99, NULL, 1, 0),
(85, '2020-07-25 16:22:14.000000', '2021-03-03 10:36:00.000000', 84, '图片上传', NULL, 'space:info:page,space:info:list,space:info:info,space:info:add,space:info:delete,space:info:update,space:type:page,space:type:list,space:type:info,space:type:add,space:type:delete,space:type:update', 2, NULL, 1, NULL, 1, 1),
(86, '2020-08-12 09:56:27.000000', '2021-03-08 23:03:03.000000', 45, '文件上传', '/upload', NULL, 1, 'icon-favor', 3, 'cool/modules/demo/views/upload.vue', 1, 1),
(90, '1900-01-20 10:26:58.615000', '1900-01-20 10:26:58.615000', 84, '客服聊天', NULL, 'base:app:im:message:read,base:app:im:message:page,base:app:im:session:page,base:app:im:session:list,base:app:im:session:unreadCount,base:app:im:session:delete', 2, NULL, 0, NULL, 1, 1),
(96, '2021-01-12 14:12:20.000000', '2021-03-08 23:02:40.000000', 1, '组件预览', '/demo', NULL, 1, 'icon-favor', 0, 'cool/modules/demo/views/demo.vue', 1, 1),
(97, '1900-01-20 14:14:02.000000', '2022-05-25 17:54:02.763000', NULL, '用户列表', '/sys/user', NULL, 1, 'icon-user', 21, 'cool/modules/base/views/user.vue', 1, 1),
(98, '1900-01-20 14:14:13.528000', '1900-01-20 14:14:13.528000', 97, '新增', NULL, 'base:sys:user:add', 2, NULL, 0, NULL, 1, 1),
(99, '1900-01-20 14:14:22.823000', '1900-01-20 14:14:22.823000', 97, '删除', NULL, 'base:sys:user:delete', 2, NULL, 0, NULL, 1, 1),
(100, '1900-01-20 14:14:33.973000', '1900-01-20 14:14:33.973000', 97, '修改', NULL, 'base:sys:user:delete,base:sys:user:update', 2, NULL, 0, NULL, 1, 1),
(101, '2021-01-12 14:14:51.000000', '2021-01-12 14:14:51.000000', 97, '查询', NULL, 'base:sys:user:page,base:sys:user:list,base:sys:user:info', 2, NULL, 0, NULL, 1, 1),
(105, '2021-01-21 10:42:55.000000', '2022-05-25 17:53:37.268000', 2, '監控管理', NULL, NULL, 0, 'icon-rank', 6, NULL, 1, 1),
(117, '2021-03-05 10:58:25.000000', '2022-05-25 17:59:14.822000', NULL, '任務管理', NULL, NULL, 0, 'icon-activity', 23, NULL, 1, 1),
(118, '2021-03-05 10:59:42.000000', '2022-05-25 17:59:20.870000', 117, '任務列表', '/task', NULL, 1, 'icon-menu', 0, 'cool/modules/task/views/task.vue', 1, 1),
(119, '2021-03-05 11:00:00.000000', '2021-03-05 11:00:00.000000', 118, '权限', NULL, 'task:info:page,task:info:list,task:info:info,task:info:add,task:info:delete,task:info:update,task:info:stop,task:info:start,task:info:once,task:info:log', 2, NULL, 0, NULL, 1, 1),
(172, '2022-05-30 17:25:42.218000', '2022-06-27 21:19:57.085000', NULL, '新聞列表', '/news/article', '', 1, 'icon-news', 1, 'modules/news/views/article.vue', 1, 1),
(173, '2022-05-30 17:25:42.272897', '2022-05-30 17:25:42.272897', 172, '取得留言', NULL, 'news:article:comment', 2, NULL, 0, NULL, 1, 1),
(174, '2022-05-30 17:25:42.276525', '2022-05-30 17:25:42.276525', 172, '删除', NULL, 'news:article:delete', 2, NULL, 0, NULL, 1, 1),
(175, '2022-05-30 17:25:42.282289', '2022-05-30 17:25:42.282289', 172, '修改', NULL, 'news:article:update,news:article:info', 2, NULL, 0, NULL, 1, 1),
(176, '2022-05-30 17:25:42.287358', '2022-05-30 17:25:42.287358', 172, '单个信息', NULL, 'news:article:info', 2, NULL, 0, NULL, 1, 1),
(177, '2022-05-30 17:25:42.291145', '2022-05-30 17:25:42.291145', 172, '列表查询', NULL, 'news:article:list', 2, NULL, 0, NULL, 1, 1),
(178, '2022-05-30 17:25:42.295573', '2022-05-30 17:25:42.295573', 172, '分页查询', NULL, 'news:article:page', 2, NULL, 0, NULL, 1, 1),
(179, '2022-05-30 17:25:42.299932', '2022-05-30 17:25:42.299932', 172, '新增', NULL, 'news:article:add', 2, NULL, 0, NULL, 1, 1),
(180, '2022-05-30 17:35:36.394000', '2022-05-30 17:35:36.394000', NULL, '產業類別', '/industry/category', NULL, 1, 'icon-app', 10, 'modules/industry/views/category.vue', 1, 1),
(181, '2022-05-30 17:35:36.465332', '2022-05-30 17:35:36.465332', 180, '删除', NULL, 'industry:category:delete', 2, NULL, 0, NULL, 1, 1),
(182, '2022-05-30 17:35:36.472010', '2022-05-30 17:35:36.472010', 180, '修改', NULL, 'industry:category:update,industry:category:info', 2, NULL, 0, NULL, 1, 1),
(183, '2022-05-30 17:35:36.476969', '2022-05-30 17:35:36.476969', 180, '单个信息', NULL, 'industry:category:info', 2, NULL, 0, NULL, 1, 1),
(184, '2022-05-30 17:35:36.482802', '2022-05-30 17:35:36.482802', 180, '列表查询', NULL, 'industry:category:list', 2, NULL, 0, NULL, 1, 1),
(185, '2022-05-30 17:35:36.487227', '2022-05-30 17:35:36.487227', 180, '分页查询', NULL, 'industry:category:page', 2, NULL, 0, NULL, 1, 1),
(186, '2022-05-30 17:35:36.492346', '2022-05-30 17:35:36.492346', 180, '新增', NULL, 'industry:category:add', 2, NULL, 0, NULL, 1, 1),
(187, '2022-06-04 01:38:03.856000', '2022-06-04 01:38:03.856000', 172, '留言操作', NULL, 'news:comment:update,news:comment:info,news:comment:add', 2, NULL, 0, NULL, 1, 1),
(195, '2022-06-30 01:21:32.911000', '2022-06-30 01:21:32.911000', NULL, '小知識列表', '/tip/index', NULL, 1, 'icon-log', 0, 'modules/tip/views/index.vue', 1, 1),
(196, '2022-06-30 01:21:32.974929', '2022-06-30 01:21:32.974929', 195, '删除', NULL, 'tip:index:delete', 2, NULL, 0, NULL, 1, 1),
(197, '2022-06-30 01:21:32.979831', '2022-06-30 01:21:32.979831', 195, '修改', NULL, 'tip:index:update,tip:index:info', 2, NULL, 0, NULL, 1, 1),
(198, '2022-06-30 01:21:32.983961', '2022-06-30 01:21:32.983961', 195, '单个信息', NULL, 'tip:index:info', 2, NULL, 0, NULL, 1, 1),
(199, '2022-06-30 01:21:32.986419', '2022-06-30 01:21:32.986419', 195, '列表查询', NULL, 'tip:index:list', 2, NULL, 0, NULL, 1, 1),
(200, '2022-06-30 01:21:32.990561', '2022-06-30 01:21:32.990561', 195, '分页查询', NULL, 'tip:index:page', 2, NULL, 0, NULL, 1, 1),
(201, '2022-06-30 01:21:32.993378', '2022-06-30 01:21:32.993378', 195, '新增', NULL, 'tip:index:add', 2, NULL, 0, NULL, 1, 1);

INSERT INTO `base_sys_param` (`id`, `createTime`, `updateTime`, `keyName`, `name`, `data`, `dataType`, `remark`) VALUES
(1, '2021-02-26 13:53:05.000000', '2021-03-03 17:50:04.000000', 'text', '富文本参数', '<p><strong class=\"ql-size-huge\">111xxxxx2222<span class=\"ql-cursor\">﻿﻿</span></strong></p>', 0, NULL),
(2, '2021-02-26 13:53:18.000000', '2021-02-26 13:53:18.000000', 'json', 'JSON参数', '{\n    code: 111\n}', 0, NULL);

INSERT INTO `base_sys_role` (`id`, `createTime`, `updateTime`, `userId`, `name`, `label`, `remark`, `relevance`) VALUES
(1, '2021-02-24 21:18:39.682358', '2021-02-24 21:18:39.682358', '1', '超管', 'admin', '最高权限的角色', 1),
(10, '2021-02-26 14:15:38.000000', '2022-06-04 01:42:52.326000', '1', '系統管理員', 'admin-sys', NULL, 1),
(11, '2021-02-26 14:16:49.044744', '2022-05-18 17:57:41.815000', '1', '用戶', 'member', NULL, 0),
(12, '2021-02-26 14:26:51.000000', '2022-06-30 22:01:09.454000', '1', '開發', 'dev', NULL, 0),
(13, '2021-02-26 14:27:58.000000', '2022-05-18 17:57:30.549000', '1', '測試', 'test', NULL, 0),
(14, '2022-07-02 17:44:20.921000', '2022-07-02 17:45:03.700000', '1', '創作者', 'creator', NULL, 1),
(15, '2022-07-02 17:51:28.510000', '2022-07-02 17:51:28.510000', '1', '編輯', 'editor', '後台系統文章新增、編輯、修改權限', 1);

INSERT INTO `base_sys_role_department` (`id`, `createTime`, `updateTime`, `roleId`, `departmentId`) VALUES
(1, '2021-02-26 12:00:23.787939', '2021-02-26 12:00:23.787939', 8, 4),
(2, '2021-02-26 12:01:11.525205', '2021-02-26 12:01:11.525205', 9, 1),
(3, '2021-02-26 12:01:11.624266', '2021-02-26 12:01:11.624266', 9, 4),
(4, '2021-02-26 12:01:11.721894', '2021-02-26 12:01:11.721894', 9, 5),
(5, '2021-02-26 12:01:11.823342', '2021-02-26 12:01:11.823342', 9, 8),
(6, '2021-02-26 12:01:11.922873', '2021-02-26 12:01:11.922873', 9, 9),
(28, '2022-05-18 17:57:30.869128', '2022-05-18 17:57:30.869128', 13, 12),
(34, '2022-06-04 01:42:52.650984', '2022-06-04 01:42:52.650984', 10, 1),
(35, '2022-06-30 22:01:09.956947', '2022-06-30 22:01:09.956947', 12, 11),
(37, '2022-07-02 17:45:03.723541', '2022-07-02 17:45:03.723541', 14, 13),
(38, '2022-07-02 17:51:28.530321', '2022-07-02 17:51:28.530321', 15, 18);

INSERT INTO `base_sys_role_menu` (`id`, `createTime`, `updateTime`, `roleId`, `menuId`) VALUES
(1, '2021-02-26 12:00:18.240154', '2021-02-26 12:00:18.240154', 8, 1),
(2, '2021-02-26 12:00:18.342131', '2021-02-26 12:00:18.342131', 8, 96),
(3, '2021-02-26 12:00:18.444143', '2021-02-26 12:00:18.444143', 8, 45),
(4, '2021-02-26 12:00:18.545490', '2021-02-26 12:00:18.545490', 8, 43),
(5, '2021-02-26 12:00:18.649626', '2021-02-26 12:00:18.649626', 8, 49),
(6, '2021-02-26 12:00:18.752369', '2021-02-26 12:00:18.752369', 8, 86),
(7, '2021-02-26 12:00:18.856023', '2021-02-26 12:00:18.856023', 8, 2),
(8, '2021-02-26 12:00:18.956131', '2021-02-26 12:00:18.956131', 8, 27),
(9, '2021-02-26 12:00:19.071490', '2021-02-26 12:00:19.071490', 8, 97),
(10, '2021-02-26 12:00:19.171745', '2021-02-26 12:00:19.171745', 8, 59),
(11, '2021-02-26 12:00:19.274495', '2021-02-26 12:00:19.274495', 8, 60),
(12, '2021-02-26 12:00:19.374610', '2021-02-26 12:00:19.374610', 8, 61),
(13, '2021-02-26 12:00:19.474750', '2021-02-26 12:00:19.474750', 8, 62),
(14, '2021-02-26 12:00:19.573369', '2021-02-26 12:00:19.573369', 8, 63),
(15, '2021-02-26 12:00:19.674242', '2021-02-26 12:00:19.674242', 8, 65),
(16, '2021-02-26 12:00:19.772886', '2021-02-26 12:00:19.772886', 8, 98),
(17, '2021-02-26 12:00:19.874134', '2021-02-26 12:00:19.874134', 8, 99),
(18, '2021-02-26 12:00:19.972728', '2021-02-26 12:00:19.972728', 8, 100),
(19, '2021-02-26 12:00:20.085877', '2021-02-26 12:00:20.085877', 8, 101),
(20, '2021-02-26 12:00:20.192887', '2021-02-26 12:00:20.192887', 8, 8),
(21, '2021-02-26 12:00:20.293747', '2021-02-26 12:00:20.293747', 8, 10),
(22, '2021-02-26 12:00:20.393491', '2021-02-26 12:00:20.393491', 8, 11),
(23, '2021-02-26 12:00:20.495110', '2021-02-26 12:00:20.495110', 8, 12),
(24, '2021-02-26 12:00:20.594083', '2021-02-26 12:00:20.594083', 8, 13),
(25, '2021-02-26 12:00:20.695727', '2021-02-26 12:00:20.695727', 8, 22),
(26, '2021-02-26 12:00:20.794729', '2021-02-26 12:00:20.794729', 8, 23),
(27, '2021-02-26 12:00:20.895601', '2021-02-26 12:00:20.895601', 8, 24),
(28, '2021-02-26 12:00:20.994972', '2021-02-26 12:00:20.994972', 8, 25),
(29, '2021-02-26 12:00:21.110384', '2021-02-26 12:00:21.110384', 8, 26),
(30, '2021-02-26 12:00:21.210970', '2021-02-26 12:00:21.210970', 8, 69),
(31, '2021-02-26 12:00:21.311852', '2021-02-26 12:00:21.311852', 8, 70),
(32, '2021-02-26 12:00:21.411591', '2021-02-26 12:00:21.411591', 8, 71),
(33, '2021-02-26 12:00:21.513584', '2021-02-26 12:00:21.513584', 8, 72),
(34, '2021-02-26 12:00:21.612212', '2021-02-26 12:00:21.612212', 8, 73),
(35, '2021-02-26 12:00:21.712720', '2021-02-26 12:00:21.712720', 8, 74),
(36, '2021-02-26 12:00:21.812839', '2021-02-26 12:00:21.812839', 8, 75),
(37, '2021-02-26 12:00:21.913321', '2021-02-26 12:00:21.913321', 8, 76),
(38, '2021-02-26 12:00:22.013970', '2021-02-26 12:00:22.013970', 8, 77),
(39, '2021-02-26 12:00:22.144879', '2021-02-26 12:00:22.144879', 8, 78),
(40, '2021-02-26 12:00:22.246707', '2021-02-26 12:00:22.246707', 8, 79),
(41, '2021-02-26 12:00:22.347579', '2021-02-26 12:00:22.347579', 8, 80),
(42, '2021-02-26 12:00:22.446947', '2021-02-26 12:00:22.446947', 8, 81),
(43, '2021-02-26 12:00:22.547082', '2021-02-26 12:00:22.547082', 8, 82),
(44, '2021-02-26 12:00:22.647197', '2021-02-26 12:00:22.647197', 8, 83),
(45, '2021-02-26 12:00:22.748089', '2021-02-26 12:00:22.748089', 8, 105),
(46, '2021-02-26 12:00:22.847814', '2021-02-26 12:00:22.847814', 8, 102),
(47, '2021-02-26 12:00:22.949071', '2021-02-26 12:00:22.949071', 8, 103),
(48, '2021-02-26 12:00:23.047353', '2021-02-26 12:00:23.047353', 8, 29),
(49, '2021-02-26 12:00:23.147826', '2021-02-26 12:00:23.147826', 8, 30),
(50, '2021-02-26 12:00:23.246800', '2021-02-26 12:00:23.246800', 8, 47),
(51, '2021-02-26 12:00:23.349541', '2021-02-26 12:00:23.349541', 8, 48),
(52, '2021-02-26 12:00:23.463177', '2021-02-26 12:00:23.463177', 8, 84),
(53, '2021-02-26 12:00:23.564096', '2021-02-26 12:00:23.564096', 8, 90),
(54, '2021-02-26 12:00:23.663815', '2021-02-26 12:00:23.663815', 8, 85),
(55, '2021-02-26 12:01:05.971978', '2021-02-26 12:01:05.971978', 9, 1),
(56, '2021-02-26 12:01:06.085568', '2021-02-26 12:01:06.085568', 9, 96),
(57, '2021-02-26 12:01:06.198271', '2021-02-26 12:01:06.198271', 9, 45),
(58, '2021-02-26 12:01:06.309736', '2021-02-26 12:01:06.309736', 9, 43),
(59, '2021-02-26 12:01:06.410785', '2021-02-26 12:01:06.410785', 9, 49),
(60, '2021-02-26 12:01:06.510712', '2021-02-26 12:01:06.510712', 9, 86),
(61, '2021-02-26 12:01:06.612457', '2021-02-26 12:01:06.612457', 9, 2),
(62, '2021-02-26 12:01:06.710397', '2021-02-26 12:01:06.710397', 9, 27),
(63, '2021-02-26 12:01:06.809104', '2021-02-26 12:01:06.809104', 9, 97),
(64, '2021-02-26 12:01:06.907088', '2021-02-26 12:01:06.907088', 9, 59),
(65, '2021-02-26 12:01:07.009988', '2021-02-26 12:01:07.009988', 9, 60),
(66, '2021-02-26 12:01:07.122372', '2021-02-26 12:01:07.122372', 9, 61),
(67, '2021-02-26 12:01:07.223694', '2021-02-26 12:01:07.223694', 9, 62),
(68, '2021-02-26 12:01:07.325022', '2021-02-26 12:01:07.325022', 9, 63),
(69, '2021-02-26 12:01:07.425209', '2021-02-26 12:01:07.425209', 9, 65),
(70, '2021-02-26 12:01:07.522081', '2021-02-26 12:01:07.522081', 9, 98),
(71, '2021-02-26 12:01:07.622775', '2021-02-26 12:01:07.622775', 9, 99),
(72, '2021-02-26 12:01:07.721181', '2021-02-26 12:01:07.721181', 9, 100),
(73, '2021-02-26 12:01:07.819589', '2021-02-26 12:01:07.819589', 9, 101),
(74, '2021-02-26 12:01:07.920497', '2021-02-26 12:01:07.920497', 9, 8),
(75, '2021-02-26 12:01:08.018875', '2021-02-26 12:01:08.018875', 9, 10),
(76, '2021-02-26 12:01:08.135192', '2021-02-26 12:01:08.135192', 9, 11),
(77, '2021-02-26 12:01:08.246405', '2021-02-26 12:01:08.246405', 9, 12),
(78, '2021-02-26 12:01:08.346661', '2021-02-26 12:01:08.346661', 9, 13),
(79, '2021-02-26 12:01:08.448436', '2021-02-26 12:01:08.448436', 9, 22),
(80, '2021-02-26 12:01:08.547496', '2021-02-26 12:01:08.547496', 9, 23),
(81, '2021-02-26 12:01:08.648457', '2021-02-26 12:01:08.648457', 9, 24),
(82, '2021-02-26 12:01:08.750564', '2021-02-26 12:01:08.750564', 9, 25),
(83, '2021-02-26 12:01:08.851783', '2021-02-26 12:01:08.851783', 9, 26),
(84, '2021-02-26 12:01:08.950898', '2021-02-26 12:01:08.950898', 9, 69),
(85, '2021-02-26 12:01:09.061982', '2021-02-26 12:01:09.061982', 9, 70),
(86, '2021-02-26 12:01:09.165258', '2021-02-26 12:01:09.165258', 9, 71),
(87, '2021-02-26 12:01:09.266177', '2021-02-26 12:01:09.266177', 9, 72),
(88, '2021-02-26 12:01:09.366427', '2021-02-26 12:01:09.366427', 9, 73),
(89, '2021-02-26 12:01:09.467877', '2021-02-26 12:01:09.467877', 9, 74),
(90, '2021-02-26 12:01:09.568526', '2021-02-26 12:01:09.568526', 9, 75),
(91, '2021-02-26 12:01:09.668052', '2021-02-26 12:01:09.668052', 9, 76),
(92, '2021-02-26 12:01:09.766367', '2021-02-26 12:01:09.766367', 9, 77),
(93, '2021-02-26 12:01:09.866170', '2021-02-26 12:01:09.866170', 9, 78),
(94, '2021-02-26 12:01:09.963037', '2021-02-26 12:01:09.963037', 9, 79),
(95, '2021-02-26 12:01:10.082046', '2021-02-26 12:01:10.082046', 9, 80),
(96, '2021-02-26 12:01:10.185024', '2021-02-26 12:01:10.185024', 9, 81),
(97, '2021-02-26 12:01:10.283787', '2021-02-26 12:01:10.283787', 9, 82),
(98, '2021-02-26 12:01:10.382883', '2021-02-26 12:01:10.382883', 9, 83),
(99, '2021-02-26 12:01:10.481150', '2021-02-26 12:01:10.481150', 9, 105),
(100, '2021-02-26 12:01:10.579579', '2021-02-26 12:01:10.579579', 9, 102),
(101, '2021-02-26 12:01:10.679489', '2021-02-26 12:01:10.679489', 9, 103),
(102, '2021-02-26 12:01:10.777496', '2021-02-26 12:01:10.777496', 9, 29),
(103, '2021-02-26 12:01:10.878292', '2021-02-26 12:01:10.878292', 9, 30),
(104, '2021-02-26 12:01:10.977354', '2021-02-26 12:01:10.977354', 9, 47),
(105, '2021-02-26 12:01:11.097786', '2021-02-26 12:01:11.097786', 9, 48),
(106, '2021-02-26 12:01:11.201390', '2021-02-26 12:01:11.201390', 9, 84),
(107, '2021-02-26 12:01:11.302120', '2021-02-26 12:01:11.302120', 9, 90),
(108, '2021-02-26 12:01:11.402751', '2021-02-26 12:01:11.402751', 9, 85),
(527, '2022-05-18 17:57:30.576879', '2022-05-18 17:57:30.576879', 13, 84),
(528, '2022-05-18 17:57:30.586686', '2022-05-18 17:57:30.586686', 13, 85),
(529, '2022-05-18 17:57:30.592038', '2022-05-18 17:57:30.592038', 13, 90),
(530, '2022-05-18 17:57:30.598696', '2022-05-18 17:57:30.598696', 13, 47),
(531, '2022-05-18 17:57:30.602521', '2022-05-18 17:57:30.602521', 13, 48),
(532, '2022-05-18 17:57:30.606872', '2022-05-18 17:57:30.606872', 13, 2),
(533, '2022-05-18 17:57:30.613134', '2022-05-18 17:57:30.613134', 13, 105),
(534, '2022-05-18 17:57:30.619688', '2022-05-18 17:57:30.619688', 13, 29),
(535, '2022-05-18 17:57:30.626310', '2022-05-18 17:57:30.626310', 13, 30),
(536, '2022-05-18 17:57:30.630568', '2022-05-18 17:57:30.630568', 13, 78),
(537, '2022-05-18 17:57:30.633794', '2022-05-18 17:57:30.633794', 13, 79),
(538, '2022-05-18 17:57:30.640854', '2022-05-18 17:57:30.640854', 13, 80),
(539, '2022-05-18 17:57:30.647420', '2022-05-18 17:57:30.647420', 13, 81),
(540, '2022-05-18 17:57:30.650189', '2022-05-18 17:57:30.650189', 13, 82),
(541, '2022-05-18 17:57:30.659028', '2022-05-18 17:57:30.659028', 13, 83),
(542, '2022-05-18 17:57:30.666417', '2022-05-18 17:57:30.666417', 13, 27),
(543, '2022-05-18 17:57:30.680888', '2022-05-18 17:57:30.680888', 13, 22),
(544, '2022-05-18 17:57:30.693348', '2022-05-18 17:57:30.693348', 13, 26),
(545, '2022-05-18 17:57:30.703525', '2022-05-18 17:57:30.703525', 13, 25),
(546, '2022-05-18 17:57:30.712565', '2022-05-18 17:57:30.712565', 13, 24),
(547, '2022-05-18 17:57:30.728329', '2022-05-18 17:57:30.728329', 13, 23),
(548, '2022-05-18 17:57:30.737363', '2022-05-18 17:57:30.737363', 13, 8),
(549, '2022-05-18 17:57:30.744725', '2022-05-18 17:57:30.744725', 13, 13),
(550, '2022-05-18 17:57:30.752906', '2022-05-18 17:57:30.752906', 13, 12),
(551, '2022-05-18 17:57:30.762899', '2022-05-18 17:57:30.762899', 13, 11),
(552, '2022-05-18 17:57:30.767851', '2022-05-18 17:57:30.767851', 13, 10),
(553, '2022-05-18 17:57:30.777912', '2022-05-18 17:57:30.777912', 13, 97),
(554, '2022-05-18 17:57:30.782972', '2022-05-18 17:57:30.782972', 13, 59),
(555, '2022-05-18 17:57:30.786352', '2022-05-18 17:57:30.786352', 13, 60),
(556, '2022-05-18 17:57:30.794670', '2022-05-18 17:57:30.794670', 13, 61),
(557, '2022-05-18 17:57:30.801080', '2022-05-18 17:57:30.801080', 13, 62),
(558, '2022-05-18 17:57:30.808227', '2022-05-18 17:57:30.808227', 13, 63),
(559, '2022-05-18 17:57:30.814236', '2022-05-18 17:57:30.814236', 13, 65),
(560, '2022-05-18 17:57:30.818261', '2022-05-18 17:57:30.818261', 13, 98),
(561, '2022-05-18 17:57:30.819972', '2022-05-18 17:57:30.819972', 13, 99),
(562, '2022-05-18 17:57:30.822536', '2022-05-18 17:57:30.822536', 13, 100),
(563, '2022-05-18 17:57:30.825238', '2022-05-18 17:57:30.825238', 13, 101),
(564, '2022-05-18 17:57:30.827405', '2022-05-18 17:57:30.827405', 13, 1),
(565, '2022-05-18 17:57:30.836265', '2022-05-18 17:57:30.836265', 13, 45),
(566, '2022-05-18 17:57:30.843770', '2022-05-18 17:57:30.843770', 13, 86),
(567, '2022-05-18 17:57:30.853610', '2022-05-18 17:57:30.853610', 13, 49),
(568, '2022-05-18 17:57:30.864516', '2022-05-18 17:57:30.864516', 13, 43),
(569, '2022-05-18 17:57:30.866176', '2022-05-18 17:57:30.866176', 13, 96),
(613, '2022-05-18 17:57:41.832030', '2022-05-18 17:57:41.832030', 11, 85),
(614, '2022-05-18 17:57:41.835808', '2022-05-18 17:57:41.835808', 11, 47),
(615, '2022-05-18 17:57:41.838664', '2022-05-18 17:57:41.838664', 11, 48),
(616, '2022-05-18 17:57:41.840708', '2022-05-18 17:57:41.840708', 11, 1),
(617, '2022-05-18 17:57:41.843061', '2022-05-18 17:57:41.843061', 11, 45),
(618, '2022-05-18 17:57:41.845302', '2022-05-18 17:57:41.845302', 11, 86),
(619, '2022-05-18 17:57:41.848544', '2022-05-18 17:57:41.848544', 11, 49),
(620, '2022-05-18 17:57:41.850809', '2022-05-18 17:57:41.850809', 11, 43),
(621, '2022-05-18 17:57:41.853031', '2022-05-18 17:57:41.853031', 11, 96),
(622, '2022-05-18 17:57:41.855324', '2022-05-18 17:57:41.855324', 11, 84),
(828, '2022-06-04 01:42:52.354209', '2022-06-04 01:42:52.354209', 10, 127),
(829, '2022-06-04 01:42:52.359990', '2022-06-04 01:42:52.359990', 10, 128),
(830, '2022-06-04 01:42:52.365331', '2022-06-04 01:42:52.365331', 10, 129),
(831, '2022-06-04 01:42:52.369670', '2022-06-04 01:42:52.369670', 10, 130),
(832, '2022-06-04 01:42:52.374480', '2022-06-04 01:42:52.374480', 10, 131),
(833, '2022-06-04 01:42:52.378944', '2022-06-04 01:42:52.378944', 10, 132),
(834, '2022-06-04 01:42:52.383731', '2022-06-04 01:42:52.383731', 10, 133),
(835, '2022-06-04 01:42:52.388189', '2022-06-04 01:42:52.388189', 10, 172),
(836, '2022-06-04 01:42:52.392613', '2022-06-04 01:42:52.392613', 10, 173),
(837, '2022-06-04 01:42:52.398480', '2022-06-04 01:42:52.398480', 10, 174),
(838, '2022-06-04 01:42:52.402848', '2022-06-04 01:42:52.402848', 10, 175),
(839, '2022-06-04 01:42:52.407065', '2022-06-04 01:42:52.407065', 10, 176),
(840, '2022-06-04 01:42:52.410656', '2022-06-04 01:42:52.410656', 10, 177),
(841, '2022-06-04 01:42:52.414833', '2022-06-04 01:42:52.414833', 10, 178),
(842, '2022-06-04 01:42:52.419285', '2022-06-04 01:42:52.419285', 10, 179),
(843, '2022-06-04 01:42:52.445417', '2022-06-04 01:42:52.445417', 10, 187),
(844, '2022-06-04 01:42:52.449707', '2022-06-04 01:42:52.449707', 10, 180),
(845, '2022-06-04 01:42:52.455118', '2022-06-04 01:42:52.455118', 10, 181),
(846, '2022-06-04 01:42:52.474354', '2022-06-04 01:42:52.474354', 10, 182),
(847, '2022-06-04 01:42:52.479335', '2022-06-04 01:42:52.479335', 10, 183),
(848, '2022-06-04 01:42:52.487117', '2022-06-04 01:42:52.487117', 10, 184),
(849, '2022-06-04 01:42:52.493368', '2022-06-04 01:42:52.493368', 10, 185),
(850, '2022-06-04 01:42:52.500299', '2022-06-04 01:42:52.500299', 10, 186),
(851, '2022-06-04 01:42:52.504940', '2022-06-04 01:42:52.504940', 10, 97),
(852, '2022-06-04 01:42:52.509878', '2022-06-04 01:42:52.509878', 10, 59),
(853, '2022-06-04 01:42:52.516220', '2022-06-04 01:42:52.516220', 10, 60),
(854, '2022-06-04 01:42:52.522309', '2022-06-04 01:42:52.522309', 10, 61),
(855, '2022-06-04 01:42:52.527978', '2022-06-04 01:42:52.527978', 10, 62),
(856, '2022-06-04 01:42:52.534079', '2022-06-04 01:42:52.534079', 10, 63),
(857, '2022-06-04 01:42:52.539601', '2022-06-04 01:42:52.539601', 10, 65),
(858, '2022-06-04 01:42:52.544434', '2022-06-04 01:42:52.544434', 10, 98),
(859, '2022-06-04 01:42:52.548401', '2022-06-04 01:42:52.548401', 10, 99),
(860, '2022-06-04 01:42:52.552767', '2022-06-04 01:42:52.552767', 10, 100),
(861, '2022-06-04 01:42:52.559148', '2022-06-04 01:42:52.559148', 10, 101),
(862, '2022-06-04 01:42:52.563198', '2022-06-04 01:42:52.563198', 10, 105),
(863, '2022-06-04 01:42:52.567598', '2022-06-04 01:42:52.567598', 10, 29),
(864, '2022-06-04 01:42:52.572111', '2022-06-04 01:42:52.572111', 10, 30),
(865, '2022-06-04 01:42:52.576729', '2022-06-04 01:42:52.576729', 10, 84),
(866, '2022-06-04 01:42:52.590144', '2022-06-04 01:42:52.590144', 10, 90),
(867, '2022-06-04 01:42:52.609359', '2022-06-04 01:42:52.609359', 10, 85),
(868, '2022-06-04 01:42:52.624457', '2022-06-04 01:42:52.624457', 10, 2),
(869, '2022-06-30 22:01:09.483620', '2022-06-30 22:01:09.483620', 12, 1),
(870, '2022-06-30 22:01:09.489723', '2022-06-30 22:01:09.489723', 12, 96),
(871, '2022-06-30 22:01:09.495022', '2022-06-30 22:01:09.495022', 12, 45),
(872, '2022-06-30 22:01:09.502349', '2022-06-30 22:01:09.502349', 12, 43),
(873, '2022-06-30 22:01:09.509389', '2022-06-30 22:01:09.509389', 12, 49),
(874, '2022-06-30 22:01:09.514241', '2022-06-30 22:01:09.514241', 12, 86),
(875, '2022-06-30 22:01:09.522315', '2022-06-30 22:01:09.522315', 12, 47),
(876, '2022-06-30 22:01:09.528464', '2022-06-30 22:01:09.528464', 12, 48),
(877, '2022-06-30 22:01:09.542968', '2022-06-30 22:01:09.542968', 12, 97),
(878, '2022-06-30 22:01:09.554075', '2022-06-30 22:01:09.554075', 12, 59),
(879, '2022-06-30 22:01:09.558213', '2022-06-30 22:01:09.558213', 12, 60),
(880, '2022-06-30 22:01:09.562998', '2022-06-30 22:01:09.562998', 12, 61),
(881, '2022-06-30 22:01:09.567946', '2022-06-30 22:01:09.567946', 12, 62),
(882, '2022-06-30 22:01:09.572557', '2022-06-30 22:01:09.572557', 12, 63),
(883, '2022-06-30 22:01:09.576664', '2022-06-30 22:01:09.576664', 12, 65),
(884, '2022-06-30 22:01:09.581716', '2022-06-30 22:01:09.581716', 12, 98),
(885, '2022-06-30 22:01:09.588009', '2022-06-30 22:01:09.588009', 12, 99),
(886, '2022-06-30 22:01:09.591914', '2022-06-30 22:01:09.591914', 12, 100),
(887, '2022-06-30 22:01:09.596699', '2022-06-30 22:01:09.596699', 12, 101),
(888, '2022-06-30 22:01:09.602025', '2022-06-30 22:01:09.602025', 12, 2),
(889, '2022-06-30 22:01:09.607131', '2022-06-30 22:01:09.607131', 12, 27),
(890, '2022-06-30 22:01:09.612577', '2022-06-30 22:01:09.612577', 12, 8),
(891, '2022-06-30 22:01:09.619526', '2022-06-30 22:01:09.619526', 12, 10),
(892, '2022-06-30 22:01:09.646066', '2022-06-30 22:01:09.646066', 12, 11),
(893, '2022-06-30 22:01:09.668821', '2022-06-30 22:01:09.668821', 12, 12),
(894, '2022-06-30 22:01:09.690870', '2022-06-30 22:01:09.690870', 12, 13),
(895, '2022-06-30 22:01:09.728347', '2022-06-30 22:01:09.728347', 12, 22),
(896, '2022-06-30 22:01:09.772308', '2022-06-30 22:01:09.772308', 12, 23),
(897, '2022-06-30 22:01:09.783334', '2022-06-30 22:01:09.783334', 12, 24),
(898, '2022-06-30 22:01:09.793135', '2022-06-30 22:01:09.793135', 12, 25),
(899, '2022-06-30 22:01:09.803516', '2022-06-30 22:01:09.803516', 12, 26),
(900, '2022-06-30 22:01:09.859331', '2022-06-30 22:01:09.859331', 12, 78),
(901, '2022-06-30 22:01:09.868203', '2022-06-30 22:01:09.868203', 12, 79),
(902, '2022-06-30 22:01:09.876132', '2022-06-30 22:01:09.876132', 12, 80),
(903, '2022-06-30 22:01:09.887729', '2022-06-30 22:01:09.887729', 12, 81),
(904, '2022-06-30 22:01:09.895223', '2022-06-30 22:01:09.895223', 12, 82),
(905, '2022-06-30 22:01:09.903058', '2022-06-30 22:01:09.903058', 12, 83),
(906, '2022-06-30 22:01:09.908725', '2022-06-30 22:01:09.908725', 12, 105),
(907, '2022-06-30 22:01:09.913010', '2022-06-30 22:01:09.913010', 12, 29),
(908, '2022-06-30 22:01:09.925983', '2022-06-30 22:01:09.925983', 12, 30),
(909, '2022-06-30 22:01:09.936564', '2022-06-30 22:01:09.936564', 12, 84),
(910, '2022-06-30 22:01:09.941498', '2022-06-30 22:01:09.941498', 12, 90),
(911, '2022-06-30 22:01:09.947655', '2022-06-30 22:01:09.947655', 12, 85);

INSERT INTO `base_sys_user` (`id`, `createTime`, `updateTime`, `departmentId`, `username`, `password`, `passwordV`, `phone`, `email`, `socketId`, `createBy`, `updateBy`, `status`, `firstName`, `lastName`, `idCard`, `birthday`, `headImg`, `gender`, `remark`, `intro`, `deleteBy`, `deleteTime`, `emailVerify`, `identifyVerify`) VALUES
(1, '2021-02-24 21:16:41.525157', '2022-11-16 18:07:13.000000', 1, 'admin', '4297f44b13955235245b2497399d7a93', 16, NULL, NULL, NULL, 0, 0, 'normal', 'Bryan', 'Chang', NULL, NULL, 'https://bondingtechs.com/public/uploads/20221116/2c187ac2-c19b-4ab8-8abe-88f0a9225b4c_img-1615784928-78952@900.jpeg', 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(30, '2022-05-15 23:08:18.000000', '2022-09-05 15:42:40.000000', 15, '2084ca74ab8a', 'bdc87b9c894da5168059e00ebffb9077', 9, '0900000001', NULL, NULL, 0, 1, 'normal', '王', '大明', NULL, NULL, NULL, 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(31, '2022-05-16 21:09:53.000000', '2022-07-05 22:59:42.000000', 16, 'su', '4297f44b13955235245b2497399d7a93', 5, NULL, NULL, NULL, 0, 1, 'normal', '曾', '小喜', NULL, NULL, NULL, 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(43, '2022-05-16 23:58:41.000000', '2022-07-06 14:50:43.738700', 17, '886988038286', '4297f44b13955235245b2497399d7a93', 3, '0988038286', NULL, NULL, 0, 1, 'normal', '李', '璇璇', NULL, NULL, NULL, 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(44, '2022-06-24 03:57:41.000000', '2022-10-19 01:38:32.460648', 17, 'guest-tw', 'ed2b1f468c5f915f3f1cf75d7068baae', 1, '0903961834', NULL, NULL, 0, 1, 'normal', '蘇', '玲瓏', NULL, NULL, NULL, 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(46, '2022-06-30 21:45:11.000000', '2022-07-02 17:49:59.000000', 17, 'yunfan', '4297f44b13955235245b2497399d7a93', 1, NULL, NULL, NULL, 1, 1, 'normal', '黃', '韻凡', NULL, NULL, NULL, 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(52, '2022-07-05 22:59:22.000000', '2022-07-05 22:59:22.000000', 15, 'zhen168', '4297f44b13955235245b2497399d7a93', 1, NULL, NULL, NULL, 1, 1, 'normal', '曾', '小米', NULL, NULL, NULL, 'male', NULL, NULL, NULL, NULL, 'unverified', 'unverified'),
(63, '2022-11-17 08:08:42.000000', '2022-11-23 18:44:28.000000', 16, '1cdc6e551a89a4fb', '02edcc5d0cd445b1682c3346829eb79d', 1, '0953705508', 'zz02846584zz@gmail.com', NULL, 63, 1, 'normal', '懿人', '張', NULL, '2022-11-16', NULL, 'female', NULL, '', NULL, NULL, 'verify', 'unverified'),
(64, '2022-11-21 15:31:58.587700', '2022-11-21 17:07:14.000000', 16, '296a3074bd3d64f1', '1f6b1d7ab021d76393c951b43c98aa46', 1, '0927377135', 'susan821212@gmail.com', NULL, 64, 64, 'normal', '蘇', '玲瓏', 'A229452278', '1993-12-12', NULL, 'female', NULL, '', NULL, NULL, 'verify', 'pending');

INSERT INTO `base_sys_user_identity` (`id`, `createTime`, `updateTime`, `positive`, `negative`, `userId`, `createBy`, `updateBy`, `idCard`) VALUES
(2, '2022-07-06 15:58:16.907554', '2022-11-03 20:23:32.000000', 'http://127.0.0.1:8001/public/uploads/20221103/ca6d1333-b0c5-481a-991b-120692fadea1.png', 'http://127.0.0.1:8001/public/uploads/20221103/17388b4f-a641-4b48-8004-c7805b4de05c.png', 59, 59, 59, 'H124738082'),
(9, '2022-11-03 23:00:38.093673', '2022-11-03 23:00:38.093673', 'http://127.0.0.1:8001/public/uploads/20221103/1b4d50f0-25a0-4f56-8f0b-81a4f16eaa60.png', 'http://127.0.0.1:8001/public/uploads/20221103/b87c581d-96d9-4ce5-9047-5e08603bace0.png', 61, 61, 61, 'H124638086'),
(10, '2022-11-21 15:35:25.048977', '2022-11-21 15:35:25.048977', 'https://bondingtechs.com/public/uploads/20221121/708dc266-5f1b-4f9e-8cd6-4fd850471535.jpeg', 'https://bondingtechs.com/public/uploads/20221121/61b9a7bf-71d8-4848-97a8-72725fcade30.jpeg', 64, 64, 64, 'A229452278');

INSERT INTO `base_sys_user_role` (`id`, `createTime`, `updateTime`, `userId`, `roleId`) VALUES
(1, '2021-02-24 22:03:11.665805', '2021-02-24 22:03:11.665805', 1, 1),
(2, '2021-02-25 11:03:55.325988', '2021-02-25 11:03:55.325988', 2, 1),
(3, '2021-02-25 14:30:57.295150', '2021-02-25 14:30:57.295150', 3, 1),
(4, '2021-02-25 14:39:32.975014', '2021-02-25 14:39:32.975014', 4, 1),
(5, '2021-02-25 14:40:56.812948', '2021-02-25 14:40:56.812948', 5, 1),
(6, '2021-02-25 14:44:08.436555', '2021-02-25 14:44:08.436555', 6, 1),
(7, '2021-02-25 14:46:17.409232', '2021-02-25 14:46:17.409232', 7, 1),
(8, '2021-02-25 14:47:47.211749', '2021-02-25 14:47:47.211749', 8, 1),
(9, '2021-02-25 14:48:11.734024', '2021-02-25 14:48:11.734024', 9, 1),
(10, '2021-02-25 14:50:48.288616', '2021-02-25 14:50:48.288616', 10, 1),
(11, '2021-02-25 14:51:32.123884', '2021-02-25 14:51:32.123884', 11, 1),
(12, '2021-02-25 15:46:26.356943', '2021-02-25 15:46:26.356943', 12, 1),
(13, '2021-02-25 15:56:43.475155', '2021-02-25 15:56:43.475155', 13, 1),
(14, '2021-02-25 16:03:14.417784', '2021-02-25 16:03:14.417784', 14, 1),
(16, '2021-02-25 16:22:11.200152', '2021-02-25 16:22:11.200152', 16, 1),
(17, '2021-02-25 17:44:37.635550', '2021-02-25 17:44:37.635550', 15, 1),
(19, '2021-02-25 17:51:00.554812', '2021-02-25 17:51:00.554812', 18, 1),
(21, '2021-02-25 17:54:41.375113', '2021-02-25 17:54:41.375113', 17, 1),
(22, '2021-02-25 17:55:49.385301', '2021-02-25 17:55:49.385301', 20, 1),
(24, '2021-02-25 17:58:35.452363', '2021-02-25 17:58:35.452363', 22, 1),
(27, '2021-02-25 21:25:55.005236', '2021-02-25 21:25:55.005236', 19, 1),
(28, '2021-02-26 13:50:05.633242', '2021-02-26 13:50:05.633242', 21, 8),
(29, '2021-02-26 13:50:17.836990', '2021-02-26 13:50:17.836990', 23, 8),
(38, '2021-02-26 14:36:08.899046', '2021-02-26 14:36:08.899046', 26, 13),
(39, '2021-02-26 14:36:13.149510', '2021-02-26 14:36:13.149510', 25, 13),
(40, '2021-02-26 14:36:20.737073', '2021-02-26 14:36:20.737073', 27, 11),
(42, '2021-02-26 14:36:53.481478', '2021-02-26 14:36:53.481478', 24, 12),
(43, '2021-02-26 14:36:58.477817', '2021-02-26 14:36:58.477817', 28, 12),
(44, '2021-02-26 14:36:58.577114', '2021-02-26 14:36:58.577114', 28, 10),
(47, '2022-05-16 23:21:10.158621', '2022-05-16 23:21:10.158621', 32, 11),
(48, '2022-05-16 23:29:59.806724', '2022-05-16 23:29:59.806724', 33, 11),
(49, '2022-05-16 23:31:11.827039', '2022-05-16 23:31:11.827039', 34, 11),
(50, '2022-05-16 23:37:17.264227', '2022-05-16 23:37:17.264227', 35, 11),
(51, '2022-05-16 23:37:35.278638', '2022-05-16 23:37:35.278638', 36, 11),
(52, '2022-05-16 23:48:10.301004', '2022-05-16 23:48:10.301004', 37, 11),
(53, '2022-05-16 23:48:39.981245', '2022-05-16 23:48:39.981245', 38, 11),
(54, '2022-05-16 23:50:55.187208', '2022-05-16 23:50:55.187208', 39, 11),
(55, '2022-05-16 23:53:25.445337', '2022-05-16 23:53:25.445337', 40, 11),
(56, '2022-05-16 23:56:28.186873', '2022-05-16 23:56:28.186873', 41, 11),
(57, '2022-05-16 23:57:37.317437', '2022-05-16 23:57:37.317437', 42, 11),
(73, '2022-06-30 21:52:29.189289', '2022-06-30 21:52:29.189289', 51, 10),
(74, '2022-06-30 21:52:49.881546', '2022-06-30 21:52:49.881546', 46, 10),
(75, '2022-06-30 21:52:49.887232', '2022-06-30 21:52:49.887232', 46, 12),
(78, '2022-06-30 21:53:03.239135', '2022-06-30 21:53:03.239135', 44, 10),
(79, '2022-06-30 21:53:06.934969', '2022-06-30 21:53:06.934969', 43, 10),
(83, '2022-06-30 22:00:15.562204', '2022-06-30 22:00:15.562204', 45, 10),
(84, '2022-06-30 22:00:15.570790', '2022-06-30 22:00:15.570790', 45, 12),
(91, '2022-07-05 22:59:42.595428', '2022-07-05 22:59:42.595428', 31, 11),
(93, '2022-07-06 15:02:13.666855', '2022-07-06 15:05:02.888886', 58, 14),
(95, '2022-09-05 15:42:34.546215', '2022-09-05 15:42:34.546215', 59, 11),
(96, '2022-09-05 15:42:34.552218', '2022-09-05 15:42:34.552218', 59, 14),
(97, '2022-09-05 15:42:40.127874', '2022-09-05 15:42:40.127874', 30, 14),
(98, '2022-09-05 15:42:40.133136', '2022-09-05 15:42:40.133136', 30, 11),
(99, '2022-09-05 15:42:54.535691', '2022-09-05 15:42:54.535691', 52, 14),
(100, '2022-09-05 15:42:54.543050', '2022-09-05 15:42:54.543050', 52, 11),
(101, '2022-11-03 22:42:22.205908', '2022-11-03 22:42:22.205908', 61, 11),
(102, '2022-11-17 08:01:56.005714', '2022-11-17 08:01:56.005714', 62, 11),
(104, '2022-11-21 15:31:58.625671', '2022-11-21 15:31:58.625671', 64, 11),
(109, '2022-11-23 18:44:16.278991', '2022-11-23 18:44:16.278991', 63, 11);

INSERT INTO `industry_category` (`id`, `createTime`, `updateTime`, `name`, `description`, `slug`, `parentId`, `icon`, `orderNum`) VALUES
(5, '2022-05-23 15:55:23.574000', '2022-05-25 21:53:44.636597', '化學品原物料', '<p>化學品原物料</p>', 'chemical-raw-materials', NULL, NULL, 0),
(17, '2022-05-23 23:17:55.588000', '2022-11-15 18:44:00.111000', '應用科技趨勢', '<p>應用科技趨勢</p>', 'applied-tech-trend', NULL, NULL, 1),
(18, '2022-05-23 23:18:24.442000', '2022-05-25 21:53:44.636597', '航太-衛星材料', '<p>航太-衛星材料</p>', 'aerospace-satellite-materials', 17, NULL, 0),
(19, '2022-05-23 23:19:09.741000', '2022-05-25 21:53:44.636597', '元宇宙-拉伸可修復塗料', '<p>元宇宙-拉伸可修復塗料</p>', 'metaverse-stretch-repairable-paint', 17, NULL, 1),
(20, '2022-05-23 23:19:47.376000', '2022-05-25 21:53:44.636597', '消費性電子', '<p>消費性電子</p>', 'consumer-electronics', 17, NULL, 2),
(21, '2022-05-23 23:20:07.258000', '2022-05-25 21:53:44.636597', '電動車', '<p>電動車</p>', 'electric-vehicles', 17, NULL, 3),
(22, '2022-05-23 23:20:24.721000', '2022-05-25 21:53:44.636597', '半導體', '<p>半導體</p>', 'semiconductor', 17, NULL, 4),
(23, '2022-05-23 23:20:49.709000', '2022-05-25 21:53:44.636597', '5G通訊', '<p>5G通訊-高頻高速材料</p>', '5g', 17, NULL, 5),
(24, '2022-05-23 23:21:12.042000', '2022-05-25 21:53:44.636597', 'micro LED', '<p>micro LED-散熱材料</p>', 'micro-led', 17, NULL, 6),
(25, '2022-05-23 23:21:41.372000', '2022-05-25 21:53:44.636597', '電動車+元宇宙', '<p>電動車+元宇宙-拉伸導電塗料</p>', 'electric-vehicle-metaverse', 17, NULL, 7),
(26, '2022-05-23 23:22:11.359000', '2022-05-25 21:53:44.636597', '軍防', '<p>軍防-隱形塗料(Nano)</p>', 'military-defense', 17, NULL, 8),
(27, '2022-05-23 23:22:37.771000', '2022-05-25 21:53:44.636597', '綠能循環能', '<p>綠能循環能-新能源</p>', 'green-energy-recycling', 17, NULL, 9),
(29, '2022-05-23 23:23:47.601000', '2022-06-30 01:06:52.544309', '其他應用科技', '<p>其他應用科技</p>', 'other-tech', 17, NULL, 10),
(30, '2022-11-15 18:17:47.043000', '2022-11-15 18:38:24.436576', '有機小分子', NULL, 'small-organic-molecules', 5, NULL, 0),
(31, '2022-11-15 18:17:47.043000', '2022-11-15 18:17:47.043000', '有機高分子', NULL, 'organic-polymer', 5, NULL, 1),
(32, '2022-11-15 18:17:47.043000', '2022-11-15 18:17:47.043000', '無機顏料/填料', NULL, 'inorganic-pigments-fillers', 5, NULL, 2),
(33, '2022-11-15 18:17:47.043000', '2022-11-15 18:17:47.043000', '塗料助劑', NULL, 'coating-additives', 5, NULL, 3),
(34, '2022-11-15 18:17:47.043000', '2022-11-15 18:17:47.043000', '溶劑', NULL, 'solvent', 5, NULL, 4),
(35, '2022-11-15 18:17:47.043000', '2022-11-15 18:17:47.043000', '設備建置', NULL, 'equipment-construction', 5, NULL, 5),
(36, '2022-11-15 18:17:47.043000', '2022-11-15 18:17:47.043000', '塗裝工藝', NULL, 'coating-process', 5, NULL, 6);

INSERT INTO `news_article` (`id`, `createTime`, `updateTime`, `title`, `thumbnail`, `commentOpen`, `slug`, `publishTime`, `createBy`, `updateBy`, `deleteBy`, `deleteTime`, `status`, `metaTitle`, `content`, `metaDescription`, `isTop`, `isHot`, `type`, `videoUrl`, `content_preview`, `excerpt`, `authorAvatar`, `authorName`, `authorIntro`) VALUES
(27, '2022-11-16 12:42:59.000000', '2022-11-23 18:35:56.000000', '時事企劃-ReSkin 塑膠皮膚 Part I', 'https://bondingtechs.com/public/uploads/20221116/b8b0bcf3-dbe8-4997-81f5-7556438d48d8_ReSkin 重點發佈-2.png', 1, 'reskin-part-1', '2022-11-16 12:49:25', 1, 1, NULL, NULL, 'published', NULL, '<p><span style=\"color: rgb(26, 26, 26);\">參考資料來源 | </span><a href=\"https://reskin.dev/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://reskin.dev/</a></p><p><br></p><p><strong>一、ReSkin 是什麼?</strong></p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/e71ed9da-6555-47e7-a07c-bdd54359a36f_CleanShot 2022-11-16 at 12.44.41.png\">&nbsp;</p><p>塑膠皮膚(ReSkin)，簡單來說就是一個 \"柔軟的傳感器 (Soft Sensor) \"，其價格便宜，尺寸輕巧，耐用度持久，且即便換掉了汰換也方便，除了能夠蒐集兩個物件之間的被動密合接觸(passive conformal contact)數據外，更可以蒐集「主動接觸(active contact)的數據」。有了這些數據，未來的機器人就可以從事許多動作比較輕巧且複雜的工作，像是抱小孩、包餃子….等工作。</p><p><br></p><p>那到底 ReSkin在機器手臂的表現上，有什麼差別呢?</p><p>可以看一下以下兩張圖片，沒有ReSkin 的機器手臂，在拿小藍莓的時候會直接把它捏爆，因為他們被輸入的運算太粗糙簡單，沒辦法用適當力道抓取小藍莓；但有ReSkin的機器手臂，就可以用很輕巧的動作把小藍莓拿起來了!</p><p><br></p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/b8b0bcf3-dbe8-4997-81f5-7556438d48d8_ReSkin 重點發佈-2.png\"><img src=\"https://bondingtechs.com/public/uploads/20221116/c5e86357-6f4c-42e1-816c-ea528b04209e_ReSkin 重點發佈-1.png\"></p><p><span style=\"color: rgb(26, 26, 26);\">圖片來源 | </span><a href=\"https://youtu.be/SxT_G-Im_CA\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://youtu.be/SxT_G-Im_CA</a></p><p><br></p><p><br></p><p><strong>二、ReSkin 規格及優勢</strong></p><p>一個好的塑膠皮膚須具備哪些能力呢?</p><ol><li>可用於穩定抓取/操作的密合接觸</li><li>可以精準的量測壓縮力及剪切力</li><li>擁有強力&lt;0.1N與時間分辨率(Temporal Resolution) &gt;100Hz</li><li>在大面積覆蓋時 (&gt;4cm2)，每個接觸點都可以有好的空間解析度(Spatial Resolution)</li></ol><p>而從實用性來看的話，還須具備</p><ol><li>可以緊貼物件表面以及多方應用的</li><li>便宜</li><li>耐用</li></ol><p><br></p><p>ReSkin是結合了磁性材材料與拉伸彈性材料，所有使ReSkin變形的作用力及剪切力，都會因材料磁場的改變被讀取，這些數據會被追蹤回每一個接觸點進而讓AI進行學習</p><p>ReSkin 的優勢</p><ol><li>價格便宜 (&lt;30USD，量產可&lt;6USD)</li><li>厚度 2-3mm</li><li>時間分辨率高達 400Hz</li><li>空間解析度 1mm精度達90%</li></ol><p><br></p><p>其實，市面上已經有許多類似的產品，但 ReSkin 確實有相當的優勢，產品分析表請參考以下原文圖表囉!</p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/f497a59d-9c53-4b77-8841-734b3bd94df6_CleanShot 2022-11-16 at 12.44.57.png\"></p><p><strong>三、Reskin 使用的材料與合作對象</strong></p><p><strong>1. 磁性粉體 ( Magnetic Particles )</strong></p><p>商品型號: MQP-15-7-20065-070</p><p>製造商: Magnequench</p><p><span style=\"color: rgb(0, 0, 0);\">產品資料: </span><a href=\"https://mqitechnology.com/wp-content/uploads/2017/09/mqp-15-7-20065-070.pdf\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://mqitechnology.com/wp-content/uploads/2017/09/mqp-15-7-20065-070.pdf</a></p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/869bebf7-6860-4a70-9473-f187f887a9ee_CleanShot%202022-11-16%20at%2012.45.08.png\"></p><p><br></p><p><strong>2. 矽橡膠( Silicone Rubber )</strong></p><p>商品型號: Dragon Skin™ 10 NV</p><p>製造商: Smooth-On</p><p><span style=\"color: rgb(0, 0, 0);\">產品資料: </span><a href=\"https://www.smooth-on.com/products/dragon-skin-10-nv/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://www.smooth-on.com/products/dragon-skin-10-nv/</a>&nbsp;</p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/b2d6ef2c-8daf-4e8f-bf11-3d82a995530b_CleanShot%202022-11-16%20at%2012.45.25.png\"></p><p><br></p><p><strong>3. 可編程磁場感測器 ( Magnetometer )</strong></p><p>商品編號: MLX90393</p><p>製造商: Melexis</p><p><span style=\"color: rgb(0, 0, 0);\">產品資料: </span><a href=\"https://www.digikey.tw/zh/product-highlight/m/melexis/mlx90393-programmable-triaxis-magnetic-field-sensor\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://www.digikey.tw/zh/product-highlight/m/melexis/mlx90393-programmable-triaxis-magnetic-field-sensor</a></p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/3e2e1b2d-703c-4dda-b3bc-e0b66e1e0315_CleanShot%202022-11-16%20at%2012.45.37.png\">&nbsp;</p><p><strong>4. 協作機器人 ( Sawyer robot )</strong></p><p>Soft Machines LAB in Carnegie Mellon University @USA</p><p><span style=\"color: rgb(0, 0, 0);\">網址: </span><a href=\"http://sml.me.cmu.edu/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">http://sml.me.cmu.edu/</a></p><p><br></p><p>AGI Labs @India</p><p><span style=\"color: rgb(0, 0, 0);\">網址: </span><a href=\"https://agilabsindia.com/index.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://agilabsindia.com/index.html</a></p>', NULL, 1, 1, 'normal', NULL, '<p>塑膠皮膚(ReSkin)，簡單來說就是一個 \"柔軟的傳感器 (Soft Sensor) \"，其價格便宜，尺寸輕巧，耐用度持久，且即便換掉了汰換也方便，除了能夠蒐集兩個物件之間的被動密合接觸(passive conformal contact)數據外，更可以蒐集「主動接觸(active contact)的數據」。有了這些數據，未來的機器人就可以從事許多動作比較輕巧且複雜的工作，像是抱小孩、包餃子….等工作。</p><p><br></p><p>那到底 ReSkin在機器手臂的表現上，有什麼差別呢?</p><p>可以看一下以下兩張圖片，沒有ReSkin 的機器手臂，在拿小藍莓的時候會直接把它捏爆，因為他們被輸入的運算太粗糙簡單，沒辦法用適當力道抓取小藍莓；但有ReSkin的機器手臂，就可以用很輕巧的動作把小藍莓拿起來了!</p><p>&nbsp;</p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/b8b0bcf3-dbe8-4997-81f5-7556438d48d8_ReSkin%20%E9%87%8D%E9%BB%9E%E7%99%BC%E4%BD%88-2.png\"><img src=\"https://bondingtechs.com/public/uploads/20221116/c5e86357-6f4c-42e1-816c-ea528b04209e_ReSkin%20%E9%87%8D%E9%BB%9E%E7%99%BC%E4%BD%88-1.png\"></p><p>圖片來源 | <a href=\"https://youtu.be/SxT_G-Im_CA\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://youtu.be/SxT_G-Im_CA</a></p>', '塑膠皮膚(ReSkin)，簡單來說就是一個 \"柔軟的傳感器 (Soft Sensor) \"，其價格便宜，尺寸輕巧，耐用度持久', NULL, 'Miss H', NULL),
(28, '2022-11-16 13:33:46.000000', '2022-11-21 06:58:17.000000', '大勤化成參展介紹', 'https://bondingtechs.com/public/uploads/20221116/228f92ab-8db3-4efc-9df7-f432956c9928_image1.jpg', 1, 'aqualux-exhibit-intro', '2022-11-16 13:33:51', 1, 1, NULL, NULL, 'published', NULL, '<p>隨著電動車技術以火箭般地速度成長，現在大眾對於電動車的接受度愈來愈高，許多車廠也開始紛紛投入，我們似乎已經可以看到一絲絲完全無人駕駛的希望，而車廠們也一直在思考，如何提供給未來的乘客更好更舒適的乘車體驗呢?</p><p><br></p><p>我們可以看到，Nissan今年推出的 2023 ARIYA 設計概念影片，就有介紹</p><p><br></p><p>除了車子外觀整體流線型的設計外，車內的面板以及所有裝飾，也都想呈現更流暢且更整體感的設計，許多功能也都開始設計得跟手機一樣的使用體驗，其中可以看到，曲面的觸控面板、藏在塑膠殼下的觸控體驗取代傳統按鈕、聲音控制我們常調整的車內環境、電動滑動中控台....等</p><p><br></p><p>身為平民老百姓的我們，要如何在科技量產前，就去體驗一下這未來科技感呢?</p><p><br></p><p>這周在南港展覽館舉辦的</p><p>「台北國際汽機車零配展&amp;台北國際車用電子展」</p><p>可以去大勤化成的攤位 J0232&nbsp;</p><p><span style=\"color: rgb(6, 6, 6);\">公司網頁: </span><a href=\"https://l.facebook.com/l.php?u=http%253A%252F%252Faqualux.com.tw%252F%253Ffbclid%253DIwAR0YHOl230nMK78TnEr80m5SSUB3ie8dAXjJHVzr93_Fw46wC52-DVa_0xE&amp;h=AT12PavGkbHUWw-v0zyAtjMfKe78lemnc3ZF0d1Vv93TT9-B0dgn6izVTF-i9CjjVkxQXW504KfTi3-0mAbVAK2A9mzRhZSIoPIKWmq-b_WEkkFTW89Bk9I2uqp_FHVXvyMjU-H17ALz1XKbl6Nx&amp;__tn__=-UK-R&amp;c%255b0%255d=AT3A5tKj-Q6WqKUL5ui5e2pcXWxWi-rh5CnbpCFaJ9vjpjrAjPjFQ7rplLSjQxcYUW8Hfbtq4pmuZWJ4EdTLZDttvklhnkpSEnmG8wH5UbiUlM4D7ylKibk47czGy5j53Lt8ihlSM0qP2i99Ny0nOaViHdwd2TFh4Zv4F2-7mUOU8SLusL5YenR-qdXe-vfTQ7Prvg\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">http://aqualux.com.tw/</a></p><p>看看 「藏在塑膠殼下的觸控」取代傳統按鈕是什麼感覺跟體驗喔!</p><p><br></p><p><br></p><p>參展資訊及預先登錄 QR Code 請參下方留言區喔!</p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/228f92ab-8db3-4efc-9df7-f432956c9928_image1.jpg\"></p><p><br></p><p>作者 | Miss H</p><p>撰寫日期 | 2022.4.18</p><p><span style=\"color: rgb(6, 6, 6);\">影片 | </span><a href=\"https://l.facebook.com/l.php?u=https%253A%252F%252Fyoutu.be%252Fd4AEc3PEouI%253Ft%253D100%2526fbclid%253DIwAR0XycmwVuBV_eRjSeG8W6X1iDSQIuEWbIPEfXML2dIj5_SBVLoHLCxEgDE&amp;h=AT0FODk_fNtGVd1a-R6DK1yT9-D4v3SNpxzGgvyW6LtG4ac7RBtuJxM5oSFmb4-p9kT-sgCi9UKcomSR6tYS7KYHujTpMyhmJ9G4hA5FIAHichNuatWK7wMxADYDxRiic6nsEFcaEE0Hy5Ew0iVW&amp;__tn__=-UK-R&amp;c%255b0%255d=AT3A5tKj-Q6WqKUL5ui5e2pcXWxWi-rh5CnbpCFaJ9vjpjrAjPjFQ7rplLSjQxcYUW8Hfbtq4pmuZWJ4EdTLZDttvklhnkpSEnmG8wH5UbiUlM4D7ylKibk47czGy5j53Lt8ihlSM0qP2i99Ny0nOaViHdwd2TFh4Zv4F2-7mUOU8SLusL5YenR-qdXe-vfTQ7Prvg\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">https://youtu.be/d4AEc3PEouI?t=100</a></p><p><br></p><p><br></p><p><a href=\"https://www.facebook.com/hashtag/%25E9%259B%25BB%25E5%258B%2595%25E8%25BB%258A?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\">#電動車</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/%25E6%2599%25BA%25E8%2583%25BD%25E8%25A1%25A8%25E9%259D%25A2?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#智能表面</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/%25E9%259B%25BB%25E5%25AD%2590%25E5%258A%25A0%25E5%25B7%25A5%25E8%2596%2584%25E8%2586%259C?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#電子加工薄膜</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/%25E6%25B1%25BD%25E8%25BB%258A%25E5%2585%25A7%25E9%25A3%25BE%25E4%25BB%25B6?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#汽車內飾件</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/uv%25E6%25B0%25B4%25E8%25BD%2589%25E5%258D%25B0?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#UV水轉印</a></p><p><a href=\"https://www.facebook.com/hashtag/%25E6%2591%25B8%25E7%259A%2584%25E5%2588%25B0%25E7%259A%2584%25E8%25A1%25A8%25E9%259D%25A2%25E5%258A%25A0%25E5%25B7%25A5?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\">#摸的到的表面加工</a></p><p><a href=\"https://www.facebook.com/hashtag/ev?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\">#EV</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/nissan?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#Nissan</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/ariya?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#ARIYA</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/smartsurface?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#SmartSurface</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/uvwatertransferfilm?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#UVwatertransferfilm</a></p><p><a href=\"https://www.facebook.com/hashtag/taipeiampa?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\">#TaipeiAMPA</a><span style=\"color: rgb(6, 6, 6);\"> </span><a href=\"https://www.facebook.com/hashtag/tapeiautotronics?__eep__=6&amp;__cft__%255b0%255d=AZV6pt_XbKBi0R3nUWCLdwZR5o7jmT2uDH3Rr4fgh3Tceb4LZaznd9KcWx-nHEafL3tc0AH7yd1NKVnRBFiAZ0h3gLA3ZUUQllCUlx9mohIw35quluKgZBvkVui5sVNjMO4EmxPzrFHeQ4alx2CcRlzz-PuQ3CN5_Ts11_GkYCaxXA&amp;__tn__=*NK-R\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\">#TapeiAutotronics</a></p>', NULL, 0, 1, 'normal', NULL, '<p>隨著電動車技術以火箭般地速度成長，現在大眾對於電動車的接受度愈來愈高，許多車廠也開始紛紛投入，我們似乎已經可以看到一絲絲完全無人駕駛的希望，而車廠們也一直在思考，如何提供給未來的乘客更好更舒適的乘車體驗呢?</p><p><br></p><p>我們可以看到，Nissan今年推出的 2023 ARIYA 設計概念影片，就有介紹</p>', '隨著電動車技術以火箭般地速度成長，現在大眾對於電動車的接受度愈來愈高，許多車廠也開始紛紛投入，我們似乎已經可以看到一絲絲完全無人駕駛的希望，而車廠們也一直在思考，如何提供給未來的乘客更好更舒適的乘車體驗呢?', NULL, 'Miss H', NULL),
(29, '2022-11-16 13:37:43.000000', '2022-11-21 06:58:06.000000', '日本三洋化成工業十年磨一劍！全樹脂電池可望成為儲能明日之星', 'https://bondingtechs.com/public/uploads/20221116/b7c43385-e3e8-46a7-88fd-974d52d41334_APB-624x321.jpeg', 1, 'sanyo-kasei-apb-all-polymer-battery', '2022-11-16 13:37:45', 1, 1, NULL, NULL, 'published', NULL, '<p class=\"ql-align-center\"><img src=\"https://bondingtechs.com/public/uploads/20221116/b7c43385-e3e8-46a7-88fd-974d52d41334_APB-624x321.jpeg\"></p><p>綠色能源需求大增，推動相應的儲能技術，電池也不斷追求更高的性能。近來全樹脂電池便以後起之秀姿態加入戰局，它和傳統鋰電池一樣，利用鋰離子在正負極移動來充電和放電，但鋰電池使用許多金屬材料，而全樹脂電池則把金屬製的電極以及電解液都改用樹脂，具有高安全性、低成本的優勢。</p><p><br></p><p>目前全樹脂電池的領導廠商是日本三洋化成工業出資的APB公司，今年10月，APB在福井縣越前市的新廠開始量產，年產能為20萬瓩/時；未來大規模自動化量產後，長期目標是售價比鋰離子電池便宜一半。</p><p><br></p><h3>解決電池問題&nbsp;新材料問世</h3><p>電池從最早期的鈷酸鋰電池，進展到比亞迪使用的磷酸鋰鐵電池、特斯拉電動車使用的三元鋰電池，都是為了滿足容量大、壽命長等需求。但無論如何，安全一直是個難題，因為鋰離子電池一旦受到撞擊或擠壓等造成短路，大量電流會通過金屬製的集電體，過熱可能導致失火。</p><p><br></p><p>全固態電池於是應運而生，它採用固體的電解質，沒有液體外漏之虞，能降低溫度急遽變化帶來的失火風險。此外，固態電池能量密度高，容量比傳統電池多50%，未來可能進一步提升；另一個優點是充電時間短，充電一次能行駛的距離大幅拉長。日本豐田、TDK等廠商正如火如荼研發相關技術，村田製作所更預定本年度內量產小型固態電池。</p><p><br></p><p>近來，全新概念的全樹脂電池也將問世，由於這種電池把金屬製的電極以及電解液都改用樹脂，它有3種好處。</p><p><br></p><p>第一，安全性高。全樹脂電池因為用抗阻大的樹脂，即使短路也不會流入大量電流，比較安全。第二，製造成本低。鋰電池約有20道製程，全樹脂電池的製程還不到10道，設備投資負擔也輕。第三，電池性能優。全樹脂電池的能量密度較高，容量約是傳統電池的2倍，而且形狀的自由度高，也容易大型化。</p><p><br></p><p>目前全樹脂電池的用途，主要是用於定置型電池。太陽能、風力發電等再生能源的儲能裝置需要安全而廉價，但現有鋰電池的成本太高，也有安全疑慮。有別於電動車電池，再生能源儲能不需要充電速度快、放電電流大等充放電的能力，而是約8小時的長時間電流充放，這完全符合了全樹脂電池的特性。</p><p><br></p><p>全樹脂電池的領導廠商是三洋化成工業出資的APB。1990年代，當時任職於日產汽車的APB執行長堀江英明，研發電動車LEAF時，雖然有全樹脂電池的構想，但拜訪了多家化學廠商，一直找不到適合的材料。直到2012年，三洋化成得悉堀江英明的構想，雙方展開合作，技術才有突破性進展。</p><p class=\"ql-align-center\"><img src=\"http://127.0.0.1:8001/public/uploads/20221116/9488f065-108f-4863-b6b7-70a3be17de6e_All-Polymer-Battery-e1635391398760.jpeg\"></p><p class=\"ql-align-center\"><strong style=\"color: rgb(68, 68, 68);\">▲三洋化成工業投資的APB，擁有獨創的全樹脂電池技術</strong></p><p><br></p><p>1949年成立的三洋化成，產品包括紙尿布用的高吸水性樹脂、潤滑油添加劑等，當時也在尋找使用樹脂的新事業。</p><p><br></p><p>《日經商業週刊》報導，雙方合作後的3個月內，每兩星期就試一次材料，總共試了30、40種，做了大約5,000種樣本，三洋化成累計負擔了數十億日圓的研發費用。</p><p><br></p><h3>軟銀子公司也要委託開發</h3><p>商業化有了眉目後，2018年堀江離開日產汽車成立APB。2019年三洋化成對APB注資，目前持股超過四成，營運長兼科技長進藤康裕也來自三洋化成。而擁有全樹脂電池專利的日產，2020年將專利技術轉移給APB，完善了APB從開發到製造的技術；去年大林組、帝人、橫河電機等十多家公司，也對APB出資共100億日圓。</p><p><br></p><p>今年10月，APB在福井縣越前市的新廠開始量產，川崎重工業打造的調查用水下無人載具（AUV），已決定採用這款電池。AUV的功能是在維修海底電纜、油管等設備，因為要在水中長時間作業，需要大容量又能耐水壓的電池。</p><p><br></p><p>此外，發電廠、搭載手機基地台的無人機等業者，也有高度興趣。去年9月，在美國新墨西哥州完成「無人機行動基地台」測試的軟體銀行子公司HAPS Mobile，也決定委託APB開發專用全樹脂電池。</p><p><br></p><p>由於車用動力電池和定置型儲能電池的系統不同，各汽車業者的需求也互異，APB初期將以供應定置型需求為主。該公司預估2025年後，全樹脂電池的營業額將達到900億日圓，前景值得期待。</p>', NULL, 1, 0, 'normal', NULL, '<p>綠色能源需求大增，推動相應的儲能技術，電池也不斷追求更高的性能。近來全樹脂電池便以後起之秀姿態加入戰局，它和傳統鋰電池一樣，利用鋰離子在正負極移動來充電和放電，但鋰電池使用許多金屬材料，而全樹脂電池則把金屬製的電極以及電解液都改用樹脂，具有高安全性、低成本的優勢。</p><p><br></p><p>目前全樹脂電池的領導廠商是日本三洋化成工業出資的APB公司，今年10月，APB在福井縣越前市的新廠開始量產，年產能為20萬瓩/時；未來大規模自動化量產後，長期目標是售價比鋰離子電池便宜一半。</p>', '綠色能源需求大增，推動相應的儲能技術，電池也不斷追求更高的性能。近來全樹脂電池便以後起之秀姿態加入戰局', NULL, '財訊', NULL),
(30, '2022-11-16 13:42:09.000000', '2022-11-21 06:57:52.000000', '【圖解】掌握電池者得天下！寧德時代、LG化學、Panasonic三大廠成全球車廠拉攏對象', 'https://bondingtechs.com/public/uploads/20221116/ceedc622-8f94-45ae-b354-210c5b171d2b_img-1615784928-78952@900.jpeg', 1, 'ev-battery-market-catl-lgchem-panasonic', '2022-11-21 06:53:24', 1, 1, NULL, NULL, 'published', NULL, '<p>全球環保意識在疫情下大爆發，也促使電動車成為各國顯學。當德國、日本、韓國等多國紛紛設下販售燃油新車的最後期限，不僅投入電動車的新創如雨後春筍般冒出，各大車廠也接連展現電動車的決心，甚至宣示將全面轉型為電動車廠。</p><p>根據國際能源署的預估，全球電動車總數將以每年36%的複合成長率持續增加，在2030年累計到2.45億輛的規模。德勤也預估，電動車銷量將在2030年達到3,100萬，占整體汽車銷售的32%。</p><p>這股席捲世界各國的電動車浪潮，也成為各大電池業者爭奪的戰場，電池佔據整車成本的3分之1以上，說是電動車的心臟也不為過。全球電池的需求量也預估將從不到200 GWh，在10年內飆漲至3,000 GWh以上。</p><p><a href=\"https://www.bnext.com.tw/article/72511/cathayholdings202211?utm_campaign=2022cathaycon&amp;utm_source=web_bn&amp;utm_medium=middle_text&amp;utm_content=63297&amp;utm_term=channel_1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51); background-color: transparent;\">國泰世華現代化IT團隊掌握金融創新發展致勝關鍵，擁抱中台策略與開源軟體加速轉型步伐</a></p><p>目前全球排行前三大的電動車電池業者分別是寧德時代、LG化學及Panasonic，這電池三雄的一舉一動，以及孰勝孰負，已成為外界密切關注的焦點。</p><p><img src=\"https://bondingtechs.com/public/uploads/20221116/daa9b95a-2e06-46b2-b1cc-aaa53b7b7975_CleanShot 2022-11-16 at 13.40.07.png\"></p><h2>能量密度誰勝出？</h2><p>擔憂電動車電力是否夠用的「里程焦慮」，是當今消費者對電動車卻步的關鍵因素之一，打造出具有更高能量密度的電池，強化電動車的續航力，也成為電池廠、車廠的重要目標。</p><p>根據中國開源證券的研究報告，寧德時代的磷酸鐵（LFP）鋰電池的能量密度為178 Wh/kg，而鎳鈷錳（NCM）鋰電池的能量密度為240 Wh/kg。這份報告披露，Panasonic的鎳鈷鋁（NCA）鋰電池的能量密度為260 Wh/kg，LG化學鎳鈷錳（NCM）鋰電池的能量密度則為250 Wh/kg。</p><p>不過也有報導指出，LG化學供應奧迪e-tron及保時捷Taycan等高階電動車款的LGX E78，已超越過往電池的能量密度，可達到265 Wh/kg，更勝於Panasonic的電池表現。</p><p>就現況看來，電池能量密度上Panasonic與LG化學不相伯仲，寧德時代稍微略遜一籌，但開源證券報告指出，目前能夠量產、尚未適用於特定車型的電池，寧德時代可達到304 Wh/kg，已接近Panasonic的310 Wh/kg。</p><p>另外，寧德時代投資LFP電池的布局，也可能為這間中國新創帶來不一樣的機會，LFP電池雖然能量密度上不比三元電池（正極材料使用鎳鈷錳酸鋰或鎳鈷鋁酸鋰等三元聚合物的鋰離子二次電池），但更為安全、低價的性質也讓它在部份市場佔有一席之地，例如中國版Model 3就選用LFP電池。寧德時代更預估，2021年LFP電池在電動車的裝機量將超越三元電池。</p><h2>三大電池廠誰最能賺？</h2><p>電動車在全球成為趨勢，無論傳統車廠、新創公司都紛紛加入戰局，各家電池廠也為了爭奪市場份額使出渾身解數，但誰是體質健康的商業模式，誰又是打腫臉充胖子，或許從各家的財報上能夠窺見一二。</p><p>由於寧德時代尚未公佈2020年第四季的財報，因此本文先比較2020年7至9月財務成績。</p><p>LG化學2020年第三季財報中，能源解決方案營收達到3.14兆韓元（約27.7億美元），較前一年同期成長42%，營業利潤則為1,690億韓元（約1.49億美元），利潤率為5.3%左右。</p><p>Panasonic 2020第三季財報中，車用電池營收達到1,183億日圓（約10.87億美元），利潤方面並未單獨公佈，不過整個汽車部門營業利潤為51億日圓（約4,700萬美元），利潤率為1.4%。</p><p>寧德時代2020第三季營收127億人民幣（19.6億美元），較前一年同下降4%，利潤14.2億人民幣（2.2億美元），利潤率11.2%。</p><p>相較於LG化學與Panasonic，寧德時代在利潤率方面有著非常顯著的領先幅度，即使營收只有LG化學的一半不到，利潤卻遠遠超越。值得注意的是，寧德時代獲得相當高的政府補助，2020年前9個月認列額度接近9.2億人民幣。</p><p>各國對於電池產業多多少少都有部份補助，例如LG化學也在財報中指出，2020年前9個月獲得的政府補助達2,093億韓元，然而LG化學業務龐雜，難以斷言有多少屬於電池業務。</p><p>不過，寧德時代2020年前三季利潤達33.57億人民幣（約5.2億美元）即使扣除政府補助的9.2億人民幣，其利潤率仍然高達7.7%，中國製造的低成本優勢在此展露無疑。</p><h2>車廠、電池廠拉幫結盟，三股勢力各自壯大</h2><p>當各家車廠加入這股電動車浪潮時，與電池廠商「拉幫結盟」已成為慣例。儘管這三大電池廠的產品都已獲得全球多家國際車廠選用，各自也有著更為深入合作的夥伴。</p><p>去年10月，LG化學曾傳出正與多家車廠進行談判，試圖建立一家合資企業生產電池。近期也傳出正與通用汽車合作，共同研究在美國設立第二座電池工廠的計畫，兩者過往就已成立合資企業在美國設立一座電池工廠。</p><p>寧德時代也在去年中獲得日本車廠本田入股，以49.5億人民幣認購1%股份，並計畫將就電池技術展開合作、研究電池回收可能性，並預計於2022年推出搭載寧德時代電池的電動車。</p><p>另外，BMW也與寧德時代合作，計畫於德國設立電池廠，預計2022年達到14 Gwh產能；BMW在中國的合資公司也曾在2018年以約28.5億人民幣入股寧德時代</p><p>Panasonic則在去年4月與Toyota以Toyota 51%、Panasonic 49%的出資比例成立合資公司Prime Planet Energy Solutions，目的之一便是為開發出不輸寧德時代的電池。</p><p>儘管Panasonic在電池技術仍然有優勢，能量密度上居於領先，但無論營利能力、產能、市占率都不斷被對手趕上甚至超越，外界預測2021年的產能更只有寧德時代、LG化學的一半不到。</p><p>全球燃油車龍頭Toyota，過去以混合動力及氫能車為主，近期更傳出將推出第一款電動休旅車，也有望搭載Panasonic生產的電池。</p>', NULL, 1, 1, 'normal', NULL, '<p>全球環保意識在疫情下大爆發，也促使電動車成為各國顯學。當德國、日本、韓國等多國紛紛設下販售燃油新車的最後期限，不僅投入電動車的新創如雨後春筍般冒出，各大車廠也接連展現電動車的決心，甚至宣示將全面轉型為電動車廠。</p><p>根據國際能源署的預估，全球電動車總數將以每年36%的複合成長率持續增加，在2030年累計到2.45億輛的規模。德勤也預估，電動車銷量將在2030年達到3,100萬，占整體汽車銷售的32%。</p><p>這股席捲世界各國的電動車浪潮，也成為各大電池業者爭奪的戰場，電池佔據整車成本的3分之1以上，說是電動車的心臟也不為過。全球電池的需求量也預估將從不到200 GWh，在10年內飆漲至3,000 GWh以上。</p><p><a href=\"https://www.bnext.com.tw/article/72511/cathayholdings202211?utm_campaign=2022cathaycon&amp;utm_source=web_bn&amp;utm_medium=middle_text&amp;utm_content=63297&amp;utm_term=channel_1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(51, 51, 51);\">國泰世華現代化IT團隊掌握金融創新發展致勝關鍵，擁抱中台策略與開源軟體加速轉型步伐</a></p><p>目前全球排行前三大的電動車電池業者分別是寧德時代、LG化學及Panasonic，這電池三雄的一舉一動，以及孰勝孰負，已成為外界密切關注的焦點。</p>', '電動車熱潮在全球掀起，身為全球前三大電池廠的寧德時代、LG化學及Panasonic，現況又是如何？', NULL, '陳建鈞', NULL);

INSERT INTO `news_article_category` (`id`, `createTime`, `updateTime`, `articleId`, `categoryId`) VALUES
(161, '2022-11-21 06:57:52.863738', '2022-11-21 06:57:52.863738', 30, 21),
(162, '2022-11-21 06:57:52.869990', '2022-11-21 06:57:52.869990', 30, 17),
(163, '2022-11-21 06:58:06.119980', '2022-11-21 06:58:06.119980', 29, 21),
(164, '2022-11-21 06:58:06.151157', '2022-11-21 06:58:06.151157', 29, 17),
(165, '2022-11-21 06:58:17.922227', '2022-11-21 06:58:17.922227', 28, 21),
(166, '2022-11-21 06:58:17.928709', '2022-11-21 06:58:17.928709', 28, 17),
(171, '2022-11-23 18:35:56.301422', '2022-11-23 18:35:56.301422', 27, 19),
(172, '2022-11-23 18:35:56.313322', '2022-11-23 18:35:56.313322', 27, 17);

INSERT INTO `news_article_collection` (`id`, `createTime`, `updateTime`, `articleId`, `userId`) VALUES
(28, '2022-11-16 13:58:01.945088', '2022-11-16 13:58:01.945088', 29, 61),
(29, '2022-11-21 15:36:08.788099', '2022-11-21 15:36:08.788099', 30, 64);

INSERT INTO `news_article_like` (`id`, `createTime`, `updateTime`, `articleId`, `userId`) VALUES
(71, '2022-11-16 13:58:02.347861', '2022-11-16 13:58:02.347861', 29, 61);

INSERT INTO `news_article_view` (`id`, `createTime`, `updateTime`, `articleId`, `userId`, `count`) VALUES
(393, '2022-11-16 14:01:49.617064', '2022-11-16 14:01:49.617064', 29, 61, 1),
(394, '2022-11-16 14:03:25.399744', '2022-11-16 14:03:25.399744', 30, 61, 1),
(395, '2022-11-16 14:03:27.782339', '2022-11-16 14:03:27.782339', 27, 61, 1),
(396, '2022-11-16 14:03:30.068989', '2022-11-16 14:03:30.068989', 28, 61, 1),
(398, '2022-11-21 15:31:59.392913', '2022-11-21 15:31:59.392913', 27, 64, 1),
(399, '2022-11-21 15:32:27.724105', '2022-11-21 15:32:27.724105', 28, 64, 1),
(400, '2022-11-21 15:36:06.415352', '2022-11-21 15:36:06.415352', 30, 64, 1),
(401, '2022-11-23 18:34:13.333695', '2022-11-23 18:34:13.333695', 30, 63, 1);

INSERT INTO `space_info` (`id`, `createTime`, `updateTime`, `url`, `type`, `classifyId`) VALUES
(9, '2022-11-16 12:27:23.631000', '2022-11-16 16:20:36.135399', 'https://bondingtechs.com/public/uploads/20221116/c5e86357-6f4c-42e1-816c-ea528b04209e_ReSkin 重點發佈-1.png', 'image', NULL),
(10, '2022-11-16 12:27:23.658000', '2022-11-16 16:20:36.135166', 'https://bondingtechs.com/public/uploads/20221116/b8b0bcf3-dbe8-4997-81f5-7556438d48d8_ReSkin 重點發佈-2.png', 'image', NULL),
(11, '2022-11-16 12:47:32.729000', '2022-11-16 16:20:36.134916', 'https://bondingtechs.com/public/uploads/20221116/f497a59d-9c53-4b77-8841-734b3bd94df6_CleanShot 2022-11-16 at 12.44.57.png', 'image', NULL),
(12, '2022-11-16 12:47:32.754000', '2022-11-16 16:20:36.134672', 'https://bondingtechs.com/public/uploads/20221116/e71ed9da-6555-47e7-a07c-bdd54359a36f_CleanShot 2022-11-16 at 12.44.41.png', 'image', NULL),
(13, '2022-11-16 12:47:32.773000', '2022-11-16 16:20:36.134449', 'https://bondingtechs.com/public/uploads/20221116/869bebf7-6860-4a70-9473-f187f887a9ee_CleanShot 2022-11-16 at 12.45.08.png', 'image', NULL),
(14, '2022-11-16 12:47:32.780000', '2022-11-16 16:20:36.134208', 'https://bondingtechs.com/public/uploads/20221116/b2d6ef2c-8daf-4e8f-bf11-3d82a995530b_CleanShot 2022-11-16 at 12.45.25.png', 'image', NULL),
(15, '2022-11-16 12:47:32.836000', '2022-11-16 16:20:36.133959', 'https://bondingtechs.com/public/uploads/20221116/3e2e1b2d-703c-4dda-b3bc-e0b66e1e0315_CleanShot 2022-11-16 at 12.45.37.png', 'image', NULL),
(16, '2022-11-16 13:32:05.494000', '2022-11-16 16:20:36.133742', 'https://bondingtechs.com/public/uploads/20221116/228f92ab-8db3-4efc-9df7-f432956c9928_image1.jpg', 'image', NULL),
(17, '2022-11-16 13:35:47.379000', '2022-11-16 16:20:36.133284', 'https://bondingtechs.com/public/uploads/20221116/9488f065-108f-4863-b6b7-70a3be17de6e_All-Polymer-Battery-e1635391398760.jpeg', 'image', NULL),
(18, '2022-11-16 13:35:47.477000', '2022-11-16 16:20:36.133033', 'https://bondingtechs.com/public/uploads/20221116/b7c43385-e3e8-46a7-88fd-974d52d41334_APB-624x321.jpeg', 'image', NULL),
(19, '2022-11-16 13:40:24.586000', '2022-11-16 16:20:36.132771', 'https://bondingtechs.com/public/uploads/20221116/daa9b95a-2e06-46b2-b1cc-aaa53b7b7975_CleanShot 2022-11-16 at 13.40.07.png', 'image', NULL),
(20, '2022-11-16 13:41:41.461000', '2022-11-16 16:20:36.132339', 'https://bondingtechs.com/public/uploads/20221116/ceedc622-8f94-45ae-b354-210c5b171d2b_img-1615784928-78952@900.jpeg', 'image', NULL),
(21, '2022-11-16 14:12:58.940000', '2022-11-16 14:12:58.940000', 'https://bondingtechs.com/public/uploads/20221116/077a6e11-39fa-4f87-9be7-02473b83dd38_ReSkin 重點發佈-1.png', 'image', NULL),
(22, '2022-11-16 17:45:10.528000', '2022-11-16 17:45:10.528000', 'https://bondingtechs.com/public/uploads/20221116/3b1b87fa-4c3c-41cb-80f0-c8f05738b560_img-1615784928-78952@900.jpeg', 'image', NULL);

INSERT INTO `space_type` (`id`, `createTime`, `updateTime`, `name`, `parentId`) VALUES
(1, '2022-05-17 16:04:37.272000', '2022-05-17 16:04:37.272000', '小知識', NULL),
(2, '2022-05-17 16:04:41.362000', '2022-05-17 16:04:41.362000', '新聞', NULL);

INSERT INTO `task_info` (`id`, `createTime`, `updateTime`, `jobId`, `repeatConf`, `name`, `cron`, `limit`, `every`, `remark`, `status`, `startDate`, `endDate`, `data`, `service`, `type`, `nextRunTime`, `taskType`) VALUES
(1, '2021-03-10 14:25:13.381172', '2021-03-10 14:25:19.011000', NULL, '{\"count\":1,\"type\":1,\"limit\":5,\"name\":\"每秒执行,总共5次\",\"taskType\":1,\"every\":1000,\"service\":\"taskDemoService.test()\",\"status\":1,\"id\":1,\"createTime\":\"2021-03-10 14:25:13\",\"updateTime\":\"2021-03-10 14:25:13\",\"jobId\":1}', '每秒执行,总共5次', NULL, 5, 1000, NULL, 0, NULL, NULL, NULL, 'taskDemoService.test()', 1, '2021-03-10 14:25:18', 1),
(2, '2021-03-10 14:25:53.000000', '2022-05-30 19:55:01.818168', NULL, '{\"jobId\":2,\"cron\":\"0/5 * * * * ? \",\"count\":1}', 'cron任务，5秒执行一次', '0/5 * * * * ? ', NULL, NULL, NULL, 0, NULL, NULL, NULL, 'taskDemoService.test()', 1, NULL, 0);

INSERT INTO `task_log` (`id`, `createTime`, `updateTime`, `taskId`, `status`, `detail`) VALUES
(1, '2021-03-10 14:25:14.020930', '2021-03-10 14:25:14.020930', 1, 1, '\"任务执行成功\"'),
(2, '2021-03-10 14:25:15.012030', '2021-03-10 14:25:15.012030', 1, 1, '\"任务执行成功\"'),
(3, '2021-03-10 14:25:16.011443', '2021-03-10 14:25:16.011443', 1, 1, '\"任务执行成功\"'),
(4, '2021-03-10 14:25:17.009939', '2021-03-10 14:25:17.009939', 1, 1, '\"任务执行成功\"'),
(5, '2021-03-10 14:25:18.010410', '2021-03-10 14:25:18.010410', 1, 1, '\"任务执行成功\"'),
(6, '2021-03-10 14:25:55.012816', '2021-03-10 14:25:55.012816', 2, 1, ''),
(7, '2021-03-10 14:26:00.011880', '2021-03-10 14:26:00.011880', 2, 1, ''),
(8, '2021-03-10 14:26:05.016832', '2021-03-10 14:26:05.016832', 2, 1, '\"任务执行成功\"'),
(9, '2021-03-10 14:26:10.011763', '2021-03-10 14:26:10.011763', 2, 1, '\"任务执行成功\"'),
(10, '2021-03-10 14:26:15.010246', '2021-03-10 14:26:15.010246', 2, 1, '\"任务执行成功\"'),
(11, '2022-05-30 19:54:55.124257', '2022-05-30 19:54:55.124257', 2, 1, '\"任务执行成功\"'),
(12, '2022-05-30 19:55:00.066587', '2022-05-30 19:55:00.066587', 2, 1, '\"任务执行成功\"');

INSERT INTO `tip` (`id`, `createTime`, `updateTime`, `title`, `publishDate`, `status`, `content`) VALUES
(2, '2022-06-30 15:43:28.538000', '2022-06-30 15:43:28.538000', '今日小知識', '2022-06-30', 'published', ''),
(3, '2022-06-30 15:43:42.000000', '2022-07-05 23:31:13.000000', '小知識標題', '2022-07-05', 'published', ''),
(4, '2022-08-16 12:05:32.000000', '2022-11-03 23:57:20.000000', '小知識測試', '2022-11-03', 'published', '<h1><span style=\"background-color: transparent;\">10 Blog Examples for Your Inspiration</span></h1><p><br></p><p><span style=\"background-color: transparent;\"><img src=\"https://static.wixstatic.com/media/0e0314_46871fae1bae4ead92d0eb9c0cd07dfe~mv2.png/v1/fill/w_1158,h_662,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0e0314_46871fae1bae4ead92d0eb9c0cd07dfe~mv2.png\"></span></p><p><br></p><p><em style=\"background-color: transparent;\">This post was last updated on February 20, 2022.</em></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">Blogging has long been a popular way for people to express their passions, experiences and ideas with readers worldwide.</span></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">A blog can be its own website, or an add-on to an existing site. Whichever option you choose, it serves as a space to share your story or market your expertise in your own words, with your own visual language to match.</span></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">To help </span><a href=\"https://www.wix.com/start/blog\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\">create a blog</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\"> of your own, we’ve compiled this selection of ten blog examples. They’re packed with all the design wisdom you need to transform your blog into one of the best in the business.</span></p><p><br></p><p><br></p><h3><span style=\"background-color: var(--ricos-custom-h3-background-color,unset);\">10 inspiring blog examples</span></h3><ol><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-2iqlc\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Zion Adventure Photog</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-6atle\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Mrs. Space Cadet</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-bdb1l\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Simply Tabitha</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-e60qv\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Lizzy Hadfield</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-9m9f7\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Suvelle Cuisine</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-4uo07\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Mikaela Reuben</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-4el2c\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Seasons in Colour</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-70gcl\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Not Another Cooking Show</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-4tr94\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Roshini Kumar</a> </li><li><a href=\"https://www.wix.com/blog/2018/08/blog-examples/#viewer-1ophb\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff)); background-color: transparent;\">Olivia and Laura</a> </li></ol><p><br></p><p><br></p><h3><span style=\"background-color: var(--ricos-custom-h3-background-color,unset);\">01. </span><a href=\"https://www.zionadventurephotog.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\">Zion Adventure Photog</a></h3><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">When you\'re first approaching the question of</span><a href=\"https://www.wix.com/blog/2021/02/how-to-start-a-blog/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\"> how to start a blog</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">, check out Zion Adventure Photog. The blog has a dual purpose: owner Arika’s photography portfolio and establishing her expertise of the Zion area. With these, she’s able to</span><a href=\"https://www.wix.com/blog/2020/12/how-to-make-money-blogging/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\"> make money blogging</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">.</span></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">The blog’s ruggedly playful green and yellow color scheme evokes nature and sunshine. The blog’s homepage features visual testimonials of happy clients enjoying their adventures. She embeds her Instagram Feed directly onto her site, spreading the word about her service and drawing people deeper into her brand.</span></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">The blog design mirrors its content in depth and expertise. Detailed posts provide detailed guidance on activities such as canyoneering and hiking. From the written content, it’s clear that Arika is an expert in her field, and the visuals confirm her photography skills.</span></p><p><br></p><p><br></p><p><a href=\"https://www.zionadventurephotog.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent;\"><img src=\"https://static.wixstatic.com/media/0e0314_3aecf0e7e284411bab905cec387ce685~mv2.png/v1/fill/w_1158,h_2300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/0e0314_3aecf0e7e284411bab905cec387ce685~mv2.png\" alt=\"zion adventure photog\"></a></p><p><br></p><h3><span style=\"background-color: var(--ricos-custom-h3-background-color,unset);\">02.</span><strong style=\"background-color: transparent;\"> </strong><a href=\"https://www.mrsspacecadet.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(17, 85, 204);\"><strong>Mrs. Space Cadet</strong></a></h3><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">On this blog’s </span><em style=\"background-color: transparent;\">My Story</em><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\"> page, the creator explains how she couldn’t find an online space that featured anything other than people’s perfect marathon training journeys. In response, she created this wonderfully authentic blog highlighting her, “Running through life one struggle at a time.”</span></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">The top fold features an image of the creator wearing crooked glasses and running on a treadmill with roller skates—a perfect embodiment of her </span><a href=\"https://www.wix.com/blog/2017/11/how-to-write-catchy-blog-titles/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\">blog title</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">. Her site features individual pages for her blog, podcast and </span><a href=\"https://www.wix.com/ecommerce/website\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\">online store</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\"> and includes links to her social media, all areas where she shares her incredibly relatable content. </span></p><p><br></p><p><br></p><p><a href=\"https://www.mrsspacecadet.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent;\"><img src=\"https://static.wixstatic.com/media/0e0314_f270b2afef02435f811f5575055d7525~mv2.png/v1/fill/w_1158,h_1986,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/0e0314_f270b2afef02435f811f5575055d7525~mv2.png\" alt=\"mrs. space cadet\"></a></p><p><br></p><p><br></p><h3><span style=\"background-color: var(--ricos-custom-h3-background-color,unset);\">03. </span><a href=\"https://www.simplytabitha.com/blog\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\">Simply Tabitha</a></h3><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">Tabitha\'s</span><a href=\"https://www.wix.com/blog/2020/12/personal-blog-tips/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\"> personal blog</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\"> is a stellar example of how sharing your thoughts and advice can powerfully build your online brand. She dishes out fashion and beauty advice in her blog posts then helps her audience of mommas replicate her look with a </span><em style=\"background-color: transparent;\">Shop the Post</em><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\"> widget at the end. And with Pinterest\'s Save buttons hovering over each picture, fans can keep her glamorous aesthetic on hand for inspiration.</span></p><p><br></p><p><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">Take note from this blog example—partnering with an affiliate and linking out to recommended products in your posts is a great way to</span><a href=\"https://www.wix.com/blog/2019/01/how-to-monetize-blog/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: var(--ricos-custom-link-color,var(--ricos-action-color,#0261ff));\"> monetize your blog</a><span style=\"background-color: var(--ricos-custom-p-background-color,unset);\">, as you’ll earn a commission for every sale that comes through your site.</span></p><p><br></p><p><br></p><p><a href=\"https://www.simplytabitha.com/blog\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent;\"><img src=\"https://static.wixstatic.com/media/0e0314_d37e25d2e6e046aea2e48d950f350e05~mv2.png/v1/fill/w_1158,h_1486,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0e0314_d37e25d2e6e046aea2e48d950f350e05~mv2.png\" alt=\"simply tabitha\"></a></p><p><br></p><p><br></p>');

INSERT INTO `tip_collection` (`id`, `createTime`, `updateTime`, `tipId`, `userId`) VALUES
(6, '2022-09-20 13:43:59.910548', '2022-09-20 13:43:59.910548', 4, 59),
(8, '2022-11-04 04:09:31.530360', '2022-11-04 04:09:31.530360', 4, 61);

INSERT INTO `tip_view` (`id`, `createTime`, `updateTime`, `tipId`, `userId`) VALUES
(1, '2022-07-05 23:27:20.345496', '2022-07-05 23:27:20.345496', 3, 45),
(2, '2022-08-16 12:15:33.911325', '2022-08-16 12:15:33.911325', 4, 59),
(3, '2022-11-03 23:57:29.428193', '2022-11-03 23:57:29.428193', 4, 61);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;