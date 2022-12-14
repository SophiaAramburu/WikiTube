let youtubeVideo = document.getElementById('youtube')
let wikiText = document.getElementById('wikiText')
let searchInput = document.getElementById('searchInput')

if (localStorage.getItem('storedYoutuber') != null) {
  searchInput.value = localStorage.getItem('storedYoutuber')
  searchButton()
}

//Youtube API that takes whats in the search bar and gets the latest youtube video from that Youtube Channel
function searchButton(){
  youtubeVideo.src = ''
  let input = searchInput.value

  localStorage.setItem('storedYoutuber', input)

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f436412025msh0b9dc2279f98629p12bec8jsnd2213f85c072',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  fetch('https://youtube138.p.rapidapi.com/search/?q=' + input + '&hl=en&gl=US', options)
    .then(response => response.json())
    .then(function(data) {
      try {
        let youtubeChannel = data.contents[0].video.author.channelId 
        fetch('https://youtube138.p.rapidapi.com/channel/videos/?id=' + youtubeChannel + '&filter=uploads_latest&hl=en&gl=US', options)
          .then(response => response.json())
          .then(function(data) {
            let videoId = data.contents[0].video.videoId
            youtubeVideo.src = 'https://www.youtube.com/embed/' + videoId
          })
      }
      catch(err) {
        let youtubeChannel = data.contents[0].channel.channelId 
        fetch('https://youtube138.p.rapidapi.com/channel/videos/?id=' + youtubeChannel + '&filter=uploads_latest&hl=en&gl=US', options)
          .then(response => response.json())
          .then(function(data) {
            let videoId = data.contents[0].video.videoId
            youtubeVideo.src = 'https://www.youtube.com/embed/' + videoId
          })
    }
      })




  //Wikipedia API that takes whats in the search bar and gets the wikipedia page for that search
  var url = "https://en.wikipedia.org/w/api.php"; 

  var params = {
      action: "query",
      list: "search",
      srsearch: input,
      format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
      .then(function(response){return response.json();})
      .then (function (data) {
        let pageId = data.query.search[0].pageid
        let name = data.query.search[0].title
        var url = "https://en.wikipedia.org/w/api.php"; 

        var params = {
          action: "query",
          prop: "extracts",
          exsentences: '10',
          exlimit: '1',
          titles: name,
          explaintext: '1',
          format: "json"
          };
        
  //Wikipedia API that takes the Name and pageId and gets the info about the Youtube Channel        
        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        
        fetch(url)
          .then(function(response){return response.json();})
          .then(function(data) {
            wikiText.innerHTML = data.query.pages[pageId].extract
          }
          )})
      }