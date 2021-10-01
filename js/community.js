// community tab메뉴
const $tabBtns = $(".community .inner .tabmenu li a");
const $tabBoxs = $(".community .inner>div");

$tabBtns.on("click focus", function(e){
    e.preventDefault();

    let target = $(this).attr("href");
    let isOn = $(this).hasClass("on");
    if (isOn) return;

    $tabBtns.removeClass("on");
    $(this).addClass("on");

    $tabBoxs.hide();
    $(target).show();
});

// community QnAbox 토글 설정
const $qbox = $("#faq .qna dt");
const $abox = $("#faq .qna dd");

$qbox.on("click", function(e){
    e.preventDefault();

    let i = $(this).index();
    let isOn = $(this).hasClass("on");
    
    if (isOn) {
        $(this).removeClass("on");
        $(this).next().slideUp();
    } else{
        activeBtn($qbox, i/2);
        $abox.slideUp();
        $(this).next().slideDown(500);
    }
});