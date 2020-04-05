//to establish xml connection
function loadXMLDoc(page, Id) {
console.log("testing: establish XML conection");
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200){
        if (page == 1){
            displayImage(this); //open photo gallery page
        } else{
            displayJourneyByID(this,Id); //open display journey page
        }
    }
};
xmlhttp.open("GET", "/xml/journey.xml", false);
xmlhttp.send();
}
//To generate photo link format
function generatePhotoFormat(imageurl, title, id) {
    var imgId = "id=" + id;
    var aTag = "<a href='/html/displayJourney.html'><img src='";
    var altTag = "'" + imgId + " alt='";
    var closeTag = "'></a>";
    console.log("testing: " + aTag + imageurl.trim() + altTag + title.trim() + closeTag);
    return (aTag + imageurl.trim() + altTag + title.trim() + closeTag);
}
//show photo for photo gallery
function displayImage(xmlhttp){
    var xmlDoc = xmlhttp.responseXMl;
    console.log("testing xmldoc from showImage()" + xmlDoc);
    var journeyList = xmlDoc.getElementByTagName("journey");
    console.log("testing x" + journeyList);
    var div = "";
    for (i=0; i<journeyList.length; i++){
        var journeyId = journeyList[i].getElementByTagName("id")[0].childNodes[0].nodeValue;
        var imageurl = journeyList[i].getElementByTagName("imageurl")[0].childNodes[0].nodeValue;
        var title = journeyList[i].getElementByTagName("title")[0].childNodes[0].nodeValue;

        //invoke method generate phtot link
        var image = generatePhotoFormat(imageurl, title, journeyId);

        //create html elements to used for display xml data
        var img = image;
        var divDesc = "<div class='desc'>" +title + "</div>";
        div += img + divDesc + "<br>";
    }
    //display the loaded xml data into coresspnding html id : gallery
    document.getElementById("gallery").innerHTML = div;
}

//show journey according to the selected image
function displayJourneyByID(xmlhttp, Id){//id
var xmlDoc = xmlhttp.responseXMl;
console.log("testing xmldoc" + xmlDoc);
x = xmlDoc.getElementByTagName("journey");
console.log("testing x value" + x);
if (Id == null){
    id =1;
}
var imageurl = x[Id].getElementByTagName("imageurl")[0].childNodes[0].nodeValue;
var title = x[Id].getElementByTagName("title")[0].childNodes[0].nodeValue;

//invoke method generate phtot link
var image = generatePhotoFormat(imageurl, title);
var date = x[Id].getElementByTagName("datetime")[0].childNodes[0].nodeValue;
var city = x[Id].getElementByTagName("city")[0].childNodes[0].nodeValue;
var journeyId = x[Id].getElementByTagName("id")[0].childNodes[0].nodeValue;
var bloger = x[Id].getElementByTagName("bloger")[0].childNodes[0].nodeValue;
var detail = x[Id].getElementByTagName("detail")[0].childNodes[0].nodeValue;
console.log("testing data" + date + city + id + bloger + title + image + detail);

//load information from xml into corresponding html ids
document.getElementById("imageurl").innerHTML = image;
document.getElementById("title").innerHTML = title;
document.getElementById("city").innerHTML = city;
document.getElementById("id").innerHTML = journeyId;
document.getElementById("bloger").innerHTML = bloger;
document.getElementById("datetime").innerHTML = setDateFormat(date); //call setDateFormat()
document.getElementById("detail").innerHTML = detail;
}

//convert date string into date format.
function setDateFormat(dateV){
    console.log("this is the current date" + dateV);
    return new Date(dateV).toLocaleString();
}
//show current date at footer section
function showCurrentdate(){
    var date = new Date().toLocaleDateString;
    return (date);
}
