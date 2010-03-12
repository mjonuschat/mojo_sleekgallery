<?php
class tx_mojosleekgallery_enabler
{
    function user_sleekgallery ($content, $conf)
    {
        require_once (PATH_t3lib . 'class.t3lib_page.php');
        require_once (PATH_t3lib . 'class.t3lib_tstemplate.php');
        require_once (PATH_t3lib . 'class.t3lib_tsparser_ext.php');
        $sysPageObj = t3lib_div::makeInstance('t3lib_pageSelect');
        $rootLine = $sysPageObj->getRootLine($GLOBALS['TSFE']->id);
        $TSObj = t3lib_div::makeInstance('t3lib_tsparser_ext');
        $TSObj->tt_track = 0;
        $TSObj->init();
        $TSObj->runThroughTemplates($rootLine);
        $TSObj->generateConfig();
        $this->conf = $TSObj->setup['plugin.']['tx_mojosleekgallery_pi1.'];
        $split = strpos($GLOBALS['TSFE']->currentRecord, ':');
        $id = substr($GLOBALS['TSFE']->currentRecord, $split + 1);
        $where = 'uid =' . $id;
        $table = 'tt_content';
        $res = $GLOBALS['TYPO3_DB']->exec_SELECTquery('imagewidth,imageheight', $table, $where, $groupBy = '', $orderBy, $limit = '');
        $row = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($res);
        $css .= ($row['imagewidth']) ? 'width:' . $row['imagewidth'] . 'px;' : '';
        $css .= ($row['imageheight']) ? 'height:' . $row['imageheight'] . 'px;' : '';
        $GLOBALS['TSFE']->additionalCSS['mojo_sleekgallery' . $id] = '#myGallery' . $id . ' {' . $css . '}';
        $header .= $this->getPath($this->conf['pathTojQUery']) ? '<script src="' . $this->getPath($this->conf['pathTojQuery']) . '" type="text/javascript"></script>' : '';
        // path to js + css
        $GLOBALS['TSFE']->additionalHeaderData['mojo_sleekgallery'] = $header . '
            <script src="' . $this->getPath($this->conf['pathToSleekGalleryJS']) . '" type="text/javascript"></script>
            <script src="' . $this->getPath($this->conf['pathToSleekGalleryTransitions']) . '" type="text/javascript"></script>
            <link rel="stylesheet" href="' . $this->getPath($this->conf['pathToSleekGalleryCSS']) . '" type="text/css" media="screen" />
        ';
        return $content;
    }
    function getPath ($path)
    {
        if (substr($path, 0, 4) == 'EXT:') {
            $keyEndPos = strpos($path, '/', 6);
            $key = substr($path, 4, $keyEndPos - 4);
            $keyPath = t3lib_extMgm::siteRelpath($key);
            $newPath = $keyPath . substr($path, $keyEndPos + 1);
            return $newPath;
        } else {
            return $path;
        }
    }
}
?>
