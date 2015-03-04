/**
 * Created by ejc84332 on 3/4/15.
 */


var window_manager = {

    // Manual Configs
    resizerLatency : 40, // in milliseconds. Higher = less CPU, lower = faster UI

    // Automagic Configs (changed by the script)
    useTransitions      : true,
    useParallax         : true,
    cannotAutoplayVideo : false,

    // Vars to initialize
    resizeTimeout   : null,
    windowWidth     : null,
    windowHeight    : null,
    scrollTop       : null,
    scrollBot       : null,
    getVars         : null,

    initialize : function() {
        window_manager.useParallax = true;


        // is android
        var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
        // ios detection
        var isIOS = false;
        var iDevice = ['iPad', 'iPhone', 'iPod'];
        for ( var i = 0 ; i < iDevice.length ; i++ ) {
            if( navigator.platform === iDevice[i] ){
                isIOS = true;
                break;
            }
        }

        // Determine if this device cannot autoplay HTML5 video
        if (isAndroid || isIOS) {
            window_manager.cannotAutoplayVideo = true;
            window_manager.useTransitions = true;
        }

        if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
            window_manager.useParallax = true;
            bu_fx.setupFX();
        } else {
            window_manager.useParallax = false;
        }

        // Set up window change events
        if (window.addEventListener) {
            window.addEventListener('scroll', window_manager.scroller, false);
            window.addEventListener('resize', window_manager.resizer, false);
        } else if (window.attachEvent) {
            window.attachEvent('onscroll', window_manager.scroller);
            window.attachEvent('onresize', window_manager.resizer);
        }

        window_manager.scrollTop     = $(window).scrollTop();
        window_manager.windowWidth   = $(window).width();
        window_manager.windowHeight  = $(window).height();
    }, // end initialize

    /***************************************************
     * The purpose of the resizer function is to act as a buffer to prevent rapid execution of the functions which must run on window resize.
     * By using a timetout, we can reduce the number of times these functions are called to increase browser performance.
     ***************************************************/
    resizer : function() {

        if (window_manager.resizeTimeout != null) {
            clearTimeout(window_manager.resizeTimeout);
        }
        window_manager.resizeTimeout = setTimeout(function() {
            window_manager.resizeTimeout = null;

            // Update vars
            window_manager.windowWidth = $(window).width();
            window_manager.windowHeight = $(window).height();

            //// FUNCTIONS TO FIRE ON RESIZE HERE:
            //cu_hero_area.adjustVideoSize();

        }, window_manager.resizerLatency);

    }, // end resizer

    scroller : function() {

        // Update vars
        window_manager.scrollTop = $(window).scrollTop();
        window_manager.scrollBot = window_manager.scrollTop + window_manager.windowHeight;

        // FUNCTIONS TO FIRE ON SCROLL HERE:
        if (window_manager.useParallax) bu_fx.process();

    } // end scroller

}; // end window_manager

var bu_fx = {

    enabled : false, // starts false
    skrollr : null,

    ppStartPX            : null,
    animationReady     : false,
    $undergraduateAdmission     : null,

    setupFX : function() {

        /*
         * Undergraduate Admission
         *************************/
        this.$proofPoints = $(".grid.proof-points");
        this.ppStartPX = this.$proofPoints.offset().top;

        this.$proofPoints.find('.fade-elem').css('opacity', 0); // prep for fade in

    },

    // Re-run as needed.
    enable : function() {

        // DO ENABLE TASKS
        try {

            // Do not initialize Skrollr on mobile.
            if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                bu_fx.skrollr = skrollr.init();
            }

        } catch (e) {
            // No Skrollr support
        }

        this.proofPointAnimationReady = true;

        bu_fx.enabled = true;
    },

    // Re-run as needed.
    disable : function() {
        // DO DISABLE TASKS
        //bu_fx.skrollr.destroy();
        bu_fx.enabled = false;

        //this.$graduateAdmission.css('background-size','');
    },

    // Fire on scroll to position elements
    process : function() {
        if (!bu_fx.enabled && window_manager.windowWidth > 640) {
            bu_fx.enable();
        } else if (bu_fx.enabled && window_manager.windowWidth < 640) {
            bu_fx.disable();
        }

        if (!bu_fx.enabled) return false;

        /*
         * Undergraduate Admission | number counter
         *************************/
        if (this.proofPointAnimationReady && window_manager.scrollBot > this.ppStartPX ) {
            this.animateProofPoints();

            //this.$undergraduateAdmission.find('.fade-elem').each(function (i) {
            //    var $elem = $(this);
            //    setTimeout(function () {
            //        $elem.animate({'opacity': '1'}, 1000, 'linear');
            //    }, 600 * i);
            //});

            this.proofPointAnimationReady = false;

        }

        if (window_manager.scrollTop < 100) {
            // Reset the animation if the user goes to the top.
            this.proofPointAnimationReady = true;
        }

    },

    animateProofPoints : function() {

        this.$proofPoints.find(".grid-cell").each(function(i) {
            var $number = $(this).find('.proof-point__number');
            var $text = $(this).find('.proof-point__text_below'); //.html().split("<br>")[1]; // kinda hacky for now

            $number.css('opacity', 0);
            $text.css('opacity', 0);

            setTimeout(function() {
                bu_fx.animateSingleNumber($number);

                $number.animate({opacity:1}, 600);
                $text.animate({opacity:1}, 400);

            }, 100 * Math.floor((Math.random()*10)+1));

        });

    },

    animateSingleNumber : function($elem, final_num, start_num, duration) {

        var original_num = $elem.html();

        // If not set, take inner HTML of elem
        if (!final_num) final_num = parseFloat($elem.html().replace(/,/,''));

        // If not set, count up from zero
        if (!start_num) start_num = 0;

        // If no set, default duration
        if (!duration) duration = 1000;

        // Find number of decimal places
        var decimalPlaces = (Math.floor(final_num) !== final_num) ? final_num.toString().split(".")[1].length || 0 : 0;

        // Test for correct EN locale string conversion
        var goodLocaleStringSupport = (new Number(10).toLocaleString() == '10');

        //Parking count animation
        $({countNum: 0})
            .animate({countNum: final_num},{
                duration: duration,
                easing: 'swing',
                step: function() {

                    // Round to decimal places
                    var stepNum = this.countNum.toFixed(decimalPlaces);

                    // Add a comma if not a decimal
                    if (decimalPlaces == 0 && goodLocaleStringSupport) stepNum = parseInt(stepNum).toLocaleString('en');

                    $elem.html(stepNum);
                },
                complete:function() {
                    $elem.html(original_num);
                }
            });
    }
};

$(document).ready( function() {
    window_manager.initialize();
});
$(window).load(function(){
    bu_fx.setupFX();

});
// cu_parallax_fx.skrollr = skrollr.init();
