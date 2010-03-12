/*
 * This file is part of SleekGallery v1.0.3.
 *
 * SleekGallery is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * SleekGallery is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JonDesign's SmoothGallery; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * SleekGallery is an enhanced version of the SmoothGallery jQuery port "SlickGallery"
 * which has been done by Buttgereit und Heidenreich GmbH - http://www.gute-botschafter.de/
 *
 * Main Developer: Morton Jonuschat <mjonuschat@gmail.com> - http://github.com/yabawock
 * Many thanks to:
 * - The jQuery team for the great lib
 * - Ariel Flesler (http://flesler.blogspot.com) for all his great libs. Some used here as plugins.
 * - Dav Glass (http://blog.davglass.com/) for the YAHOO.Tools.printf implementation
 * - Buttgereit und Heidenreich GmbH for the initial port of SmoothGallery to jQuery
 */
(function($) {
    Function.prototype.pass = function () {
        var instance = this, length = arguments.length, args = new Array(), object;
        while(length--) {
            args[length] = arguments[length];
        }
        object = args.shift();
        return function() {
            return instance.apply(object, args);
        }
    };
    // Plugin definition
    $.fn.extend({
        sleekGallery: function(options) {
            return this.each(function() {
                jQuery.sleekgallery.initialize(this, options);
            });
        }
    });

    $.extend({
        /**
         * Preloader based on jQuery.Preload
         * Original version by Ariel Flesler - aflesler(at)gmail(dot)com
         *
         * @see http://flesler.blogspot.com/2008/01/jquerypreload.html
         */
        sleekpreload: function( sources, settings ) {
            /*
             * Preloader defaults
             */
            var defaults = {
                threshold:	2,
                gap:		14,
                onRequest: 	null,
                onComplete: null,
                onFinish:	null
            };
            /*
             * Merge the settings from preloader call
             */
            var settings = jQuery.extend( {}, defaults, settings );
            /*
             * Store data related to the preloading process
             */
            var data = {
                loaded:0,               // how many were loaded successfully
                failed:0,               // how many urls failed
                next:0,                 // which one's the next image to load
                                        // (index)
                done:0,                 // how many urls were tried
                total:sources.length    // how many images are being preloaded
                                        // overall
            };
            /*
             * Return if nothing to do
             */
            if( !data.total ) {
                return finish();
            }
            /*
             * Start the preloading
             */
            var imgs = $(Array(settings.threshold+1).join('<img/>')).load(handler).error(handler).bind('abort',handler).each(fetch);
            /*
             * Handle the preloading process
             */
            function handler( e ){
                data.element = this;
                data.found = e.type == 'load';
                data.image = this.src;
                data.index = this.index;
                var orig = data.original = sources[this.index];
                data[data.found?'loaded':'failed']++;
                data.done++;

                if( settings.onComplete ) {
                    settings.onComplete( data );
                }
                if( data.done < data.total ) {
                    fetch( 0, this );
                } else {
                    if( imgs && imgs.unbind ) {
                        imgs.unbind('load').unbind('error').unbind('abort');
                    }
                    imgs = null;
                    finish();
                }
            };
            /*
             * Handle the fetching of the images
             */
            function fetch( i, img, retry ) {
                // IE problem, can't preload more than 15
                if( img.attachEvent /* msie */ && data.next && data.next % settings.gap == 0 && !retry ){
                    window.setTimeout(
                        function() {
                            fetch( i, img, true );
                        }, 10
                    );
                    return false;
                }
                if( data.next == data.total ) {
                    return false;
                }
                img.index = data.next; // save it, we'll need it.
                img.src = sources[data.next++];
                if( settings.onRequest ) {
                    data.index = img.index;
                    data.element = img;
                    data.image = img.src;
                    data.original = original[data.next-1];
                    settings.onRequest( data );
                }
            };
            /*
             * Handler for the onFinish callback
             */
            function finish(){
                if( settings.onFinish ) {
                    settings.onFinish( data );
                }
            };
        },
        /**
         * SleekGallery - http://github.com/yabawock/sleekgallery
         * A jQuery port of JonDesign's SmoothGallery 2.1beta1
         * (http://smoothgallery.jondesign.net/)
         *
         * @version 1.0.2
         * @author Morton Jonuschat <mjonuschat@gmail.com>
         * @copyright (c) 2010 - Morton Jonuschat <mjonuschat@gmail.com>
         * @license GPL v3
         */
        sleekgallery: {
            Transitions: {
               fade: function(oldImage, newImage, oldPos, newPos){
                    if (newPos > oldPos) {
                        newImage.animate({'opacity' : 1}, this.options.fadeDuration, 'linear');
                    } else {
                        newImage.css({'opacity' : 1});
                        oldImage.animate({'opacity' : 0}, this.options.fadeDuration, 'linear');
                    }
                },
                crossfade: function(oldImage, newImage, oldPos, newPos){
                    newImage.animate({'opacity': 1}, this.options.fadeDuration, 'linear');
                    oldImage.animate({'opacity': 0}, this.options.fadeDuration, 'linear');
                },
                fadebg: function(oldImage, newImage, oldPos, newPos){
                    oldImage.animate(
                        {'opacity': 0},
                        {
                            'duration': this.options.fadeDuration/2,
                            'complete': function(newImage) {
                                newImage.animate({'opacity': 1}, this.options.fadeDuration/2, 'linear');
                            }.pass(this, newImage),
                            'easing': 'linear'
                        }
                    );
                }
            },
            options: {
                showArrows: true,
                showCarousel: true,
                showInfopane: true,
                embedLinks: true,
                fadeDuration: 500,
                timed: false,
                delay: 9000,
                preloader: true,
                preloaderImage: true,
                preloaderErrorImage: true,
                /* Data retrieval */
                manualData: [],
                populateFrom: false,
                populateData: true,
                destroyAfterPopulate: true,
                elementSelector: "div.imageElement",
                titleSelector: "h3",
                subtitleSelector: "p",
                linkSelector: "a.open",
                imageSelector: "img.full",
                thumbnailSelector: "img.thumbnail",
                defaultTransition: "fade",
                /* InfoPane options */
                slideInfoZoneOpacity: 0.7,
                slideInfoZoneSlide: true,
                /* Carousel options */
                carouselVelocity: 1,
                carouselMinimizedOpacity: 0.4,
                carouselMinimizedHeight: 20,
                carouselMaximizedOpacity: 0.9,
                thumbHeight: 75,
                thumbWidth: 100,
                thumbSpacing: 10,
                thumbIdleOpacity: 0.2,
                textShowCarousel: 'Pictures',
                showCarouselLabel: true,
                thumbCloseCarousel: true,
                useThumbGenerator: false,
                thumbGenerator: 'resizer.php',
                useExternalCarousel: false,
                carouselElement: false,
                carouselHorizontal: true,
                activateCarouselScroller: true,
                carouselPreloader: true,
                textPreloadingCarousel: 'Loading...',
                /* CSS Classes */
                baseClass: 'sgGallery',
                withArrowsClass: 'withArrows',
                /* Plugins: HistoryManager */
                useHistoryManager: false,
                customHistoryKey: false,
                /* Plugins: FancyBox */
                useFancyBox: true
            },
            initialize: function(element, options) {
                this.options = jQuery.extend({}, this.options, options);
                this.timerID = null;
                this.currentIter = 0;
                this.lastIter = 0;
                this.maxIter = 0;
                this.galleryElement = jQuery(element);
                this.galleryData = this.options.manualData;
                this.galleryInit = 1;
                this.galleryElements = Array();
                this.thumbnailElements = Array();
                this.galleryElement.addClass(this.options.baseClass);
                this.loadingElement = jQuery('<div class="loadingElement" />');

                if(!jQuery.isFunction(jQuery.fancybox)) {
                    this.options.useFancyBox = false;
                }

                if((this.options.activateCarouselScroller || this.options.showCarousel) && !jQuery.isFunction(jQuery.scrollTo)) {
                    this.options.activateCarouselScroller = false;
                    this.options.showCarousel = false;
                }

                if (this.options.useFancyBox&&(this.options.defaultTransition=="fade")) {
                    this.options.defaultTransition="crossfade";
                }

                this.populateFrom = jQuery(element);

                if (this.options.populateFrom) {
                    this.populateFrom = this.options.populateFrom;
                }
                if (this.options.populateData) {
                    this.populateData();
                }

                jQuery(element).css({'display' : 'block'});

                if (this.options.useHistoryManager) {
                    this.initHistory();
                }

                if ((this.options.embedLinks)|(this.options.useFancyBox))
                {
                    this.currentLink = jQuery('<a>').addClass('open').attr({
                        'href' : '#',
                        'title': ''
                    }).appendTo(element);
                    if ((!this.options.showArrows) && (!this.options.showCarousel)) {
                        this.galleryElement = element = this.currentLink;
                    } else {
                        this.currentLink.css({'display' : 'none'});
                    }
                }
                this.constructElements(this.galleryElement);

                if ((this.galleryData.length>1)&&(this.options.showArrows))
                {
                    var leftArrow  = jQuery('<a>').addClass('left').click(this.prevItem.pass(this)).appendTo(element);
                    var rightArrow = jQuery('<a>').addClass('right').click(this.nextItem.pass(this)).appendTo(element);
                    this.galleryElement.addClass(this.options.withArrowsClass);
                }

                jQuery(element).append(this.loadingElement);

                if (this.options.showInfopane) {
                    this.initInfoSlideshow();
                }
                if (this.options.showCarousel) {
                    this.initCarousel();
                }
                this.doSlideShow(1);
            },
            populateData: function() {
                currentArrayPlace = this.galleryData.length;
                options = this.options;
                jQuery.merge(this.galleryData, this.populateGallery(this.populateFrom, currentArrayPlace));
            },
            populateGallery: function (element, startNumber) {
                var data = [];
                currentArrayPlace = startNumber;
                options = this.options;
                jQuery(this.options.elementSelector, element).each(function() {
                    elementDict = {
                        image: jQuery(options.imageSelector, this).attr('src'),
                        number: currentArrayPlace,
                        transition: options.defaultTransition
                    };
                    if ((options.showInfopane) | (options.showCarousel)) {
                        jQuery.extend(elementDict, {
                            title: $(options.titleSelector, this).html(),
                            description: $(options.subtitleSelector, this).html()
                        });
                    }
                    if ((options.embedLinks) | (options.useFancyBox)) {
                        jQuery.extend(elementDict, {
                            link: jQuery(options.linkSelector, this).attr('href') || false,
                            linkTitle: jQuery(options.linkSelector, this).attr('title') || false,
                            linkTarget: jQuery(options.linkSelector, this).attr('target') || false
                        });
                    }
                    if ((!options.useThumbGenerator) && (options.showCarousel)) {
                        jQuery.extend(elementDict, {
                            thumbnail: jQuery(options.thumbnailSelector, this).attr('src')
                        });
                    } else {
                        if (options.useThumbGenerator) {
                            jQuery.extend(elementDict, {
                                thumbnail: this.options.thumbGenerator + '?imgfile=' + elementDict.image + '&max_width=' + options.thumbWidth + '&max_height=' + options.thumbHeight
                            });
                        }
                    }
                    jQuery.merge(data, [elementDict]);
                    currentArrayPlace++;
                    if (options.destroyAfterPopulate) {
                       jQuery(this).remove();
                    }
                });
                return data;
            },
            constructElements: function () {
                el = this.galleryElement;
                if (this.options.embedLinks && (!this.options.showArrows)) {
                    el = this.currentLink;
                }
                this.maxIter = this.galleryData.length;
                var currentImg;
                for(i=0;i<this.galleryData.length;i++)
                {
                    var currentImg =  jQuery('<div>').addClass('slideElement').css({
                        'position':'absolute',
                        'left':'0px',
                        'right':'0px',
                        'margin':'0px',
                        'padding':'0px',
                        'backgroundPosition':"center center",
                        'opacity':'0'
                    }).appendTo(el);
                    if (this.options.preloader)
                    {
                        currentImg.source = this.galleryData[i].image;
                        currentImg.loaded = false;
                        currentImg.preload = function() {
                            if(!this.loaded) {
                                imgLoader = jQuery('<img>').attr('src', this.source).bind('load', this, function(event){
                                    event.data.loaded = true;
                                    event.data.css({
                                        'backgroundImage' : "url('" + event.data.source + "')"
                                    });
                                    event.data.width = jQuery(this).attr('width');
                                    event.data.height = jQuery(this).attr('height');
                                });
                            }
                        };
                    } else {
                        currentImg.css('backgroundImage', "url('" + this.galleryData[i].image + "')");
                    }
                    this.galleryElements[parseInt(i)] = currentImg;
                }
            },
            destroySlideShow: function (element) {
                var myClassName = element.attr('class');
                var newElement = jQuery('div').addClass(myClassName);
                jQuery(element).replaceWith(newElement);
            },
            startSlideShow: function () {
                this.loadingElement.css({'display':'none'});
                this.lastIter = this.maxIter - 1;
                this.currentIter = 0;
                this.galleryInit = 0;
                this.galleryElements[parseInt(this.currentIter)].css({'opacity' : 1});

                if (this.options.showInfopane) {
                    window.setTimeout(this.showInfoSlideShow.pass(this), 1000);
                }
                if (this.options.useFancyBox) {
                    window.setTimeout(this.makeFancyBox.pass(this), this);
                }
                var textShowCarousel = this.printf(this.options.textShowCarousel, this.currentIter+1, this.maxIter);

                if (this.options.showCarousel&&(!this.options.carouselPreloader)&&(!this.options.useExternalCarousel)) {
                    this.carouselBtn.html(textShowCarousel).attr('title', textShowCarousel);
                }
                this.prepareTimer();

                if (this.options.embedLinks) {
                    this.makeLink(this.currentIter);
                }
            },
            nextItem: function () {
                this.nextIter = this.currentIter+1;
                if (this.nextIter >= this.maxIter) {
                    this.nextIter = 0;
                }
                this.galleryInit = 0;
                this.goTo(this.nextIter);
            },
            prevItem: function() {
                this.nextIter = this.currentIter-1;
                if (this.nextIter <= -1) {
                    this.nextIter = this.maxIter - 1;
                }
                this.galleryInit = 0;
                this.goTo(this.nextIter);
            },
            goTo: function(num) {
                this.clearTimer();
                if(this.options.preloader) {
                    this.galleryElements[num].preload();
                    if (num==0) {
                        this.galleryElements[this.maxIter - 1].preload();
                    } else {
                        this.galleryElements[num - 1].preload();
                    }
                    if (num==(this.maxIter - 1)) {
                        this.galleryElements[0].preload();
                    } else {
                        this.galleryElements[num + 1].preload();
                    }
                }
                if (this.options.embedLinks) {
                    this.clearLink();
                }
                if (this.options.showInfopane) {
                    this.slideInfoZone.stop();
                    this.hideInfoSlideShow(num);
                } else {
                    window.setTimeout(this.changeItem.pass(this, num), 500);
                }
                if (this.options.embedLinks) {
                    this.makeLink(num);
                }
                this.prepareTimer();
            },
            changeItem: function(num) {
                this.galleryInit = 0;
                if (this.currentIter != num) {
                    for(i=0;i<this.maxIter;i++) {
                        if ((i != this.currentIter)) {
                            this.galleryElements[i].css({'opacity': 0});
                        }
                    }
                    this.Transitions[this.galleryData[num].transition].pass(
                        this, this.galleryElements[this.currentIter], this.galleryElements[num], this.currentIter, num
                    )();
                    this.currentIter = num;
                    if (this.options.useFancyBox) {
                        this.makeFancyBox();
                    }
                }
                var textShowCarousel = this.printf(this.options.textShowCarousel, num+1, this.maxIter);
                if ((this.options.showCarousel)&&(!this.options.useExternalCarousel)) {
                    this.carouselBtn.html(textShowCarousel).attr('title', textShowCarousel);
                }
                this.doSlideShow.pass(this)();
            },
            clearTimer: function() {
                if (this.options.timed) {
                    window.clearTimeout(this.timerID);
                }
            },
            prepareTimer: function() {
                if (this.options.timed) {
                    this.timerID = window.setTimeout(this.nextItem.pass(this), this.options.delay);
                }
            },
            doSlideShow: function(position) {
                if (this.galleryInit == 1) {
                    imgPreloader = jQuery('<img/>').attr('src', this.galleryData[0].image).bind('load', this, function(event) {
                        event.data.startSlideShow();
                    });

                    if(this.options.preloader) {
                        this.galleryElements[0].preload();
                    }
                } else {
                    if (this.options.showInfopane)
                    {
                        if (this.options.showInfopane)
                        {
                            window.setTimeout(this.showInfoSlideShow.pass(this), (500 + this.options.fadeDuration));
                        } else {
                            if ((this.options.showCarousel)&&(this.options.activateCarouselScroller)) {
                                this.centerCarouselOn(position);
                            }
                        }
                    }
                }
            },
            createCarousel: function() {
                if (!this.options.useExternalCarousel)
                {
                    this.carouselContainer = jQuery('<div>').addClass('carouselContainer').appendTo(this.galleryElement);
                    this.carouselContainer.normalHeight = this.carouselContainer.outerHeight(true);
                    this.carouselContainer.css({'opacity': this.options.carouselMinimizedOpacity, 'top': (this.options.carouselMinimizedHeight - this.carouselContainer.normalHeight)});
                    this.carouselBtn = jQuery('<a>').addClass('carouselBtn').attr({
                        title: this.options.textShowCarousel
                    }).appendTo(this.carouselContainer);
                    if(this.options.carouselPreloader) {
                        this.carouselBtn.html(this.options.textPreloadingCarousel);
                    } else {
                        this.carouselBtn.html(this.options.textShowCarousel);
                    }
                    this.carouselBtn.bind('click', this, function (event) {
                        event.data.carouselContainer.stop();
                        event.data.toggleCarousel();
                    });
                    this.carouselActive = false;

                    this.carouselElement = jQuery('<div>').addClass('carousel').appendTo(this.carouselContainer);
                } else {
                    this.carouselElement = jQuery(this.options.carouselElement).addClass('jdExtCarousel');
                }
                this.carouselElement.normalHeight = this.carouselElement.outerHeight(true);
                if (this.options.showCarouselLabel)
                    this.carouselLabel = jQuery('<p>').addClass('label').appendTo(this.carouselElement);
                this.carouselWrapper = jQuery('<div>').addClass('carouselWrapper').appendTo(this.carouselElement);
                this.carouselWrapper.normalHeight = this.carouselWrapper.outerHeight(true);
                this.carouselInner = jQuery('<div>').addClass('carouselInner').appendTo(this.carouselWrapper);
            },
            fillCarousel: function() {
                this.constructThumbnails();
                this.carouselInner.normalWidth = ((this.maxIter * (this.options.thumbWidth + this.options.thumbSpacing + 2))+this.options.thumbSpacing) + "px";
                if (this.options.carouselHorizontal) {
                    this.carouselInner.css('width',this.carouselInner.normalWidth);
                }
            },
            initCarousel: function () {
                this.createCarousel();
                this.fillCarousel();
                if (this.options.carouselPreloader) {
                    this.preloadThumbnails();
                }
            },
            flushCarousel: function() {
                this.thumbnailElements.each(function(element) {
                    element.remove();
                    element = null;
                });
                this.thumbnailElements = [];
            },
            toggleCarousel: function() {
                if (this.carouselActive) {
                    this.hideCarousel();
                } else {
                    this.showCarousel();
                }
            },
            showCarousel: function () {
                this.carouselContainer.animate({
                    'opacity': this.options.carouselMaximizedOpacity,
                    'top': 0
                }, {
                    'complete' : function() {
                        this.carouselActive = true;
                        this.carouselElement.bind('mousemove', this, this.carouselScroll);
                        this.carouselContainer.bind('mouseleave', this, function() {
                            this.carouselWrapper.stop();
                            this.carouselElement.scroll = null;
                        }.pass(this));
                    }.pass(this)
                });
            },
            hideCarousel: function () {
                var targetTop = this.options.carouselMinimizedHeight - this.carouselContainer.normalHeight;
                this.carouselContainer.animate({
                    'opacity': this.options.carouselMinimizedOpacity,
                    'top': targetTop
                }, {
                    'complete': function() {
                        this.carouselActive = false;
                        this.carouselElement.scroll = null;
                        this.carouselWrapper.stop();
                    }.pass(this)
                });
            },
            constructThumbnails: function () {
                element = this.carouselInner;
                for(i=0;i<this.galleryData.length;i++)
                {
                    currentImg = jQuery('<div>').addClass("thumbnail").css({
                        'backgroundImage'	: "url('" + this.galleryData[i].thumbnail + "')",
                        'backgroundPosition': "center center",
                        'backgroundRepeat'	: 'no-repeat',
                        'marginLeft'		: this.options.thumbSpacing + "px",
                        'width'				: this.options.thumbWidth + "px",
                        'height'			: this.options.thumbHeight + "px"
                    }).appendTo(element);
                    currentImg.animate({
                        'opacity': this.options.thumbIdleOpacity
                    }, 200);
                    currentImg.bind('mouseenter', function(myself) {
                        myself.stop();
                        myself.animate({'opacity': 0.99});
                        if (this.options.showCarouselLabel) {
                            $(this.carouselLabel).html('<span class="number">' + (myself.relatedImage.number + 1) + "/" + this.maxIter + ":</span> " + myself.relatedImage.title);
                        }
                    }.pass(this,currentImg));
                    currentImg.bind('mouseleave', function(myself) {
                        myself.stop();
                        myself.animate({'opacity': this.options.thumbIdleOpacity});
                    }.pass(this,currentImg));
                    currentImg.bind('click', function(myself) {
                        this.goTo(myself.relatedImage.number);
                        if (this.options.thumbCloseCarousel && (!this.options.useExternalCarousel)) {
                            this.hideCarousel();
                        }

                    }.pass(this,currentImg));
                    currentImg.relatedImage = this.galleryData[i];
                    this.thumbnailElements[parseInt(i)] = currentImg;
                }
            },
            log: function(value) {
                if(console.log) {
                    console.log(value);
                }
            },
            preloadThumbnails: function() {
                var thumbnails = [];
                for(i=0;i<this.galleryData.length;i++)
                {
                    thumbnails[parseInt(i)] = this.galleryData[i].thumbnail;
                }
                jQuery.sleekpreload(thumbnails);
                if (!this.options.useExternalCarousel) {
                    jQuery.sleekpreload(thumbnails, {
                        'onFinish': function() {
                            var textShowCarousel = this.printf(this.options.textShowCarousel, this.currentIter+1, this.maxIter);
                            this.carouselBtn.html(textShowCarousel).attr('title', textShowCarousel);
                        }.pass(this)
                    });
                }
            },
            clearThumbnailsHighlights: function()
            {
                for(i=0;i<this.galleryData.length;i++)
                {
                    this.thumbnailElements[i].stop();
                    this.thumbnailElements[i].animate({'opacity': 0.2});
                }
            },
            changeThumbnailsSize: function(width, height)
            {
                for(i=0;i<this.galleryData.length;i++)
                {
                    this.thumbnailElements[i].stop();
                    this.thumbnailElements[i].css({
                        'width': width + "px",
                        'height': height + "px"
                    });
                }
            },
            centerCarouselOn: function(num) {
                this.carouselWrapper.scrollTo(this.thumbnailElements[num],(this.options.thumbWidth * this.options.carouselVelocity * 5));
            },
            initInfoSlideshow: function() {
                this.slideInfoZone = jQuery('<div>').addClass('slideInfoZone').css({'opacity':0}).appendTo(this.galleryElement);
                var slideInfoZoneTitle = jQuery('<h2>').appendTo(this.slideInfoZone);
                var slideInfoZoneDescription = jQuery('<p>').appendTo(this.slideInfoZone);
                this.slideInfoZone.normalHeight = this.slideInfoZone.outerHeight(true);
            },
            changeInfoSlideShow: function()
            {
                window.setTimeout(this.hideInfoSlideShow.pass(this), 10);
                window.setTimeout(this.showInfoSlideShow.pass(this), 500);
            },
            showInfoSlideShow: function() {
                this.slideInfoZone.stop();
                jQuery('h2', this.slideInfoZone).html(this.galleryData[this.currentIter].title);
                jQuery('p', this.slideInfoZone).html(this.galleryData[this.currentIter].description);
                if(this.options.slideInfoZoneSlide) {
                    this.slideInfoZone.css({'opacity':0 , 'height': 0});
                    this.slideInfoZone.animate({'opacity': this.options.slideInfoZoneOpacity, 'height': this.slideInfoZone.normalHeight});
                } else {
                    this.slideInfoZone.css({'opacity':0}).animate({'opacity': this.options.slideInfoZoneOpacity});
                }
                if (this.options.showCarousel) {
                    this.centerCarouselOn(this.currentIter);
                }
            },
            hideInfoSlideShow: function(num) {
                this.slideInfoZone.stop();
                if(this.options.slideInfoZoneSlide) {
                    this.slideInfoZone.animate({'opacity': 0, 'height': 0}, {'complete': this.changeItem.pass(this, num)});
                } else {
                    this.slideInfoZone.animate({'opacity': 0}, {'complete': this.changeItem.pass(this, num)});
                }
            },
            makeLink: function(num) {
                this.currentLink.attr({
                    'href': this.galleryData[num].link,
                    'title': this.galleryData[num].linkTitle
                });
                if (!((this.options.embedLinks) && (!this.options.showArrows) && (!this.options.showCarousel))) {
                    this.currentLink.css('display', 'block');
                }
            },
            clearLink: function() {
                this.currentLink.attr({href: '', title: ''});
                if (!((this.options.embedLinks) && (!this.options.showArrows) && (!this.options.showCarousel))) {
                    this.currentLink.css('display', 'none');
                }
            },
            carouselScroll: function(e) {
                var x = e.pageX - e.data.carouselElement.offset().left;
                if(x <= (e.data.options.thumbWidth*.75)) {
                    if(e.data.carouselElement.scroll != 'left') {
                        e.data.carouselElement.scroll = 'left';
                        var duration = (e.data.options.carouselVelocity * 5) * e.data.carouselWrapper.scrollLeft();
                        e.data.carouselWrapper.scrollTo(0,duration);
                    }
                } else if(x >= (e.data.carouselElement.outerWidth(true) - (e.data.options.thumbWidth/2))) {
                    if(e.data.carouselElement.scroll != 'right') {
                        e.data.carouselElement.scroll = 'right';
                        var duration = (e.data.options.carouselVelocity * 5) * (e.data.carouselInner.outerWidth(true) - e.data.carouselWrapper.outerWidth(true) - e.data.carouselWrapper.scrollLeft());
                        e.data.carouselWrapper.scrollTo('max',duration);
                    }
                } else {
                    if(e.data.carouselElement.scroll) {
                        e.data.carouselElement.scroll = null;
                        e.data.carouselWrapper.stop();
                    }
                }
            },
            makeFancyBox: function() {
                this.currentLink.attr({
                    'href': '#'
                }).css({
                    'display': 'block'
                });
                this.currentLink.unbind('click').bind('click',function() {
                    jQuery.fancybox({
                        'href'          : this.galleryData[this.currentIter].link,
                        'titleShow'     : false
                    });
                }.pass(this));
            },
            flushGallery: function() {
                this.galleryElements.each(function(element) {
                    element.remove();
                    element = null;
                });
                this.galleryElements = [];
            },
            changeData: function(data) {
                this.galleryData = data;
                this.clearTimer();
                this.flushGallery();
                if (this.options.showCarousel) {
                    this.flushCarousel();
                }
                this.constructElements();
                if (this.options.showCarousel) {
                    this.fillCarousel();
                }
                if (this.options.showInfopane) {
                    this.hideInfoSlideShow();
                }
                this.galleryInit=1;
                this.lastIter=0;
                this.currentIter=0;
                this.doSlideShow(1);
            },
            initHistory: function() {
                // TODO: Find a jQuery history plugin
            },
            /**
             * @author Dav Glass <dav.glass@yahoo.com>
             * @copyright (c) 2007 Dav Glass <dav.glass@yahoo.com>
             * @see http://github.com/davglass/yui-tools/blob/master/tools.js
             */
            printf: function() {
                var num = arguments.length;
                var oStr = arguments[0];
                for (var i = 1; i < num; i++) {
                    var pattern = "\\{" + (i-1) + "\\}";
                    var re = new RegExp(pattern, "g");
                    oStr = oStr.replace(re, arguments[i]);
                }
                return oStr;
            }
        }
    });
})(jQuery);