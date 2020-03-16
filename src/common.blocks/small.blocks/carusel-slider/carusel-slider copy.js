var slideShow = (function () {
    return function (selector, config) {
      var
        _sliders = document.querySelectorAll(selector), // основный элемент блока
        _sliderContainers = _sliders.map((el)=>{let arr = el.querySelectorAll('.slider__items');return arr}), // контейнер для .slider-item
        _sliderItems = _sliders.map((el)=>{let arr = el.querySelectorAll('.slider__item');return arr}), // коллекция .slider-item
        _sliderControls = _sliders.map((el)=>{let arr = el.querySelectorAll('.slider__control');return arr}), // элементы управления
        _currentPosition = 0, // позиция левого активного элемента
        _transformValue = 0, // значение транфсофрмации .slider_wrapper
        _transformStep = 100, // величина шага (для трансформации)
        _arrArray = [], // массив массивов элементов для слайдеров
        _timerId,
        _indicatorItems = [],
        _indicatorIndex = 0,
        _indicatorIndexMax = [],
        _stepTouch = 50,
        _config = {
          isAutoplay: false, // автоматическая смена слайдов
          directionAutoplay: 'next', // направление смены слайдов
          delayAutoplay: 5000, // интервал между автоматической сменой слайдов
          isPauseOnHover: true // устанавливать ли паузу при поднесении курсора к слайдеру
        };
      
      // заполение массива инжикаторов
      for (let i in _sliderItems){
        _indicatorIndexMax.push(_sliderItems[i].length - 1);
      }
      // настройка конфигурации слайдера в зависимости от полученных ключей
      for (var key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }
  
      // наполнение массива _arrArray
      for (var i = 0, length = _sliderItems.length; i < length; i++) {
        var _itemsArray = []; //массив элементов для одного слайдера
        for(var j = 0, length = _sliderItems[i].length; j < length; j++){
          _itemsArray.push({ item: _sliderItems[i][j], position: j, transform: 0 });
        }
        _arrArray.push(_itemsArray);
      }
  
      // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
      var position = {
        getItemIndex: function (mode) {
          var index = 0;
          for (var i = 0, length = _arrArray.length; i < length; i++) {
            for(var j = 0, length = _arrArray[i].length; j < length; j++){
              if ((_arrArray[i][j].position < _arrArray[i][index].position && mode === 'min') || (_arrArray[i][j].position > _arrArray[i][index].position && mode === 'max')) {
                index = j;
              }
            }
          }
          return index;
        },
        getItemPosition: function (mode) {
          for (var i = 0, length = _arrArray.length; i < length; i++) {
            return _arrArray[i][position.getItemIndex(mode)].position;
          }
        }
      };
  
      // функция, выполняющая смену слайда в указанном направлении
      var _move = function (direction) {
        for (var i = 0, length = _arrArray.length; i < length; i++){
          var nextItem, currentIndicator = _indicatorIndex;
          if (direction === 'next') {
            _currentPosition++;
            if (_currentPosition > position.getItemPosition('max')) {
              nextItem = position.getItemIndex('min');
              _arrArray[i][nextItem].position = position.getItemPosition('max') + 1;
              _arrArray[i][nextItem].transform += _arrArray[i].length * 100;
              _arrArray[i][nextItem].item.style.transform = 'translateX(' + _arrArray[i][nextItem].transform + '%)';
            }
            _transformValue -= _transformStep;
            _indicatorIndex = _indicatorIndex + 1;
            if (_indicatorIndex > _indicatorIndexMax) {
              _indicatorIndex = 0;
            }
          } else {
            _currentPosition--;
            if (_currentPosition < position.getItemPosition('min')) {
              _arrArray[i][nextItem].position = position.getItemPosition('min') - 1;
              _arrArray[i][nextItem].transform -= _arrArray[i].length * 100;
              _arrArray[i][nextItem].item.style.transform = 'translateX(' + _arrArray[i][nextItem].transform + '%)';
            }
            _transformValue += _transformStep;
            _indicatorIndex = _indicatorIndex - 1;
            if (_indicatorIndex < 0) {
              _indicatorIndex = _indicatorIndexMax;
            }
          }
          _sliderContainers[i].style.transform = 'translateX(' + _transformValue + '%)';
          _indicatorItems[i][currentIndicator].classList.remove('active');
          _indicatorItems[i][_indicatorIndex].classList.add('active');
        };
      };
  
      // функция, осуществляющая переход к слайду по его порядковому номеру
      var _moveTo = function (index) {
        var i = 0, direction = (index > _indicatorIndex) ? 'next' : 'prev';
        while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
          _move(direction);
          i++;
        }
      };
  
      // функция для запуска автоматической смены слайдов через промежутки времени
      var _startAutoplay = function () {
        if (!_config.isAutoplay) {
          return;
        }
        _stopAutoplay();
        _timerId = setInterval(function () {
          _move(_config.directionAutoplay);
        }, _config.delayAutoplay);
      };
  
      // функция, отключающая автоматическую смену слайдов
      var _stopAutoplay = function () {
        clearInterval(_timerId);
      };
  
      // функция, добавляющая индикаторы к слайдеру
      var _addIndicators = function () {
        var indicatorsContainer = document.createElement('ol');
        indicatorsContainer.classList.add('slider__indicators');
        for (var i = 0, length = _sliderItems.length; i < length; i++) {
          var sliderIndicatorsItem = document.createElement('li');
          if (i === 0) {
            sliderIndicatorsItem.classList.add('active');
          }
          sliderIndicatorsItem.setAttribute("data-slide-to", i);
          indicatorsContainer.appendChild(sliderIndicatorsItem);
        }
        for (var i = 0, length = _sliderItems.length; i < length; i++){
          _sliders[i].appendChild(indicatorsContainer);
          _indicatorItems.push(_sliders[i].querySelectorAll('.slider__indicators > li'))
        }
      };
  
      var _isTouchDevice = function () {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
      };
  
      // функция, осуществляющая установку обработчиков для событий 
      var _setUpListeners = function () {
        for (var i = 0, length = _sliderItems.length; i < length; i++){
          var _startX = 0;
          if (_isTouchDevice()) {
            _sliders[i].addEventListener('touchstart', function (e) {
              _startX = e.changedTouches[0].clientX;
              _startAutoplay();
            });
            _sliders[i].addEventListener('touchend', function (e) {
              var
                _endX = e.changedTouches[0].clientX,
                _deltaX = _endX - _startX;
              if (_deltaX > _stepTouch) {
                _move('prev');
              } else if (_deltaX < -_stepTouch) {
                _move('next');
              }
              _startAutoplay();
            });
          } else {
            for (var j = 0, length = _sliderControls[i].length; j < length; j++) {
              _sliderControls[i][j].classList.add('slider__control_show');
            }
          }
          _sliders[i].addEventListener('click', function (e) {
            if (e.target.classList.contains('slider__control')) {
              e.preventDefault();
              _move(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
              _startAutoplay();
            } else if (e.target.getAttribute('data-slide-to')) {
              e.preventDefault();
              _moveTo(parseInt(e.target.getAttribute('data-slide-to')));
              _startAutoplay();
            }
          });
          document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === "hidden") {
              _stopAutoplay();
            } else {
              _startAutoplay();
            }
          }, false);
          if (_config.isPauseOnHover && _config.isAutoplay) {
            _sliders[i].addEventListener('mouseenter', function () {
              _stopAutoplay();
            });
            _sliders[i].addEventListener('mouseleave', function () {
              _startAutoplay();
            });
          }
        }
      };
  
      // добавляем индикаторы к слайдеру
      _addIndicators();
      // установливаем обработчики для событий
      _setUpListeners();
      // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
      _startAutoplay();
  
      return {
        // метод слайдера для перехода к следующему слайду
        next: function () {
          _move('next');
        },
        // метод слайдера для перехода к предыдущему слайду          
        left: function () {
          _move('prev');
        },
        // метод отключающий автоматическую смену слайдов
        stop: function () {
          _config.isAutoplay = false;
          _stopAutoplay();
        },
        // метод запускающий автоматическую смену слайдов
        cycle: function () {
          _config.isAutoplay = true;
          _startAutoplay();
        }
      }
    }
  }());
  
  slideShow('.slider', {
    isAutoplay: false
  });