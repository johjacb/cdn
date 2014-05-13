$(function() {
	initGallery();
});

function initGallery() {
  // settings
  var _activeClass = 'active';
  var _minWidth = 1000;
  var _fadeSpeed = 100;
  var _speed = 650;

  $('div#gallery').each(function(){
	// gallery options
	var _holder = $(this);
	var _btnUp = _holder.find('a.arrow-up');
	var _btnDown = _holder.find('a.arrow-down');
	var _slidesHolder = _holder.find('div.gallery-holder');
	var _tooltips = _holder.find('div.more-info > div.infobox').hide();
	var _slider = _slidesHolder.find('>div.slider');
	var _slides = _slider.children();
	var _stepsCount = _slides.length;
	var _slideHeight = _slidesHolder.height();
	var _currentIndex = 0;
	var _oldIndex = 0;
	var _direction;

	///Updated "click-ability" to the "infobox-content" class in the gallery //erm--2011-05-23@2:59pm
	$('.infobox-content',_holder).click(function(){
		window.location = $(this).find('a[href]').attr('href');
		return false;
	});


	// gallery control
	_btnUp.click(function(){
	  prevSlide();
	  return false;
	});
	_btnDown.click(function(){
	  nextSlide();
	  return false;
	});

	// gallery init
	if(_currentIndex<0) _currentIndex=0;
	_slider.css({
	  position:'relative',
	  height:_slideHeight
	});
	_slides.hide().eq(_currentIndex).show();
	_slides.css({
	  position:'absolute',
	  top:0
	});

	// gallery animation
	function prevSlide() {
	  _oldIndex = _currentIndex;
	  if(_currentIndex > 0) _currentIndex--;
	  else _currentIndex = _stepsCount-1;
	  _direction=0;
	  switchSlide();
	}
	function nextSlide() {
	  _oldIndex = _currentIndex;
	  if(_currentIndex < _stepsCount-1) _currentIndex++;
	  else _currentIndex = 0;
	  _direction=1;
	  switchSlide();
	}
	function switchSlide() {
	  var _prevSlide = _slides.eq(_oldIndex);
	  var _nextSlide = _slides.eq(_currentIndex);
	  _nextSlide.css({top:_slideHeight*(_direction ? 1 : -1)}).show();
	  _prevSlide.animate({top:_slideHeight*(_direction ? -1 : 1)},{duration:_speed, queue:false});
	  _nextSlide.animate({top:0},{duration:_speed, queue:false});
	}

	// gallery tooltips
	_slides.children().each(function(_ind){
	  var _opener = $(this);
	  var _popup = _tooltips.eq(_ind);
	  var _timer;
	  _opener.hover(function(){
		if(_timer) clearTimeout(_timer);
		_timer = setTimeout(function(){
			_popup.fadeIn(_fadeSpeed);
		},_fadeSpeed);
	  },function(){
		if(_timer) clearTimeout(_timer);
		_timer = setTimeout(function(){
			_popup.fadeOut(_fadeSpeed);
		},_fadeSpeed)
	  });

	  _popup.hover(function(){
		if(_timer) clearTimeout(_timer);
	  },function(){
		_timer = setTimeout(function(){
		  _popup.fadeOut(_fadeSpeed);
		},_fadeSpeed);
	  });
	});
  });
};

