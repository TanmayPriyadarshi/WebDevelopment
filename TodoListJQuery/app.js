
$('.todo__header').on('click', 'img',function (e) {
   $('.todo__header').children('input').toggleClass('visibility');
})

$('#todoElementText').on('keypress',function (e) {
    console.log(e.which);
    if(e.which == 13){
        let inputVal = $(this).val();
        console.log(inputVal);
        $(this).val("");
        const todo = `<li><img src="delicon.svg" alt=""><strong>${inputVal}</strong></li>`;
        $('.todo__body').append(todo);
    }
})

$('.todo__body').on('click','strong', function (e) {
    $(this).parent().toggleClass('completed');
})

$('.todo__body').on('click','img',function (e){
    $(this).parent().remove();
})