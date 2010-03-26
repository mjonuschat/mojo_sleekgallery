<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2010 Morton Jonuschat <m.jonuschat@gute-botschafter.de
 *
 *  Based on TYPO3 Extension rgsmoothgallery
 *  (c) 2006 Georg Ringer <typo3@ringerge.org>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
/**
 * Hook for the 'mojo_sleekgallery' extension.
 *
 * @author      Morton Jonuschat <m.jonuschat@gute-botschafter.de
 * @package     TYPO3
 * @subpackage  tx_mojosleekgallery
 */
class tx_mojosleekgallery_fe
{
    // hook for tt_news
    function extraItemMarkerProcessor ($markerArray, $row, $lConf, &$pObj)
    {
        $this->cObj = t3lib_div::makeInstance('tslib_cObj'); // local cObj.
        $this->pObj = &$pObj;
        $this->realConf = $pObj;
        // configuration array of mojo_sleekgallery
        $mojosgConfDefault = $this->realConf->conf['mojo_sleekgallery.'];
        // merge with special configuration (based on chosen CODE [SINGLE, LIST, LATEST]) if this is available
        if (is_array($mojosgConfDefault[$pObj->config['code'] . '.'])) {
            $mojosgConf = t3lib_div::array_merge_recursive_overrule($mojosgConfDefault, $mojosgConfDefault[$pObj->config['code'] . '.']);
        } else {
            $mojosgConf = $mojosgConfDefault;
        }
        #echo t3lib_div::view_array($mojosgConf);
        $this->mojosgConf = $mojosgConf;
        // if the configuration is available, otherwise just do nothing
        if ($mojosgConf) {
            // unique ID > uid of the record
            $uniqueId = $row['uid'];
            // possibility to use a different field for the images + caption
            $imageField = $this->mojosgConf['imageField'] ? $this->mojosgConf['imageField'] : 'image';
            $imageFieldPrefix = $this->mojosgConf['imageFieldPrefix'] ? $this->mojosgConf['imageFieldPrefix'] : 'uploads/pics/';
            $captionField = $this->mojosgConf['captionField'] ? $this->mojosgConf['captionField'] : 'imagecaption';
            // query for the images & caption
            $field = 'pid,uid,' . $imageField . ',' . $captionField;
            $table = 'tt_news';
            $where = 'uid = ' . $uniqueId;
            $res = $GLOBALS['TYPO3_DB']->exec_SELECTquery($field, $table, $where);
            $row = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($res);
            if ($GLOBALS['TSFE']->sys_language_content) {
                $OLmode = ($this->sys_language_mode == 'strict' ? 'hideNonTranslated' : '');
                $row = $GLOBALS['TSFE']->sys_page->getRecordOverlay('tt_news', $row, $GLOBALS['TSFE']->sys_language_content, '');
            }
            // needed fields: image & imagecaption
            $images = explode(',', $row[$imageField]);
            $caption = explode("\n", $row[$captionField]);
            // If there are any images and minimum count of images is reached
            if ($row[$imageField] && count($images) >= $mojosgConf['minimumImages']) {
                // call mojo_sleekgallery
                require_once (t3lib_extMgm::extPath('mojo_sleekgallery') . 'Classes/MoJo/SleekGallery.php');
                $this->gallery = t3lib_div::makeInstance('tx_mojosleekgallery_pi1');
                // if no js is available
                $noJsImg = $mojosgConf['big.'];
                $noJsImg['file'] = $imageFieldPrefix . $images[0];
                if ($mojosgConf['externalControl'] == 1) {
                    $externalControl1 = 'var myGallery' . $uniqueId . ';';
                } else {
                    $externalControl2 = 'var';
                }
                // real unique key, needed for more than 1 view of tt_news on 1 page
                $uniqueId = $this->realConf->config['code'] . $uniqueId;
                // configuration of gallery
                $lightbox = ($mojosgConf['lightbox'] == 1) ? 'true' : 'false';
                $lightbox2 = ($mojosgConf['lightbox'] == 1) ? '/*var mylightbox = new LightboxSleekGallery();*/' : '';
                $duration = ($mojosgConf['duration']) ? 'timed:true,delay: ' . $mojosgConf['duration'] : 'timed:false';
                $thumbs = ($mojosgConf['showThumbs'] == 1) ? 'true' : 'false';
                $arrows = ($mojosgConf['arrows'] == 1) ? 'true' : 'false';
                // advanced settings (from TS + tab flexform configuration)
                $advancedSettings .= ($mojosgConf['hideInfoPane'] == 1) ? 'showInfopane: false,' : '';
                $advancedSettings .= ($mojosgConf['hideCarousel'] == 1) ? 'showCarousel: false,' : '';
                $advancedSettings .= ($mojosgConf['lightbox'] == 1 && $mojosgConf['lightboxgroups'] == 1) ? 'showFancyBoxArrows: true,' : '';
                if ($mojosgConf['thumbOpacity'] && $mojosgConf['thumbOpacity'] > 0 && $mojosgConf['thumbOpacity'] <= 1)
                    $advancedSettings .= 'thumbOpacity: ' . $mojosgConf['thumbOpacity'] . ',';
                if ($mojosgConf['slideInfoZoneOpacity'] && $mojosgConf['slideInfoZoneOpacity'] && $mojosgConf['slideInfoZoneOpacity'] > 0 && $mojosgConf['slideInfoZoneOpacity'] <= 1)
                    $advancedSettings .= 'slideInfoZoneOpacity: ' . $mojosgConf['slideInfoZoneOpacity'] . ',';
                $advancedSettings .= ($mojosgConf['thumbSpacing']) ? 'thumbSpacing: ' . $mojosgConf['thumbSpacing'] . ',' : '';
                // external thumbs
                $advancedSettings .= ($mojosgConf['externalThumbs']) ? 'useExternalCarousel:true,carouselElement:$("' . $mojosgConf['externalThumbs'] . '"),' : '';
                // configuration
                $configuration = '
                <script type="text/javascript">' . $externalControl1 . '
                    function startGallery' . $uniqueId . '() {
                        if(window.gallery' . $uniqueId . ') {
                            try {
                                ' . $externalControl2 . ' myGallery' . $uniqueId . ' = new gallery($(\'myGallery' . $uniqueId . '\'), {
                                    ' . $duration . ',
                                    showArrows: ' . $arrows . ',
                                    showCarousel: ' . $thumbs . ',
                                    embedLinks:' . $lightbox . ',
                                    ' . $advancedSettings . '
                                    lightbox:true
                                });
                                //var mylightbox = new LightboxSleekGallery();
                            }	catch(error){
                                window.setTimeout("startGallery' . $uniqueId . '();",2500);
                            }
                        } else {
                            window.gallery' . $uniqueId . '=true;
                            if(this.ie) {
                                window.setTimeout("startGallery' . $uniqueId . '();",3000);
                            } else {
                                window.setTimeout("startGallery' . $uniqueId . '();",100);
                            }
                        }
                    }
                    window.onDomReady(startGallery' . $uniqueId . ');
                </script>
                <noscript>
                    <div><img src="' . $this->cObj->IMG_RESOURCE($noJsImg) . '"  /></div>
                </noscript>
            ';
                // get the JS
                $content = $this->gallery->getJs(1, 1, 1, 0, $mojosgConf['width'], $mojosgConf['height'], $mojosgConf['width'], $mojosgConf['height'], '', $uniqueId, $mojosgConf, $configuration);
                // Begin the gallery
                $content .= $this->gallery->beginGallery($uniqueId);
                // add the images
                $i = 0;
                foreach ($images as $key => $value) {
                    $path = $imageFieldPrefix . $value;
                    // single Image
                    $imgTSConfigThumb = $mojosgConf['thumb.'];
                    $imgTSConfigThumb['file'] = $path;
                    $imgTSConfigBig = $mojosgConf['big.'];
                    $imgTSConfigBig['file'] = $path;
                    $imgTSConfigLightbox = $mojosgConf['lightbox.'];
                    $imgTSConfigLightbox['file'] = $path;
                    # $lightbox = ($mojosgConf['lightbox']==1) ? $this->cObj->IMG_RESOURCE($imgTSConfigLightbox) : $this->cObj->IMG_RESOURCE($imgTSConfigLightbox);
                    // caption text
                    $text = explode('|', $caption[$i]);
                    // add image
                    $content .= $this->addImage($path, $text[0], $text[1], true, true, $path, $limitImages);
                    $i ++;
                } # end foreach file
                // end of image
                $content .= $this->gallery->endGallery();
                // write new gallery into the marker
                $markerName = $this->mojosgConf['imageMarker'] ? $this->mojosgConf['imageMarker'] : 'NEWS_IMAGE';
                $markerArray['###' . $markerName . '###'] = '<div class="news-single-img">' . $content . '</div>';
            } elseif ($this->mojosgConf['imageMarker'] != '') {
                $markerArray['###' . $this->mojosgConf['imageMarker'] . '###'] = '';
            }
        }
        return $markerArray;
    }
    function addImage ($path, $title, $description, $thumb, $lightbox, $uniqueID, $limitImages = 0)
    {
        if ($this->mojosgConf['hideInfoPane'] != 1) {
            $text = (! $title) ? '' : "<h3>$title</h3>";
            $text .= (! $description) ? '' : "<p>$description</p>";
        }
        //  generate images
        if ($this->mojosgConf['watermark']) {
            $imgTSConfigBig = $this->mojosgConf['big2.'];
            $imgTSConfigBig['file.']['10.']['file'] = $path;
            $imgTSConfigLightbox = $this->mojosgConf['lightbox2.'];
            $imgTSConfigLightbox['file.']['10.']['file'] = $path;
        } else {
            $imgTSConfigBig = $this->mojosgConf['big.'];
            $imgTSConfigBig['file'] = $path;
            $imgTSConfigLightbox = $this->mojosgConf['lightbox.'];
            $imgTSConfigLightbox['file'] = $path;
        }
        $bigImage = $this->cObj->IMG_RESOURCE($imgTSConfigBig);
        $lightbox = ($this->mojosgConf['lightbox']) ? $this->cObj->IMG_RESOURCE($imgTSConfigLightbox) : 'javascript:void(0)';
        $lightBoxImage = '<a href="' . $lightbox . '" title="Open Image" class="open"></a>';
        if ($this->mojosgConf['showThumbs']) {
            $imgTSConfigThumb = $this->mojosgConf['thumb.'];
            $imgTSConfigThumb['file'] = $path;
            $thumbImage = '<img src="' . $this->cObj->IMG_RESOURCE($imgTSConfigThumb) . '" class="thumbnail" />';
        }
        // build the image element
        $singleImage .= '
            <div class="imageElement">
            ' . $text . $lightBoxImage . '
            <img src="' . $bigImage . '" class="full" />
            ' . $thumbImage . '
            </div>';
        return $singleImage;
    }
}
if (defined('TYPO3_MODE') && $TYPO3_CONF_VARS[TYPO3_MODE]['XCLASS']['ext/mojo_sleekgallery/class.tx_mojosleekgallery_fe.php']) {
    include_once ($TYPO3_CONF_VARS[TYPO3_MODE]['XCLASS']['ext/mojo_sleekgallery/class.tx_mojosleekgallery_fe.php']);
}
?>