function initGalleryBig() {
	// settings
	var _activeClass = 'active';
	var _minWidth = 1000;
	var _fadeSpeed = 100;
	var _speed = 650;

	$('div#gallerybig').each(function(){
		// gallery options
		var _holder = $(this);
		var _btnUp = _holder.find('a.arrow-up');
		var _btnDown = _holder.find('a.arrow-down');
		var _slidesHolder = _holder.find('div.gallery-holder');
		var _tooltips = _holder.find('div.more-info > div.infobox').hide();
		var _slider = _slidesHolder.find('>div.slider');
		var _slides = _slider.children();
		var _langs = _holder.find('div.slider .text');
		var _stepsCount = _slides.length;
		var _rowHeight = $(_slides[0]).height()
		var _slideHeight = _slidesHolder.height();
		var _currentIndex = 0;
		var _oldIndex = 0;
		var _direction;
		var _animationsInProgress = [];

	///Updated "click-ability" to the "infobox-content" class in the gallery //erm--2011-05-23@2:59pm
	$('.infobox-content',_holder).click(function(){
		window.location = $(this).find('a[href]').attr('href');
		return false;
	});

	// gallery control
	_btnUp.click(function(){
		prevSlide();
		return false;
	});
	_btnDown.click(function(){
		nextSlide();
		return false;
	});

	// gallery init
	if(_currentIndex<0) _currentIndex=0;
	_slider.css({
		position:'relative',
		height:_slideHeight
	});
	
	/* hide all slide rows except the currentIndex and the two after it */
	_slides.each(function(index, element) {
		var el = $(element);
		if (index >= _currentIndex && index < _currentIndex + 3) {
			el.show();
		}
		var relativeLoc = index - _currentIndex;
		/* move the slide to the "correct" location */
		el.css({
			position:'absolute',
			top:relativeLoc * _rowHeight
		});
	});

	/* only show the text in the middle row */
	_langs.hide().each(function(index, element) {
		var el = $(element);
		var start = _currentIndex + 3;
		var stop = start + 2;
		if (index >= start && index <= stop) {
			el.fadeIn('slow');
		}
	});

	// gallery animation
	function prevSlide() {
		if (_animationsInProgress.length) { return; }
		_oldIndex = _currentIndex;
		if(_currentIndex > 0) _currentIndex--;
		else _currentIndex = _stepsCount-1;
		_direction=0;
		switchSlide();
	}
	function nextSlide() {
		if (_animationsInProgress.length) { return; }
		_oldIndex = _currentIndex;
		if(_currentIndex < _stepsCount-1) _currentIndex++;
		else _currentIndex = 0;
		_direction=1;
		switchSlide();
	}
	function switchSlide() {
		var _nextSlide;
		var slidesInView = [];
		var nextHeight;
		
		if (_direction) { /* down arrow pressed, moving up (negative) */
			slidesInView.push(_slides.eq(_oldIndex));
			slidesInView.push(_slides.eq(_currentIndex));
			// using %3 will cause these to wrap around to the front,
			// effectively simulating a "ring buffer"
			slidesInView.push(_slides.eq((_currentIndex+1)%_stepsCount));
			/* put the next slide at the end (since it is coming in from
			  the bottom) */
			_nextSlide = _slides.eq((_currentIndex+2)%_stepsCount);
			slidesInView.push(_nextSlide);
			nextHeight = _slideHeight;
		} else { /* up arrow pressed, moving down (positive) */
			_nextSlide = _slides.eq(_currentIndex);
			slidesInView.push(_nextSlide);
			slidesInView.push(_slides.eq(_oldIndex));
			slidesInView.push(_slides.eq((_oldIndex+1)%_stepsCount));
			slidesInView.push(_slides.eq((_oldIndex+2)%_stepsCount));
			nextHeight = _rowHeight;
		}
		/* Since the slides are changing position vertically, we must
		   adjust the CSS classes of the hover slides */
		_slides.eq(_currentIndex).children('li').each(function(index, slide) {
		   $('#' + $(this).attr('name')).toggleClass('position-top', true);
		   $('#' + $(this).attr('name')).toggleClass('position-bottom', false);
		});
		_slides.eq((_currentIndex+1)%_stepsCount).children('li').each(function(index, slide) {
		   $('#' + $(this).attr('name')).toggleClass('position-top', false);
		   $('#' + $(this).attr('name')).toggleClass('position-bottom', false);
		});
		_slides.eq((_currentIndex+2)%_stepsCount).children('li').each(function(index, slide) {
		   $('#' + $(this).attr('name')).toggleClass('position-top', false);
		   $('#' + $(this).attr('name')).toggleClass('position-bottom', true);
		});

		/* position the next slide either above or below the box 
		   (depending on the direction of the slider */
		_nextSlide.css({
			top:nextHeight*(_direction ? 1 : -1)
		}).show();
		
		/* initialize the animations */
		jQuery.each(slidesInView, function(index, slide) {
			var curTop = parseInt(slide.css('top').replace(/px/,''));
			_animationsInProgress.push(slide);
			slide.animate(
				{top:curTop + (_rowHeight*(_direction ? -1 : 1))},
				{duration: _speed, queue: false,
				 complete: function() {
						/* remove one item from the animation slides in progress.
						   when this is empty, another slide can begin */
						_animationsInProgress.pop();
					}
				}
			);
			var langs = slide.find('.text');
			/* fade in / out the branding text.  only the middle visible row
			   should have text displayed */
			if ((_direction && index == 2) || (!_direction && index == 1)) {
				jQuery.each(langs, function(index, text) {
					$(text).fadeIn('slow');
				});
			} else {
				jQuery.each(langs, function(index, text) {
					$(text).fadeOut('slow');
				});
			}
		});
	}

	// gallery tooltips
	_slides.children('.slide').each(function(_ind){
		var _opener = $(this);
		var _popup = _tooltips.eq(_ind);
		var _timer;
		_opener.hover(function(){
			if(_timer) clearTimeout(_timer);
			_timer = setTimeout(function(){
				_popup.fadeIn(_fadeSpeed);
			},_fadeSpeed);
		},function(){
			if(_timer) clearTimeout(_timer);
			_timer = setTimeout(function(){
				_popup.fadeOut(_fadeSpeed);
			},_fadeSpeed)
		});

	_popup.hover(function(){
		if(_timer) clearTimeout(_timer);
	},function(){
		_timer = setTimeout(function(){
			_popup.fadeOut(_fadeSpeed);
		},_fadeSpeed);
	});
});
});
}