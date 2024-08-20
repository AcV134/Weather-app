
let latitude;
let longitude;

let svg_icons = {
    0: 'sun.svg',
    1: 'sun.svg',
    2: "cloud-sun.svg",
    3: "cloud.svg",
    45: "fog.svg",
    48: "fog.svg",
    51: "cloud-sun-rain.svg",
    53: "cloud-sun-rain.svg",
    55: "cloud-sun-rain.svg",
    56: "rain.svg",
    57: "rain.svg",
    61: "cloud-sun-rain.svg",
    63: "rain.svg",
    65: "rain-heavy.svg",
    66: "rain.svg",
    67: "rain.svg",
    71: "snow.svg",
    73: "snow.svg",
    75: "snow.svg",
    77: "snow.svg",
    80: "cloud-sun-rain.svg",
    81: "rain.svg",
    82: "rain-heavy.svg",
    85: "snow.svg",
    86: "snow.svg",
    95: "cloud-bold.svg",
    96: "cloud-bold.svg",
    99: "cloud-bold.svg",
}

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
