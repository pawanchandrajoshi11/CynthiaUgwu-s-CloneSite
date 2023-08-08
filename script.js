var timeOut;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});  

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem", {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .2,
        delay: -1
    })
    .from("#heroFooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay: -1
    })
}


function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

function circleChaptaKaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove", function(dets){
        
        clearTimeout(timeOut);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(0.65, 1.3, xdiff);
        yscale = gsap.utils.clamp(0.65, 1.3, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeOut = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);

    });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// teeno elements ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove
// ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki 
// x and y positions pata karo, abh uss mouse ki x and y positions k badle uss image ko show karo
// and uss image ko show karo, move karte waqt rotate karo, and jaise jaise mouse tez chale 
//waise waise rotation bhi tez ho jaye.

document.querySelectorAll(".elem").forEach(function(elem){
    
    var rotate = 0;
    var diffrot = 0;
    
    elem.addEventListener("mouseleave", function(dets){

        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });

    elem.addEventListener("mousemove", function(dets){

        var diff = dets.clientY - elem.getBoundingClientRect().top;
        
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot*0.5)
        });
    });
});

