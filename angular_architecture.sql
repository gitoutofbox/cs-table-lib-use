-- phpMyAdmin SQL Dump
-- version 2.11.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 20, 2020 at 11:45 PM
-- Server version: 5.0.51
-- PHP Version: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `angular_architecture`
--

-- --------------------------------------------------------

--
-- Table structure for table `arc_blacklisted_users`
--

CREATE TABLE `arc_blacklisted_users` (
  `id` int(11) NOT NULL auto_increment,
  `user_email` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `modified_on` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `arc_blacklisted_users`
--

INSERT INTO `arc_blacklisted_users` (`id`, `user_email`, `created_on`, `modified_on`) VALUES
(1, 'test@test.com', '2020-02-22 07:10:37', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `arc_tables`
--

CREATE TABLE `arc_tables` (
  `id` int(11) NOT NULL auto_increment,
  `page_id` varchar(255) NOT NULL,
  `columns` text NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` timestamp NOT NULL default '0000-00-00 00:00:00' on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `arc_tables`
--

INSERT INTO `arc_tables` (`id`, `page_id`, `columns`, `created_on`, `updated_on`) VALUES
(1, '1', '[\r\n    {\r\n        "key" : "user_id",\r\n        "label": "User Id",\r\n        "width": "10%",\r\n        "sortingEnable": false,\r\n        "type": "sp_checkbox",\r\n        "filter_enable": false,\r\n        "filter_label": "User Id",\r\n        "filter_type": ""\r\n    },\r\n    {\r\n        "key" : "user_email",\r\n        "label": "Email",\r\n        "width": "50%",\r\n        "sortingEnable": true,\r\n        "type": "text",\r\n        "filter_enable": true,\r\n        "filter_label": "Email",\r\n        "filter_type": "dropdown",\r\n        "filter_selected": "admin@admin.com"\r\n    },\r\n    {\r\n        "key" : "user_first_name",\r\n        "label": "First Name",\r\n        "width": "30%",\r\n        "sortingEnable": true,\r\n        "type": "text",\r\n        "filter_enable": true,\r\n        "filter_label": "First name",\r\n        "filter_type": "autocomplete",\r\n        "filter_selected": ""\r\n    },\r\n    {\r\n        "key" : "action",\r\n        "label": "Action",\r\n        "width": "10%",\r\n        "sortingEnable": false,\r\n        "type": "component",\r\n        "components": ["ActionEditComponent", "ActionDeleteComponent"],\r\n        "filter_enable": false,\r\n        "filter_label": "",\r\n        "filter_type": "text"\r\n    }\r\n]', '0000-00-00 00:00:00', '2020-05-17 04:46:40'),
(2, '2', '[\r\n    {\r\n        "key" : "blacklist_id",\r\n        "label": "#Id",\r\n        "width": "10%",\r\n        "sortingEnable": false,\r\n        "type": "sp_checkbox",\r\n        "filterEnabled": false,\r\n        "filterType": "filter-text"\r\n    },\r\n    {\r\n        "key" : "user_email",\r\n        "label": "Blacklisted Email",\r\n        "width": "50%",\r\n        "sortingEnable": true,\r\n        "type": "text",\r\n        "filterEnabled": false,\r\n        "filterType": "filter-text"\r\n    },\r\n    {\r\n        "key" : "created_on",\r\n        "label": "Created on",\r\n        "width": "15%",\r\n        "sortingEnable": true,\r\n        "type": "text",\r\n        "filterEnabled": false,\r\n        "filterType": "filter-text"\r\n    },\r\n{\r\n        "key" : "modified_on",\r\n        "label": "Last updated on",\r\n        "width": "15%",\r\n        "sortingEnable": true,\r\n        "type": "text",\r\n        "filterEnabled": false,\r\n        "filterType": "filter-text"\r\n    },\r\n    {\r\n        "key" : "action",\r\n        "label": "Action",\r\n        "width": "10%",\r\n        "sortingEnable": false,\r\n        "type": "component",\r\n        "components": ["ActionEditComponent", "ActionDeleteComponent"],\r\n        "filterEnabled": false,\r\n        "filterType": "filter-text"\r\n    }\r\n]', '0000-00-00 00:00:00', '2020-05-10 15:40:34');

-- --------------------------------------------------------

--
-- Table structure for table `arc_table_page`
--

CREATE TABLE `arc_table_page` (
  `id` int(11) NOT NULL auto_increment,
  `page_id` varchar(255) NOT NULL,
  `table_name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `arc_table_page`
--

INSERT INTO `arc_table_page` (`id`, `page_id`, `table_name`) VALUES
(1, '1', 'arc_users'),
(2, '2', 'arc_blacklisted_users');

-- --------------------------------------------------------

--
-- Table structure for table `arc_users`
--

CREATE TABLE `arc_users` (
  `user_id` int(11) NOT NULL auto_increment,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_first_name` varchar(255) NOT NULL,
  `user_last_name` varchar(255) default NULL,
  `user_photo` varchar(255) default NULL,
  `is_active` tinyint(1) NOT NULL default '1',
  `created_on` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=81 ;

--
-- Dumping data for table `arc_users`
--

INSERT INTO `arc_users` (`user_id`, `user_email`, `user_password`, `user_first_name`, `user_last_name`, `user_photo`, `is_active`, `created_on`, `updated_on`) VALUES
(76, 'admin@admin.com', 'admin', 'fname', 'lname', NULL, 1, '2020-02-16 17:35:57', '0000-00-00 00:00:00'),
(80, 'sda@sdf.sdf', 'xvvxcx', 'fname', 'lname', 'v5.jpg', 1, '2020-02-22 08:05:59', '0000-00-00 00:00:00');
