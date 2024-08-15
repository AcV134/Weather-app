
let latitude;
let longitude;

$("#location").on("input", async function(event) {
    try{
        const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${event.target.value}&count=10&language=en&format=json`);
        const location = (result.data).results;
        $("#options").empty();
        location.forEach(function(location){
            $("#options").append(`<option value="${location.latitude} ${location.longitude}">${location.name}, ${location.country}</option>`);
        });
    }catch(error){
        console.error(error);
    }
    console.log(event.target.value);
});


$("#options").on('click',(e)=>{
    let values = e.target.value.split(" ");
    latitude = values[0];
    longitude = values[1];
    $("#location").val(e.target.innerHTML);
    $("#options").empty();
})

$("#form").on("submit", async function(event) {
    event.preventDefault(); 
    try{
        const result = await axios.post('/search',{
            latitude: latitude,
            longitude: longitude
        })

        window.location.href = '/';
    }catch(error){
        console.error(error);
    }
});
