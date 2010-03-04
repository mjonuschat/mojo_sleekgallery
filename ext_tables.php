<?php
if (!defined ('TYPO3_MODE')) 	die ('Access denied.');

t3lib_div::loadTCA('tt_content');
$TCA['tt_content']['types']['list']['subtypes_excludelist'][$_EXTKEY.'_pi1']='layout,select_key,pages';


t3lib_extMgm::addPlugin(array('LLL:EXT:mojo_sleekgallery/Resources/Private/Language/locallang_db.xml:tt_content.list_type_pi1', $_EXTKEY.'_pi1'),'list_type');


t3lib_extMgm::addStaticFile($_EXTKEY,"Configuration/TypoScript/","MoJo SleekGallery");

// Flexforms
$TCA['tt_content']['types']['list']['subtypes_addlist'][$_EXTKEY.'_pi1']='pi_flexform';
if (t3lib_extMgm::isLoaded('dam')) {
  t3lib_extMgm::addPiFlexFormValue('mojo_sleekgallery_pi1', 'FILE:EXT:mojo_sleekgallery/Configuration/Flexforms/flexformDAM_ds.xml');
} else {
  t3lib_extMgm::addPiFlexFormValue('mojo_sleekgallery_pi1', 'FILE:EXT:mojo_sleekgallery/Configuration/Flexforms/flexform_ds.xml');
}

if (TYPO3_MODE=="BE")	$TBE_MODULES_EXT["xMOD_db_new_content_el"]["addElClasses"]["tx_mojosleekgallery_pi1_wizicon"] = t3lib_extMgm::extPath($_EXTKEY).'Classes/MoJo/SleekGallery/Wizicon.php';

t3lib_extMgm::allowTableOnStandardPages('tx_mojosleekgallery_image');

$TCA["tx_mojosleekgallery_image"] = array (
    "ctrl" => array (
        'title'     => 'LLL:EXT:mojo_sleekgallery/Resources/Private/Language/locallang_db.xml:tx_mojosleekgallery_image',
        'label'     => 'title',
        'tstamp'    => 'tstamp',
        'crdate'    => 'crdate',
        'cruser_id' => 'cruser_id',
        'languageField'            => 'sys_language_uid',
        'transOrigPointerField'    => 'l18n_parent',
        'transOrigDiffSourceField' => 'l18n_diffsource',
        'sortby' => 'sorting',
        'delete' => 'deleted',
        'enablecolumns' => array (
            'disabled' => 'hidden',
        ),
        'dynamicConfigFile' => t3lib_extMgm::extPath($_EXTKEY).'Configuration/TCA/tca.php',
        'iconfile'          => t3lib_extMgm::extRelPath($_EXTKEY).'Resources/Public/Icons/icon_tx_mojosleekgallery_image.gif',
    ),
    "feInterface" => array (
        "fe_admin_fieldList" => "sys_language_uid, l18n_parent, l18n_diffsource, hidden, title, description, image",
    )
);


$tempColumns = Array (
    "tx_mojosleekgallery_enable" => Array (
        "exclude" => 1,
        "label" => "LLL:EXT:mojo_sleekgallery/Resources/Private/Language/locallang_db.xml:tt_content.tx_mojosleekgallery_enable",
        "config" => Array (
            "type" => "check",
        )
    ),
);
t3lib_div::loadTCA("tt_content");
t3lib_extMgm::addTCAcolumns("tt_content",$tempColumns,1);


$GLOBALS['TCA']['tt_content']['palettes']['7']['showitem'] .= ',tx_mojosleekgallery_enable';

/*
t3lib_div::loadTCA("tt_content");
t3lib_extMgm::addTCAcolumns("tt_content",$tempColumns,1);
t3lib_extMgm::addToAllTCAtypes("tt_content","tx_mojosleekgallery_enable;;;;1-1-1");
*/


?>
