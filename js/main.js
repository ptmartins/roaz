(function() {

    let DOM = {},

        hasOverlays = false,

        cacheDOM = function() {
            DOM.overlay = document.getElementById('mapOverlay');
            DOM.mapBtn = document.getElementById('mapBtn');
            DOM.scrollTop = document.getElementById('scrollTop');
            DOM.morphItems = document.getElementsByClassName('morph__item');
        },

        UI = {
            overlay: data => {
                let overlay = document.createElement('DIV'),
                    content = document.createElement('DIV'),
                    close = document.createElement('I');

                overlay.className = 'overlay';
                content.className = 'overlay__content';
                close.className = 'overlay__close fa-solid fa-xmark';

                close.addEventListener('click', () => {
                    clearOverlays();
                });

                content.innerHTML = data;

                overlay.append(close, content);
                return overlay;
            }
        }

        clearOverlays = () => {
            document.body.removeChild(document.querySelector('.overlay'));
            hasOverlays = false;

            for(let i = 0; i < DOM.morphItems.length; i++) {
                DOM.morphItems[i].classList.contains('active') ? DOM.morphItems[i].classList.remove('active') : null;
            }
        },

        toggleMapDist = () => {
            DOM.overlay.classList.toggle('active');

            if(DOM.overlay.classList.contains('active')) {
                DOM.mapBtn.innerHTML = 'Ver mapa';
            } else {
                DOM.mapBtn.innerHTML = 'Ver distribuicao';
            }
        },

        setOverlayPos = boundingRect => {
            let overlay = document.getElementsByClassName('overlay')[0],
                roomRight = window.innerWidth - boundingRect.right;
            
                if (roomRight > 240) {
                    overlay.style.left = boundingRect.left + boundingRect.width + 2 + 'px';
                } else {
                    overlay.style.right = (window.innerWidth - boundingRect.right - boundingRect.width + 30) + 'px';
                }
            
            overlay.style.top = boundingRect.top + 2 + 'px';
        },

        showInfo = el => {
            hasOverlays ? clearOverlays() : null;
            let overlay = UI.overlay(el.dataset.info);
            document.body.append(overlay);
            hasOverlays = true;
            el.classList.toggle('active');
            setOverlayPos(el.getBoundingClientRect());
        },

        bindEvents = function() {
            DOM.mapBtn.addEventListener('click', toggleMapDist);
            window.addEventListener('resize', () => {
                hasOverlays ? clearOverlays() : null;
            });
            document.addEventListener('scroll', () => {
                if (window.scrollY > 600) {
                    DOM.scrollTop.classList.add('active');
                } else {
                    DOM.scrollTop.classList.remove('active');
                }

                hasOverlays ? clearOverlays() : null;
            });
            for(let i = 0; i < DOM.morphItems.length; i++) {
                DOM.morphItems[i].addEventListener('click', ev => {
                    showInfo(ev.target);
                });
            }
        },

        init = function() {
            cacheDOM();
            bindEvents();
            AOS.init({
                // Global settings:
                disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
                startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
                initClassName: 'aos-init', // class applied after initialization
                animatedClassName: 'aos-animate', // class applied on animation
                useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
                disableMutationObserver: false, // disables automatic mutations' detections (advanced)
                debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
                throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
                              
                // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
                offset: 120, // offset (in px) from the original trigger point
                delay: 0, // values from 0 to 3000, with step 50ms
                duration: 400, // values from 0 to 3000, with step 50ms
                easing: 'ease', // default easing for AOS animations
                once: false, // whether animation should happen only once - while scrolling down
                mirror: false, // whether elements should animate out while scrolling past them
                anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
              });
        };


    window.addEventListener('DOMContentLoaded', init);
})()