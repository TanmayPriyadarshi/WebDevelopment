let inputValue;
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
$('input').on('keypress', function (e) {
    console.log(e);
    if(e.which == 13){
        inputValue = $(this).val();
        console.log(inputValue);
        apiCallerFunction();
    }
})

function apiCallerFunction(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=fac7c842dcf119926f587fe7f7c5de71`)
    .then(data =>{
        console.log(data);
        console.log(typeof data);
        if(data.status ==200){
        return data.json();
        }
        else{
            throw data.statusText;
        }
    })
    .then(parsedData =>{
        console.log(parsedData);
        let outputCity;
        outputCity = parsedData.name + ', ' + parsedData.sys.country;
        console.log(outputCity);
        $('strong').text(outputCity);
        $('h5').text(days[d.getDay()]+" "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear())
        $('h1').text(Math.round(parsedData.main.temp-273.15)+"°C");
        $('i').text(parsedData.weather[0].main);
        $('h4').text(Math.round(parsedData.main.temp_min-273.15)+"°C / "+Math.round(parsedData.main.temp_max-273.15)+"°C");
    })
    .catch(err =>{
        console.log(err);
    })
}