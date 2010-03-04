<?php

########################################################################
# Extension Manager/Repository config file for ext "rgsmoothgallery".
#
# Auto generated 02-03-2010 10:17
#
# Manual updates:
# Only the data in the array - everything else is removed by next
# writing. "version" and "dependencies" must not be touched!
########################################################################

$EM_CONF[$_EXTKEY] = array(
    'title' => 'SleekGallery for TYPO3',
    'description' => 'Slideshow & Gallery. Shows images from directory folders, from records and inside tt_content (Element "Text with images") DAM and tt_news.',
    'category' => 'plugin',
    'shy' => 0,
    'version' => '1.0.0',
    'dependencies' => '',
    'conflicts' => '',
    'priority' => '',
    'loadOrder' => '',
    'module' => '',
    'state' => 'beta',
    'uploadfolder' => 0,
    'createDirs' => 'uploads/tx_mojosleekgallery/',
    'modify_tables' => '',
    'clearcacheonload' => 0,
    'lockType' => '',
    'author' => 'Morton Jonuschat',
    'author_email' => 'mjonuschat@gmail.com',
    'author_company' => '',
    'CGLcompliance' => '',
    'CGLcompliance_note' => '',
    'constraints' => array(
        'depends' => array(
        ),
        'conflicts' => array(
        ),
        'suggests' => array(
        ),
    ),
    '_md5_values_when_last_written' => 'a:77:{s:9:"ChangeLog";s:4:"5272";s:10:"README.txt";s:4:"ee2d";s:31:"class.tx_rgsmoothgallery_fe.php";s:4:"85e6";s:33:"class.tx_rgsmoothgallery_rgsg.php";s:4:"3502";s:21:"ext_conf_template.txt";s:4:"c9b6";s:12:"ext_icon.gif";s:4:"ecd9";s:17:"ext_localconf.php";s:4:"8220";s:14:"ext_tables.php";s:4:"f8c5";s:14:"ext_tables.sql";s:4:"0d79";s:28:"ext_typoscript_constants.txt";s:4:"3b61";s:18:"flexformDAM_ds.xml";s:4:"6178";s:15:"flexform_ds.xml";s:4:"c433";s:33:"icon_tx_rgsmoothgallery_image.gif";s:4:"ecd9";s:13:"locallang.xml";s:4:"0d92";s:16:"locallang_db.xml";s:4:"1a7d";s:12:"savefile.php";s:4:"cd91";s:14:"t3mootools.txt";s:4:"c2f6";s:7:"tca.php";s:4:"a7aa";s:14:"doc/manual.sxw";s:4:"6028";s:19:"doc/wizard_form.dat";s:4:"fa36";s:20:"doc/wizard_form.html";s:4:"6053";s:15:"pi1/_ce_wiz.gif";s:4:"ecd9";s:14:"pi1/ce_wiz.gif";s:4:"9573";s:36:"pi1/class.tx_rgsmoothgallery_pi1.php";s:4:"3134";s:44:"pi1/class.tx_rgsmoothgallery_pi1_wizicon.php";s:4:"23b7";s:13:"pi1/clear.gif";s:4:"cc11";s:17:"pi1/locallang.xml";s:4:"f748";s:7:"pi1/tmp";s:4:"6c78";s:24:"pi1/static/editorcfg.txt";s:4:"bc8a";s:20:"pi1/static/setup.txt";s:4:"4160";s:26:"res/css/externalThumbs.css";s:4:"6325";s:27:"res/css/externalThumbs2.css";s:4:"c95c";s:22:"res/css/jd.gallery.css";s:4:"8040";s:27:"res/css/jd.galleryColor.css";s:4:"fb23";s:26:"res/css/jd.galleryCool.css";s:4:"fac0";s:25:"res/css/jd.galleryMod.css";s:4:"a71a";s:18:"res/css/layout.css";s:4:"59a9";s:21:"res/css/slightbox.css";s:4:"68cb";s:26:"res/css/slightboxColor.css";s:4:"4211";s:27:"res/css/img/ajax-loader.gif";s:4:"37e2";s:19:"res/css/img/big.gif";s:4:"e438";s:23:"res/css/img/carrow1.gif";s:4:"6994";s:23:"res/css/img/carrow2.gif";s:4:"7502";s:21:"res/css/img/close.gif";s:4:"97ab";s:24:"res/css/img/close9yj.gif";s:4:"5bc0";s:29:"res/css/img/control_pause.png";s:4:"9c20";s:28:"res/css/img/control_play.png";s:4:"3170";s:33:"res/css/img/control_play_blue.png";s:4:"56f5";s:26:"res/css/img/cooldesign.zip";s:4:"4851";s:27:"res/css/img/cooldisplay.png";s:4:"ef80";s:24:"res/css/img/coolnext.gif";s:4:"8045";s:24:"res/css/img/coolplus.gif";s:4:"5a67";s:24:"res/css/img/coolprev.gif";s:4:"ef26";s:20:"res/css/img/disk.png";s:4:"bb6d";s:23:"res/css/img/fleche1.gif";s:4:"a413";s:23:"res/css/img/fleche1.png";s:4:"6193";s:23:"res/css/img/fleche2.gif";s:4:"3c35";s:23:"res/css/img/fleche2.png";s:4:"e0a1";s:20:"res/css/img/left.gif";s:4:"f785";s:33:"res/css/img/loading-bar-black.gif";s:4:"b010";s:34:"res/css/img/loading-bar-black2.gif";s:4:"d552";s:25:"res/css/img/nextlabel.gif";s:4:"485d";s:20:"res/css/img/open.gif";s:4:"15f6";s:20:"res/css/img/open.png";s:4:"c2b2";s:21:"res/css/img/pause.gif";s:4:"f56b";s:20:"res/css/img/play.gif";s:4:"3ad6";s:25:"res/css/img/prevlabel.gif";s:4:"d935";s:23:"res/css/img/printer.png";s:4:"2424";s:21:"res/css/img/right.gif";s:4:"0999";s:20:"res/css/img/save.gif";s:4:"6691";s:29:"res/scripts/HistoryManager.js";s:4:"8948";s:29:"res/scripts/jd.gallery1010.js";s:4:"352d";s:28:"res/scripts/jd.galleryMod.js";s:4:"fa47";s:23:"res/scripts/mootools.js";s:4:"9f73";s:36:"res/scripts/mootools.uncompressed.js";s:4:"de7f";s:29:"res/scripts/mootools.v1.00.js";s:4:"cf85";s:27:"res/scripts/slightbox107.js";s:4:"942d";}',
);

?>