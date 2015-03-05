/**
 * Created by ejc84332 on 3/4/15.
 */

function ordinal_suffix_of(i){
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    if(i == 0){
        return '';
    }
    return "th";
}

function isNumeric(obj) {
    return obj - parseFloat(obj) >= 0;
}

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

        $('.fade-elem').css('opacity', 0); // prep for fade in

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


            // fade in the text aboce
            $('.fade-elem').each(function (i) {
                //$(this).find('.uppercase-underlined');
                var $elem = $(this);
                setTimeout(function () {
                    $elem.velocity({'opacity': '1'}, 1000, 'linear');
                }, 600 * i);
            });

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
            var $text = $(this).find('.proof-point__text_below');

            $number.css('opacity', 0);
            $text.css('opacity', 0);

            setTimeout(function() {
                bu_fx.animateSingleNumber($number);

                $number.velocity({opacity:1}, 600);
                $text.velocity({opacity:1}, 400);

            }, 100 * Math.floor((Math.random()*10)+1));

        });

    },

    animateSingleNumber : function($elem, final_num, start_num, duration) {

        var original_num = $elem.html();

        // If not set, take inner HTML of elem
        if (!final_num) final_num = parseFloat($elem.html().replace(/,/,''));

        // If not set, count up from zero
        if (!start_num) start_num = '0%';

        // If no set, default duration
        if (!duration) duration = 1000;

        // Find number of decimal places
        var decimalPlaces = (Math.floor(final_num) !== final_num) ? final_num.toString().split(".")[1].length || 0 : 0;

        // Test for correct EN locale string conversion
        var goodLocaleStringSupport = (new Number(10).toLocaleString() == '10');

        //Parking count animation
        $({countNum: 0}).animate({countNum: final_num},{
            duration: duration,
            easing: 'swing',
            step: function() {

                // Round to decimal places
                var stepNum = this.countNum.toFixed(decimalPlaces);

                // Add a comma if not a decimal
                if (decimalPlaces == 0 && goodLocaleStringSupport) stepNum = parseInt(stepNum).toLocaleString('en');

                var suffix = '';
                if(original_num.substr(-1) == '%'){
                    suffix = '%';
                }else if(!isNumeric(original_num.substr(-1))){
                    suffix = ordinal_suffix_of(stepNum);
                }

                $elem.html(stepNum + suffix);
            },
            complete:function() {

                $elem.html(original_num);
            }
        });
    },

    /*  Rotating statements
     \*------------------------------------*/
    campaignIdeas : [
        'faith.',
        'academics.',
        'community.',
        'each other.',
        'our neighbors.',
        'making a difference.',
        'living out our faith.',
        'excellence.'
    ],

    rotateStatements : function (options) {

        var module = this;
        module.settings = {};
        var interval;
        var currentStatement = 0;
        var defaults = {
            startDelay: 0,
            statements: null,
            containerElement: null,
            textElement: null,
            debug: false
        };

        var init = function () {
            module.settings = $.extend({}, defaults, options);
            module.statement_count = module.settings.statements.length;
            module.autoRotateStatements();
        };

        // Console logging for debugging
        var c = function (x) {
            if (module.settings.debug) {
                console.log(x);
            }
        };

        // Show a new statement then begin cycling the statements
        module.autoRotateStatements = function () {
            c('FUNCTION: autoRotateStatements');
            clearInterval(interval);
            interval = setInterval(module.showStatement, module.settings.speed);
        };


        module.changeText = function() {
            // Update the text after a delay.
            // The delay is necessary because the text has to fade before we change it
            setTimeout(function () {
                $(module.settings.textElement).velocity({opacity:0}, 600);
                $(module.settings.textElement).text(module.settings.statements[currentStatement]);
                $(module.settings.containerElement).width($(module.settings.textElement).width());
            }, module.settings.speed/8);

        };

        // reveal the text after delay
        module.revealText = function() {
            setTimeout(function () {
                $(module.settings.textElement).velocity({opacity:1}, 600);
            }, module.settings.speed/4);
        }

        // Show new statement
        module.showStatement = function () {

            // Get the next statement
            currentStatement += 1;
            if (currentStatement > module.statement_count-1) { currentStatement = 0; }

            c('FUNCTION: showStatement #' + currentStatement);
            $(module.settings.textElement).velocity({opacity:0}, 600);
            module.changeText();
            module.revealText();

        };

        // Pause
        module.pause = function () {
            c('FUNCTION: pause');
            window.clearInterval(interval);
        };

        init();

        return module;

    }

};

$(document).ready( function() {
    window_manager.initialize();
});
$(window).load(function(){
    bu_fx.setupFX();
    bu_fx.rotateStatements(
        {
            speed: 4000,
            containerElement: $('.rotate_text').find('h2 span'),
            textElement: $('.rotate_text').find('h2 span em'),
            statements: bu_fx.campaignIdeas,
            debug: false
        }
    );
});
