/*
 * This file is part of SleekGallery v1.0.4.
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
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA    02110-1301  USA
 *
 * Main Developer: Morton Jonuschat <mjonuschat@gmail.com> - http://github.com/yabawock
 */
(function($) {
    $.extend(true, {
        sleekgallery: {
            Transitions: {
                fadeslideleft: function(oldImage, newImage, oldPos, newPos) {
                    var duration = 1500;
                    var transition = 'swing';
                    if(jQuery.isFunction(jQuery.easing.easeOutCubic)) {
                        transition = 'easeOutCubic';
                    }
                    if (newPos > oldPos) {
                        newImage.css({'left' : this.galleryElement.outerWidth(true)}).animate({'left' : 0, 'opacity' : 1}, duration, transition);
                        oldImage.css({'opacity' : 1}).animate({'opacity' : 0}, duration, transition);
                    } else {
                        newImage.css({'opacity' : 0}).animate({'opacity' : 1}, duration, transition);
                        oldImage.css({'left' : 0}).animate({'left' : this.galleryElement.outerWidth(true), 'opacity' : 0}, duration, transition, function() { this.css('left', 0); });
                    }
                },
                continuoushorizontal: function(oldImage, newImage, oldPos, newPos) {
                    if (((newPos > oldPos) || ((newPos==0) && (oldPos == (this.maxIter-1) ))) &&
                        (!((newPos == (this.maxIter-1 )) && (oldPos == 0)))) {
                        oldImage.css({'opacity' : 1, 'left' : 0}).animate({
                            'left' : this.galleryElement.outerWidth(true) * -1
                            }, this.options.fadeDuration, 'linear');
                        newImage.css({'opacity' : 1, 'left' : this.galleryElement.outerWidth(true)}).animate({
                            'left' : 0
                        }, this.options.fadeDuration, 'linear');
                    } else  {
                        oldImage.css({'opacity' : 1, 'left' : 0}).animate({
                            'left' : this.galleryElement.outerWidth(true)
                        }, this.options.fadeDuration, 'linear');
                        newImage.css({'opacity' : 1, 'left': this.galleryElement.outerWidth(true) * -1}).animate({
                            'left' : 0
                        }, this.options.fadeDuration, 'linear');
                    }
                },
                continuousvertical: function(oldImage, newImage, oldPos, newPos) {
                    if (((newPos > oldPos) || ((newPos==0) && (oldPos == (this.maxIter-1) ))) &&
                        (!((newPos == (this.maxIter-1 )) && (oldPos == 0)))) {
                        oldImage.css({'opacity' : 1, 'top' : 0}).animate({
                            'top' : this.galleryElement.outerHeight(true) * -1
                        }, this.options.fadeDuration, 'linear');
                        newImage.css({'opacity' : 1, 'top' : this.galleryElement.outerHeight(true)}).animate({
                            'top' : 0
                        }, this.options.fadeDuration, 'linear');
                    } else {
                        oldImage.css({'opacity' : 1, 'top' : 0}).animate({
                            'top' : this.galleryElement.outerHeight(true)
                        }, this.options.fadeDuration, 'linear');
                        newImage.css({'opacity' : 1, 'top' : this.galleryElement.outerHeight(true) * -1}).animate({
                            'top' : 0
                        }, this.options.fadeDuration, 'linear');
                    }
                }
            }
        }
    });
})(jQuery);
