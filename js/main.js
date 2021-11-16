// visual letter motion
const letter1 = $("#visual .inner >h1");
const letter2 = $("#visual .inner >h2");

letterMotion(letter1, 0.1);
letterMotion(letter2, 0.2);


function letterMotion(item, delay){
    let txt = item.text().split("");
    let bg = $(item).css("color");
    let num = 0;
    $(item).empty();

    $(txt).each(function(_, data){
        $(item).append(
            $("<span>").text(data).css({transitionDelay: delay * num +"s"})
        )
        num++;
    });

    $(item).append(
        $("<p>").css({
            position: "absolute",
            background: bg,
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        })
    );

    item.find("p").animate({left: "100%"}, speed, function(){
        $(this).remove();
    });
    item.find("span").css({opacity: 1});
}


// visual tab button
const $wrap = $("#visual .wrapbox >.wrap");
const $section = $("#visual .wrapbox section");
const $front = $("#visual .front");
const $back = $("#visual .back");
const $btns = $("#visual .filter li");
let i=0;

let timer = setInterval(rotate, 3000);

$btns.on("click", function(e){
    e.preventDefault();
    let isActive = $(this).children("a").hasClass("on");
    i = $(this).index() - 1;

    if(isActive) return;
    if(enableClick){
        enableClick = false;

        clearInterval(timer);

        $btns.children("a").removeClass("on");
        $(this).children("a").addClass("on");
    
        $section.addClass("on");
        $wrap.fadeOut();
        $wrap.eq(i).fadeIn(0, function(){
            enableClick = true;
        });
    }
});

$section.on("mouseenter", function(){
    clearInterval(timer);
    $section.addClass("on");
});

$section.on("mouseleave", function(){
    timer = setInterval(function(){
        rotate();
    }, 3000);
});

function rotate(){
    (i >= 2) ? i = 0 : i++;
    $section.addClass("on");
    setTimeout(function(){
        $section.removeClass("on");
    }, 2000);
    setTimeout(function(){
        $wrap.fadeOut(500);
        $btns.children("a").removeClass("on");
        $wrap.eq(i).fadeIn();
        $btns.eq(i + 1).children("a").addClass("on");
    }, 2500);
}


//visual detail page
const $detail = $(".detail");
const $btnClose = $detail.find(".close");
const $img = $wrap.find("img");
const $detail_img = $detail.find(".pic");
const imgPos = [
    {
        width: "250px",
        height: "280px",
        left: "20%",
        bottom: "30px"
    },
    {
        width: "250px",
        height: "280px",
        left: "40%",
        bottom: "30px"
    },
    {
        width: "250px",
        height: "280px",
        left: "60%",
        bottom: "30px"
    },
]
let posIndex;

$img.on("click", function(e){
    e.preventDefault();
    let imgSrc = $(this).attr("src");
    let imgAlt = $(this).attr("alt");
    let itemIndex = $(this).closest("section").index();
    let boxIndex = $(this).closest("article").parent("section").parent(".wrap").index();
    posIndex = itemIndex;

    let tit1 = $wrap.eq(boxIndex).find("section").eq(itemIndex).find("h2").text();
    let tit2 = $wrap.eq(boxIndex).find("section").eq(itemIndex).find("li").text();
    let desc = $wrap.eq(boxIndex).find("section").eq(itemIndex).find(".wrap p").text();

    clearInterval(timer);

    $detail_img.css(imgPos[posIndex]);
    setTimeout(function(){
        $detail_img.css({
            width: "40vw",
            height: "100%",
            left: "10vw",
            bottom: 0
        })
    }, 100);
    $detail_img.find("img").attr({src: imgSrc, alt: imgAlt});
    $detail.find(".thumb img").attr({src: imgSrc, alt: imgAlt});
    $detail.find(".con >h1").text(tit1);
    $detail.find(".con >h2").text(tit2);
    $detail.find(".con p").text(desc);

    $detail.fadeIn(0);
    $detail.addClass("on");
});

$btnClose.on("click", function(e){
    e.preventDefault();
    
    $detail_img.css(imgPos[posIndex]);
    $detail.removeClass("on");
    $detail.fadeOut(1000);
});

// detail page date
const $date = $detail.find(".date");
const date = new Date();
const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$date.find("h1").text(date.getDate());
$date.find("h2").text(day[date.getDay()]);
$date.find("h3").text(month[date.getMonth()]);