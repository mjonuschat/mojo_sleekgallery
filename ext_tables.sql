#
# Table structure for table 'tx_mojosleekgallery_image'
#
CREATE TABLE tx_mojosleekgallery_image (
    uid int(11) NOT NULL auto_increment,
    pid int(11) DEFAULT '0' NOT NULL,
    tstamp int(11) DEFAULT '0' NOT NULL,
    crdate int(11) DEFAULT '0' NOT NULL,
    cruser_id int(11) DEFAULT '0' NOT NULL,
    sys_language_uid int(11) DEFAULT '0' NOT NULL,
    l18n_parent int(11) DEFAULT '0' NOT NULL,
    l18n_diffsource mediumblob NOT NULL,
    sorting int(10) DEFAULT '0' NOT NULL,
    deleted tinyint(4) DEFAULT '0' NOT NULL,
    hidden tinyint(4) DEFAULT '0' NOT NULL,
    title tinytext NOT NULL,
    description text NOT NULL,
    image blob NOT NULL,

    PRIMARY KEY (uid),
    KEY parent (pid)
);


#
# Table structure for table 'tt_content'
#
CREATE TABLE tt_content (
    tx_mojosleekgallery_enable tinyint(3) DEFAULT '0' NOT NULL
);
