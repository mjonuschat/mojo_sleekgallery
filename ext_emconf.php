<?php

########################################################################
# Extension Manager/Repository config file for ext "mojo_sleekgallery".
#
# Auto generated 26-03-2010 18:02
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
    'version' => '1.1.1',
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
    '_md5_values_when_last_written' => 'a:75:{s:9:"ChangeLog";s:4:"6038";s:10:"README.txt";s:4:"b2b3";s:21:"ext_conf_template.txt";s:4:"c9b6";s:12:"ext_icon.gif";s:4:"ecd9";s:17:"ext_localconf.php";s:4:"bccf";s:14:"ext_tables.php";s:4:"e529";s:14:"ext_tables.sql";s:4:"e493";s:28:"ext_typoscript_constants.txt";s:4:"a90c";s:29:"Classes/MoJo/SleekGallery.php";s:4:"7b3f";s:37:"Classes/MoJo/SleekGallery/Enabler.php";s:4:"f013";s:32:"Classes/MoJo/SleekGallery/Fe.php";s:4:"b5df";s:37:"Classes/MoJo/SleekGallery/Wizicon.php";s:4:"4722";s:42:"Configuration/Flexforms/flexformDAM_ds.xml";s:4:"d295";s:39:"Configuration/Flexforms/flexform_ds.xml";s:4:"50d9";s:25:"Configuration/TCA/tca.php";s:4:"1342";s:38:"Configuration/TypoScript/editorcfg.txt";s:4:"dff7";s:34:"Configuration/TypoScript/setup.txt";s:4:"003f";s:40:"Resources/Private/Language/locallang.xml";s:4:"8a16";s:43:"Resources/Private/Language/locallang_db.xml";s:4:"e0b4";s:39:"Resources/Public/CSS/externalThumbs.css";s:4:"6325";s:40:"Resources/Public/CSS/externalThumbs2.css";s:4:"cf07";s:40:"Resources/Public/CSS/jquery.fancybox.css";s:4:"1f00";s:44:"Resources/Public/CSS/jquery.sleekgallery.css";s:4:"a7b5";s:31:"Resources/Public/CSS/layout.css";s:4:"59a9";s:33:"Resources/Public/Icons/ce_wiz.gif";s:4:"9573";s:32:"Resources/Public/Icons/clear.gif";s:4:"cc11";s:57:"Resources/Public/Icons/icon_tx_mojosleekgallery_image.gif";s:4:"ecd9";s:35:"Resources/Public/Images/carrow1.gif";s:4:"6994";s:35:"Resources/Public/Images/carrow2.gif";s:4:"7502";s:36:"Resources/Public/Images/closebox.gif";s:4:"1574";s:36:"Resources/Public/Images/closebox.png";s:4:"f2aa";s:35:"Resources/Public/Images/fleche1.gif";s:4:"a413";s:35:"Resources/Public/Images/fleche1.png";s:4:"6193";s:35:"Resources/Public/Images/fleche2.gif";s:4:"3c35";s:35:"Resources/Public/Images/fleche2.png";s:4:"e0a1";s:45:"Resources/Public/Images/loading-bar-black.gif";s:4:"b010";s:32:"Resources/Public/Images/open.gif";s:4:"15f6";s:32:"Resources/Public/Images/open.png";s:4:"c2b2";s:37:"Resources/Public/Images/remo_bg_e.png";s:4:"bb7d";s:37:"Resources/Public/Images/remo_bg_n.png";s:4:"b80c";s:38:"Resources/Public/Images/remo_bg_ne.png";s:4:"a631";s:38:"Resources/Public/Images/remo_bg_nw.png";s:4:"b03b";s:37:"Resources/Public/Images/remo_bg_s.png";s:4:"1d8a";s:38:"Resources/Public/Images/remo_bg_se.png";s:4:"6ec7";s:38:"Resources/Public/Images/remo_bg_sw.png";s:4:"df78";s:37:"Resources/Public/Images/remo_bg_w.png";s:4:"dbc5";s:35:"Resources/Public/Images/spinner.gif";s:4:"0483";s:42:"Resources/Public/Images/fancybox/blank.gif";s:4:"3254";s:48:"Resources/Public/Images/fancybox/fancy_close.png";s:4:"6e28";s:50:"Resources/Public/Images/fancybox/fancy_loading.png";s:4:"b1d5";s:51:"Resources/Public/Images/fancybox/fancy_nav_left.png";s:4:"3f3e";s:52:"Resources/Public/Images/fancybox/fancy_nav_right.png";s:4:"216e";s:51:"Resources/Public/Images/fancybox/fancy_shadow_e.png";s:4:"fd4f";s:51:"Resources/Public/Images/fancybox/fancy_shadow_n.png";s:4:"18cd";s:52:"Resources/Public/Images/fancybox/fancy_shadow_ne.png";s:4:"63ad";s:52:"Resources/Public/Images/fancybox/fancy_shadow_nw.png";s:4:"c820";s:51:"Resources/Public/Images/fancybox/fancy_shadow_s.png";s:4:"9b9e";s:52:"Resources/Public/Images/fancybox/fancy_shadow_se.png";s:4:"a8af";s:52:"Resources/Public/Images/fancybox/fancy_shadow_sw.png";s:4:"f81c";s:51:"Resources/Public/Images/fancybox/fancy_shadow_w.png";s:4:"59b0";s:53:"Resources/Public/Images/fancybox/fancy_title_left.png";s:4:"1582";s:53:"Resources/Public/Images/fancybox/fancy_title_main.png";s:4:"38da";s:53:"Resources/Public/Images/fancybox/fancy_title_over.png";s:4:"b886";s:54:"Resources/Public/Images/fancybox/fancy_title_right.png";s:4:"6cbe";s:58:"Resources/Public/Images/fancybox/jquery.easing-1.3.pack.js";s:4:"def2";s:58:"Resources/Public/Images/fancybox/jquery.fancybox-1.3.0.css";s:4:"4ec3";s:57:"Resources/Public/Images/fancybox/jquery.fancybox-1.3.0.js";s:4:"d60e";s:62:"Resources/Public/Images/fancybox/jquery.fancybox-1.3.0.pack.js";s:4:"5c16";s:64:"Resources/Public/Images/fancybox/jquery.mousewheel-3.0.2.pack.js";s:4:"e07d";s:45:"Resources/Public/JavaScript/jd.gallery.set.js";s:4:"a2e1";s:51:"Resources/Public/JavaScript/jquery.fancybox.pack.js";s:4:"5c16";s:41:"Resources/Public/JavaScript/jquery.min.js";s:4:"1009";s:50:"Resources/Public/JavaScript/jquery.scrollTo.min.js";s:4:"4aa3";s:50:"Resources/Public/JavaScript/jquery.sleekgallery.js";s:4:"9c0e";s:62:"Resources/Public/JavaScript/jquery.sleekgallery.transitions.js";s:4:"3a5d";}',
    'suggests' => array(
    ),
);

?>