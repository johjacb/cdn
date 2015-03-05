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
        //// is android
        //var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
        //// ios detection
        //var isIOS = false;
        //var iDevice = ['iPad', 'iPhone', 'iPod'];
        //for ( var i = 0 ; i < iDevice.length ; i++ ) {
        //    if( navigator.platform === iDevice[i] ){
        //        isIOS = true;
        //        break;
        //    }
        //}
        //
        //// Determine if this device cannot autoplay HTML5 video
        //if (isAndroid || isIOS) {
        //    window_manager.cannotAutoplayVideo = true;
        //    window_manager.useTransitions = true;
        //}
        //
        //if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        //    window_manager.useParallax = true;
        //    bu_fx.setupFX();
        //} else {
        //    window_manager.useParallax = false;
        //}

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
        bu_fx.enable();
    },

    // Re-run as needed.
    enable : function() {
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
        bu_fx.enable();
        //if (!bu_fx.enabled && window_manager.windowWidth > 640) {
        //}
        //} else if (bu_fx.enabled && window_manager.windowWidth < 640) {
        //    bu_fx.disable();
        //}

        //if (!bu_fx.enabled) return false;

        /*
         * Undergraduate Admission | number counter
         *************************/
        if (this.proofPointAnimationReady && window_manager.scrollBot > this.ppStartPX ) {
            this.animateProofPoints();


            // fade in the text aboce
            var elem = $('.homepage-animate');

            setTimeout(function () {
                elem.addClass('js-fade-in');
            }, 600);

            this.proofPointAnimationReady = false;

        }

        if (window_manager.scrollTop < 100) {
            // Reset the animation if the user goes to the top.
            this.proofPointAnimationReady = true;
            this.resetProofpoints();
            $('.homepage-animate').removeClass('js-fade-in');
        }

    },

    resetProofpoints : function(){
        var elements = document.getElementsByClassName('odometer');
        for (var index = 0; index < elements.length; ++index) {
            var element = elements[index];
            element.innerHTML = 0;
        }
    },

    animateProofPoints : function() {
        setTimeout(function(){
            var elements = document.getElementsByClassName('odometer');
            var index;
            for (var index = 0; index < elements.length; ++index) {
                var element = elements[index];
                var number = element.dataset.finalNumber;
                element.innerHTML = number;
            }
        }, 1000);
    },


    /*  Rotating statements
     \*------------------------------------*/
    committedPhrases : [
        'challenging ourselves',
        'supporting each other',
        'community',
        'laughing...a lot',
        'learning inside and outside the classroom',
        'faith',
        'making a difference',
        'serving our neighbors',
        'exploring the world',
        'hope',
        'hard work',
        'big dreams',
        'living with purpose',
        'fun',
        'asking important questions',
        'spreading Christ’s love'
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
                $(module.settings.textElement).text(module.settings.statements[currentStatement]);
                $(module.settings.containerElement).width($(module.settings.textElement).width());
            }, module.settings.speed/8);

        };

        // Show new statement
        module.showStatement = function () {

            // Get the next statement
            currentStatement += 1;
            if (currentStatement > module.statement_count-1) { currentStatement = 0; }

            c('FUNCTION: showStatement #' + currentStatement);

            $(module.settings.textElement).addClass('js-wordAnimate');

            setTimeout(function () {
                $(module.settings.textElement).text(module.settings.statements[currentStatement]);
                $(module.settings.containerElement).width($(module.settings.textElement).width());
            }, module.settings.speed/8);

            setTimeout(function () {
                $(module.settings.textElement).removeClass('js-wordAnimate');
            }, module.settings.speed/4);

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
            statements: bu_fx.committedPhrases,
            debug: false
        }
    );
});
