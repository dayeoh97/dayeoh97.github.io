//initiate swup
const swup = new Swup(); 

init = () => {
    const hamButton = document.querySelector('#hamburger-button');
    const navbar = document.querySelector('nav');
    const logo = document.querySelector('#logo');
    const menu = document.querySelector("#menu");
    const paddingSquare = document.querySelector('#padding-square');
    let browserSession = window.sessionStorage;
    const currentPath = window.location.pathname;
//index
    //calculate current year
    document.querySelector("footer span span").innerHTML = new Date().getFullYear();
    //scroll work section into view
    workScroll = (x) => {
        paddingSquare.scrollIntoView({
            behavior: x,
            block: "start"
        });
    };
    if(document.querySelector('.index')){
        //scroll work into view if link in menu is clicked
        menu.querySelector("a:first-of-type").addEventListener('click', () => { 
            menuSwitch();
            workScroll("smooth");
        });
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            if(document.body.className === 'menu-switch'){
                menuSwitch();
            };
        });
        //handle loading animation
        loadingAnimation = () => {
            bodyScrollLock.disableBodyScroll(menu, {reserveScrollBarGap: true,});
            setTimeout(() => {logo.classList.add('menu-switch')}, 750);
            setTimeout(() => {logo.classList.remove('menu-switch')}, 2150);
            setTimeout(() => {
                document.body.classList.remove('loading-animation');
                bodyScrollLock.enableBodyScroll(menu);
                navbar.classList.add('hidden');
            }, 3650);
        }
        //check whether animation has been played before
        if (browserSession.getItem("loading") == 'done') {
            //if index page is reloaded then play animation again, otherwise no animation
            if (browserSession.getItem("lastURL") == '/' || browserSession.getItem("lastURL") == '/index.html') {
                loadingAnimation();
            } else {
                document.body.classList.remove('loading-animation');
            };
        //if animation has never played before, play animation then write to sessionStorage
        } else {
            loadingAnimation();
            browserSession.setItem("loading", "done");
        };
    };
    browserSession.setItem("lastURL", currentPath);
    //check for the correct URL then scroll to element or top of screen
    if (!window.location.href.includes("#padding-square")){
        window.scrollTo(0, 0);
    } else {
        workScroll("auto");
    };
    //toggle for menu
    menuSwitch = () => {
        navbar.classList.toggle('flatten');
        hamButton.classList.toggle('menu-switch');
        logo.classList.toggle('menu-switch');
        menu.classList.toggle('menu-switch');
        document.body.classList.toggle('menu-switch');
        //check if menu is present then disable scrolling
        if(document.body.className.includes("menu-switch") && document.querySelector('#menu').className.includes('switch')){
            bodyScrollLock.disableBodyScroll(menu, {reserveScrollBarGap: true,});
        } else {
            bodyScrollLock.enableBodyScroll(menu);
        }
    };
    hamButton.addEventListener('click', menuSwitch);
    //check for and then initiate carousel
    if (document.querySelector('.main-carousel')) {
        var caros = document.querySelectorAll('.main-carousel');
        caros.forEach(caro => {
            var flkty = new Flickity( caro, {
                cellSelector: '.carousel-cell',
                wrapAround: true,
                imagesLoaded: true,
                arrowShape: 'M70.1,22.7v55.3L22.5,50.4L70.1,22.7 M73.3,9.4c-1.3,0-2.6,0.3-3.9,1.1L12.2,43.7c-2.6,1.5-3.9,4.1-3.9,6.7c0,2.6,1.3,5.2,3.9,6.7l57.2,33.2c1.3,0.7,2.6,1.1,3.9,1.1c4.1,0,7.8-3.3,7.8-7.8V17.2C81.1,12.6,77.4,9.4,73.3,9.4L73.3,9.4z'
            });
        });
    };
    //scroll page to top of screen if current page in menu is clicked
    menu.querySelectorAll('a:not(:first-of-type)').forEach(menuLink => {
        menuLink.addEventListener('click', () => {
            if (menuLink.getAttribute("href").match(currentPath)){
                menuSwitch();
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            };
        });
    });
    //make the navbar transparent if scroll position is less than 1 screen height
    navScroll = () => {
        if (window.matchMedia('screen and (max-width:768px)').matches){
            if (document.documentElement.scrollTop > 0 || window.scrollY > 0){
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('shadow');
            };
        }
        if (document.querySelector('.index')){
            if (contentBounds(document.querySelector('#home-hero'), 6.5, 7)){
                navbar.classList.remove('hidden');
            } else{
                navbar.classList.add('hidden');
            }
        }
    };
    document.addEventListener('scroll', () => {
        navScroll();
    });
    if (document.querySelector('.exex')){
        navbar.classList.add('lighten');
    }
    contentBounds = (x, y, z) => {
        return ((x.getBoundingClientRect().top >= (window.innerHeight/y || document.documentElement.clientHeight/y) && x.getBoundingClientRect().bottom > 0) || ((x.getBoundingClientRect().bottom <= window.innerHeight/z) && x.getBoundingClientRect().top < 0))
    }
    eutmScroll = () => {
        if (document.querySelector('.eutm')){
            let flowVideos = document.querySelectorAll('video');
            flowVideos.forEach(flowVideo => {
                if (contentBounds(flowVideo, 3.5, 2)){
                    flowVideo.pause();
                    flowVideo.controls = false;
                    flowVideo.loop = false;
                } else {
                    flowVideo.play();
                    flowVideo.controls = true;
                    flowVideo.loop = true;
                }
            })
            let orangeBlocks = document.querySelectorAll('.orange-block');
            if (!window.matchMedia('screen and (max-width:756px)').matches){
                if (!contentBounds(orangeBlocks[0], 6.5, 7) || !contentBounds(orangeBlocks[1], 6.5, 7)){
                    navbar.classList.add('lighten');
                } else {
                    if (document.querySelector('.lighten')){
                        navbar.classList.remove('lighten');
                    }
                }
            }
        }
    }
    murchiesScroll = () => {
        if (document.querySelector('.murchies')){
            if (window.matchMedia('screen and (max-width: 1440px) and (min-width:756px)').matches){
                if (!contentBounds(document.querySelectorAll('.colour-swatch')[0], 6.5, 7)){
                    navbar.classList.add('lighten');
                } else {
                    if (document.querySelector('.lighten')){
                        navbar.classList.remove('lighten');
                    }
                }
            }
        }
    }
    homeScroll = () =>{
        if (document.querySelector('.index')){
            if (!contentBounds(document.querySelectorAll('.work-card')[0], 6.5, 7)){
                navbar.classList.add('lighten');
            } else {
                if (document.querySelector('.lighten')){
                    navbar.classList.remove('lighten');
                }
            }
        }
    }
    exexScroll = () =>{
        if (document.querySelector('.exex')){
            if (!contentBounds(document.querySelectorAll('.banner-img')[0], 6.5, 7) || !contentBounds(document.querySelectorAll('.exex-section-1')[0], 6.5, 7)){
                navbar.classList.add('lighten');
            } else {
                if (document.querySelector('.lighten')){
                    navbar.classList.remove('lighten');
                }
            }
        }
    }
    window.addEventListener('scroll', () => {
        eutmScroll();
        murchiesScroll();
        homeScroll();
        exexScroll();
    })
    scrollButtons = (a, b) => {
        if (a){
            a.addEventListener('click', () => {
                b.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
    }
    scrollButtons(document.querySelectorAll('.work-card')[1], document.querySelector('footer'));
};

document.addEventListener('DOMContentLoaded', init);
swup.on('contentReplaced', init);

unload = () => {
    document.body.classList.remove('menu-switch');
    bodyScrollLock.enableBodyScroll(menu);
}
swup.on('willReplaceContent', unload);

