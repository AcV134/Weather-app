
let latitude;
let longitude;

$("#location").on("input", async function(event) {
    try{
        const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${event.target.value}&count=10&language=en&format=json`);
        const location = (result.data).results;
        $("#options").empty();
        location.forEach(function(location){
            $("#options").append(`
                <div class="option" value="${location.latitude} ${location.longitude}">
                <div class="name">${location.name}</div>
                <div class="country">${location.country}</div>
                </div>
                `);
        });
    }catch(error){
        console.error(error);
    }
    console.log(event.target.value);
});


$(document).on('click','.option',(e)=>{
    const content = e.target.closest('.option');
    let values = content.getAttribute("value").split(" ");
    $("#latitude").val(values[0]);
    $("#longitude").val(values[1]);
    $("#location").val($(content).children('.name')[0].innerHTML);
    $("#options").empty();
})

$('.dailyClick').on('click',(e)=>{
    console.log($(e.target).index());
    let index = $(e.target).index();
    let container = ($('.hour-container').children())[index];
    if($(container).hasClass('on')){
        $(container).removeClass('on');
    }
    else{
        $('.hour').siblings().removeClass('on');
        $(container).addClass('on');
    }
});
