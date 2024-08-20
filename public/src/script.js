
let latitude;
let longitude;

// when input is given in the location field, the following code will run
$(".location").on("input", async function(event) {
    try{
        const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${event.target.value}&count=10&language=en&format=json`);
        const location = (result.data).results;

        // to remove previous options
        $(".options").empty();
        $('.search').removeClass('border');

        // append the result to options
        location.forEach(function(location){
            $($('.click').children(".options")).append(`
                <div class="option" value="${location.latitude} ${location.longitude}">
                <div class="name">${location.name}</div>
                <div class="country">${location.country}</div>
                </div>
                `);
        });

        // if options are present, add border to search-(will remove box-shadow)
        if($($('.click').children(".options")).children().length > 0){
            $($('.click').children(".search")).addClass('border');
        }
    }catch(error){
        console.error(error);
    }
});


// on selecting an option, the following code will run
$(document).on('click','.option',(e)=>{
    const content = e.target.closest('.option');
    let values = content.getAttribute("value").split(" ");
    $(".latitude").val(values[0]);
    $(".longitude").val(values[1]);
    $(".location").val($(content).children('.name')[0].innerHTML);
    $(".options").empty();
    $('.search').removeClass('border');
})

// on selecting a daily time, the correspoding hour results will be displayed
$('.daily-weather').on('click',(e)=>{
    console.log($(e.target).closest('.daily-weather').index());
    let index = $(e.target).closest('.daily-weather').index();
    let container = ($('.hour-container').children())[index];
    console.log(container);
    if($(container).hasClass('on')){
        $(container).removeClass('on');
    }
    else{
        $('.hour').siblings().removeClass('on');
        $(container).addClass('on');
    }
});

// on clicking the search bar, the following code will run
$('.search-bar').on('click',(e)=>{
    $((e.target).closest('.search-bar')).addClass('click');
})

// on clicking outside the search bar, the following code will run-(to remove click if input is empty)
$(document).on('click', function(e) {
    if(!$(e.target).closest('.search-bar')[0]){
        if ($('.location').val() === '') {
            $('.search-bar').removeClass('click');
        }
    }
});

// if location is empty search button will act as part of search bar
$('form').on('submit', function(event) {
    if ($('.location').val() === ''){
        event.preventDefault();
        $(e.target).closest('.search-bar').addClass('click');        
    }
});
