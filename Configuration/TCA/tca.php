<?php
if (!defined ('TYPO3_MODE'))     die ('Access denied.');

$TCA["tx_mojosleekgallery_image"] = array (
    "ctrl" => $TCA["tx_mojosleekgallery_image"]["ctrl"],
    "interface" => array (
        "showRecordFieldList" => "sys_language_uid,l18n_parent,l18n_diffsource,hidden,title,description,image"
    ),
    "feInterface" => $TCA["tx_mojosleekgallery_image"]["feInterface"],
    "columns" => array (
        'sys_language_uid' => array (
            'exclude' => 1,
            'label'  => 'LLL:EXT:lang/locallang_general.xml:LGL.language',
            'config' => array (
                'type'                => 'select',
                'foreign_table'       => 'sys_language',
                'foreign_table_where' => 'ORDER BY sys_language.title',
                'items' => array(
                    array('LLL:EXT:lang/locallang_general.xml:LGL.allLanguages', -1),
                    array('LLL:EXT:lang/locallang_general.xml:LGL.default_value', 0)
                )
            )
        ),
        'l18n_parent' => array (
            'displayCond' => 'FIELD:sys_language_uid:>:0',
            'exclude'     => 1,
            'label'       => 'LLL:EXT:lang/locallang_general.xml:LGL.l18n_parent',
            'config'      => array (
                'type'  => 'select',
                'items' => array (
                    array('', 0),
                ),
                'foreign_table'       => 'tx_mojosleekgallery_image',
                'foreign_table_where' => 'AND tx_mojosleekgallery_image.pid=###CURRENT_PID### AND tx_mojosleekgallery_image.sys_language_uid IN (-1,0)',
            )
        ),
        'l18n_diffsource' => array (
            'config' => array (
                'type' => 'passthrough'
            )
        ),
        'hidden' => array (
            'exclude' => 1,
            'label'   => 'LLL:EXT:lang/locallang_general.xml:LGL.hidden',
            'config'  => array (
                'type'    => 'check',
                'default' => '0'
            )
        ),
        "title" => Array (
            "exclude" => 1,
            "label" => "LLL:EXT:mojo_sleekgallery/Resources/Private/Language/locallang_db.xml:tx_mojosleekgallery_image.title",
            "config" => Array (
                "type" => "input",
                "size" => "30",
            )
        ),
        "description" => Array (
            "exclude" => 1,
            "label" => "LLL:EXT:mojo_sleekgallery/Resources/Private/Language/locallang_db.xml:tx_mojosleekgallery_image.description",
            "config" => Array (
                "type" => "text",
                "cols" => "30",
                "rows" => "2",
            )
        ),
        "image" => Array (
            "exclude" => 1,
            "l10n_mode" => 'mergeIfNotBlank',
            "label" => "LLL:EXT:mojo_sleekgallery/Resources/Private/Language/locallang_db.xml:tx_mojosleekgallery_image.image",
            "config" => Array (
                "type" => "group",
                "internal_type" => "file",
                "allowed" => "gif,png,jpeg,jpg",
                "max_size" => 2500,
                "uploadfolder" => "uploads/tx_mojosleekgallery",
                "show_thumbs" => 1,
                "size" => 1,
                "minitems" => 0,
                "maxitems" => 1,
            )
        ),
    ),
    "types" => array (
        "0" => array("showitem" => "sys_language_uid;;;;1-1-1, l18n_parent, l18n_diffsource, hidden;;1, title;;;;2-2-2, description;;;;3-3-3, image")
    ),
    "palettes" => array (
        "1" => array("showitem" => "")
    )
);
?>
