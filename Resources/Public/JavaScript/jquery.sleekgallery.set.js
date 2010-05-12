/*
 * This file is part of SleekGallery v1.1.1.
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
 * along with MoJo's SlickGallery; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 *
 * Main Developer: Morton Jonuschat <mjonuschat@gmail.com> - http://github.com/yabawock
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
        };
    };

    // Plugin definition
    $.fn.extend({
        sleekGallerySet: function(options) {
            return this.each(function() {
                jQuery.sleekgallerySet.initializeSet(this, options);
            });
        }
    });

    $.extend(true, {
        sleekgallerySet: jQuery.sleekgallery
    });

    // Extend sleekGallery with Group/Set functions
    $.extend(true, {
        sleekgallerySet: {
            setOptions: {
                manualSetData: [],
                gallerySelector: "div.galleryElement",
                galleryTitleSelector: "h2",
                textGallerySelector: 'Galleries',
                textShowGallerySelector: 'Other Galleries',
                textGalleryInfo: '{0} pictures',
                startWithSelector: true,
                activateSelectorScroller: true,
                /* Changing default options */
                textShowCarousel: '{0}/{1} Pictures',
                carouselPreloader: false
            },
            initializeSet: function(element, options) {
                this.options = jQuery.extend({}, this.options, this.setOptions, options);
                if(!jQuery.isFunction(jQuery.scrollTo)) {
                    this.options.activateSelectorScroller = false;
                }
                this.gallerySet = this.options.manualSetData;
                jQuery(this).bind('onPopulated', this.createGallerySelectorTab.pass(this));
                jQuery(this).bind('onPopulated', this.createGallerySelector.pass(this));
                this.startWithSelectorFn = this.toggleGallerySelector.pass(this, true);
                if (this.options.startWithSelector) {
                    jQuery(this).bind('onGallerySelectorCreated', this.startWithSelectorFn);
                }
                this.initialize(element, this.options);
            },
            populateData: function() {
                options = this.options;
                var data = jQuery.makeArray(this.gallerySet);
                jQuery(options.gallerySelector).each(function (index, galEl) {
                    currentGalArrayPlace = 0;
                    galleryDict = {
                        title: jQuery(options.galleryTitleSelector, this).html(),
                        elements: jQuery(galEl)
                    };
                    jQuery.merge(data, [galleryDict]);
                });
                for(i=0;i<data.length;i++) {
                    galEl = data[i].elements;
                    data[i].elements = this.populateGallery(galEl, 0);
                    if (this.options.destroyAfterPopulate) {
                        galEl.remove();
                    }
                }
                this.gallerySet = data;
                this.galleryData = data[0].elements;
                this.currentGallery = 0;
                jQuery(this).trigger('onPopulated');
            },
            changeGallery: function(number)
            {
                if (number!=this.currentGallery)
                {
                    this.changeData(this.gallerySet[number].elements);
                    this.maxIter = this.gallerySet[number].elements.length;
                    this.currentGallery = number;
                    jQuery(this.gallerySelectorBtn).html(this.gallerySet[number].title);
                    jQuery(this).trigger('onGalleryChanged');
                }
                this.toggleGallerySelector(false);
            },
            createGallerySelectorTab: function() {
                this.gallerySelectorBtn = jQuery('<a>').addClass('gallerySelectorBtn').css({
                    'title': this.options.textShowGallerySelector
                }).html(this.options.textShowGallerySelector).click(function(){ this.toggleGallerySelector(true); }.pass(this)
                ).appendTo(this.galleryElement);
                jQuery(this).bind('onShowCarousel', function() {
                    this.gallerySelectorBtn.css({'zIndex': 10});
                }.pass(this));
                jQuery(this).bind('onCarouselHidden', function(){
                    this.gallerySelectorBtn.css({'zIndex': 15});
                }.pass(this));
            },
            createGallerySelector: function() {
                this.gallerySelector = jQuery('<div>').addClass(
                        'gallerySelector'
                    ).appendTo(
                        this.galleryElement
                    ).css({
                        'display': 'none',
                        'opacity': '0'
                    });

                this.gallerySelectorTitle = jQuery('<h2>').html( this.options.textGallerySelector).appendTo(this.gallerySelector);
                var gallerySelectorHeight = this.galleryElement.outerHeight(true) - 50 - 10 - 2;
                this.gallerySelectorWrapper = jQuery('<div>').addClass(
                        'gallerySelectorWrapper'
                    ).css(
                        'height',
                        gallerySelectorHeight + "px"
                    ).appendTo(this.gallerySelector);
                this.gallerySelectorInner = jQuery('<div>').addClass('gallerySelectorInner').appendTo(this.gallerySelectorWrapper);
                this.createGalleryButtons();
                jQuery(this).trigger('onGallerySelectorCreated');
            },
            createGalleryButtonHelper: function(index, galleryItem) {
                var galleryButtonWidth =
                    ((this.galleryElement.outerWidth(true) - 30) / 2) - 14;
                var button = jQuery('<div>').addClass('galleryButton').appendTo(
                    this.gallerySelectorInner
                ).bind('mouseenter', function(myself){
                        myself.button.addClass('hover');
                    }.pass(this, galleryItem)
                ).bind('mouseleave', function(myself){
                        myself.button.removeClass('hover');
                    }.pass(this,galleryItem)
                ).bind('click', function(myself, number){
                        this.changeGallery.pass(this,number)();
                    }.pass(this, galleryItem, index)
                ).css('width', galleryButtonWidth);
                galleryItem.button = button;
                var thumbnail = "";
                if (this.options.showCarousel) {
                    thumbnail = galleryItem.elements[0].thumbnail;
                } else {
                    thumbnail = galleryItem.elements[0].image;
                }
                jQuery('<div>').addClass('preview').css(
                    'backgroundImage',
                    "url('" + thumbnail + "')"
                ).appendTo(button);
                jQuery('<h3>').html(galleryItem.title).appendTo(button);
                jQuery('<p>').addClass('info').html(this.printf(this.options.textGalleryInfo, galleryItem.elements.length)).appendTo(button);
            },
            createGalleryButtons: function () {
                for(i=0;i<this.gallerySet.length;i++) { this.createGalleryButtonHelper(i, this.gallerySet[i]); }
                jQuery('<br>').appendTo(this.gallerySelectorInner).css('clear','both');
            },
            toggleGallerySelector: function(state) {
                if (state) {
                    jQuery(this.gallerySelector).css('display','block').animate({'opacity' : 1}, this.options.fadeDuration, function(){
                        this.gallerySelectorWrapper.unbind('mousemove').bind('mousemove', this, this.selectorScroll);
                        this.gallerySelectorWrapper.unbind('mouseleave').bind('mouseleave', this, function() {
                            this.gallerySelectorWrapper.stop();
                            this.gallerySelectorInner.scroll = null;
                        }.pass(this));
                    }.pass(this));
                } else {
                    jQuery(this.gallerySelector).animate({'opacity' : 0}, this.options.fadeDuration, 'linear', function() {
                        this.gallerySelectorWrapper.stop();
                        this.gallerySelectorInner.scroll = null;
                        this.gallerySelectorWrapper.unbind('mousemove');
                        this.gallerySelectorWrapper.unbind('mouseleave');
                        jQuery(this.gallerySelector).css({'display':'none'});
                    }.pass(this));
                }
            },
            selectorScroll: function(e) {
                var y = e.pageY - e.data.gallerySelectorWrapper.offset().top;
                if(y <= (e.data.gallerySelectorWrapper.outerHeight(true)*.2)) {
                    if(e.data.gallerySelectorInner.scroll != 'top') {
                        e.data.gallerySelectorInner.scroll = 'top';
                        var duration = (e.data.options.carouselVelocity * 5) * e.data.gallerySelectorWrapper.scrollTop();
                        e.data.gallerySelectorWrapper.scrollTo(0,duration);
                    }
                } else if(y >= (e.data.gallerySelectorWrapper.outerHeight(true) - (e.data.gallerySelectorWrapper.outerHeight(true)*.2))) {
                    if(e.data.gallerySelectorInner.scroll != 'bottom') {
                        e.data.gallerySelectorInner.scroll = 'bottom';
                        var duration = (e.data.options.carouselVelocity * 5) * (e.data.gallerySelectorInner.outerHeight(true) - e.data.gallerySelectorWrapper.outerHeight(true) - e.data.gallerySelectorWrapper.scrollTop());
                        e.data.gallerySelectorWrapper.scrollTo('max',duration);
                    }
                } else {
                    if(e.data.gallerySelectorInner.scroll) {
                        e.data.gallerySelectorInner.scroll = null;
                        e.data.gallerySelectorWrapper.stop();
                    }
                }
            },
            initHistory: function() {
                // TODO: Find a jQuery history plugin
            }
        }
    });
})(jQuery);
