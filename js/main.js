(function() {

    let DOM = {},

        hasOverlays = false,

        cacheDOM = function() {
            DOM.overlay = document.getElementById('mapOverlay');
            DOM.mapBtn = document.getElementById('mapBtn');
            DOM.scrollTop = document.getElementById('scrollTop');
            DOM.morphItems = document.getElementsByClassName('morph__item');
            DOM.accordions = document.querySelectorAll('.accordion__title');
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

        closeAccordions = () => {
            for(let i = 0; i < DOM.accordions.length; i++) {
                DOM.accordions[i].classList.contains('active') ? DOM.accordions[i].classList.remove('active') : null;
            }
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

            for(let i = 0; i < DOM.accordions.length; i++) {
                DOM.accordions[i].addEventListener('click', ev => {
                    closeAccordions();
                    DOM.accordions[i].classList.toggle('active');
                });
            }
        },

        init = function() {
            cacheDOM();
            bindEvents();
        };


    window.addEventListener('DOMContentLoaded', init);
})()