<?php
if (! defined('TYPO3_MODE'))
    die('Access denied.');
    ## Extending TypoScript from static template uid=43 to set up userdefined tag:
t3lib_extMgm::addTypoScript($_EXTKEY, 'editorcfg', '
    tt_content.CSS_editor.ch.tx_mojosleekgallery_pi1 = < plugin.tx_mojosleekgallery_pi1.CSS_editor
', 43);
t3lib_extMgm::addPItoST43($_EXTKEY, 'Classes/MoJo/SleekGallery.php', '_pi1', 'list_type', 1);
t3lib_extMgm::addUserTSConfig('
    options.saveDocNew.tx_mojosleekgallery_image=1
');
// hook for tt_news
if (TYPO3_MODE == 'FE') {
    require_once (t3lib_extMgm::extPath($_EXTKEY) . 'Classes/MoJo/SleekGallery/Fe.php');
}
$TYPO3_CONF_VARS['EXTCONF']['tt_news']['extraItemMarkerHook'][] = 'tx_mojosleekgallery_fe';
?>
