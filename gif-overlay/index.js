var block = document.getElementById("image");
var gif = document.createElement("img");
var text = document.createElement("h1");
var sound = document.createElement("audio");
var gifz;

fetch(
  "https://raw.githubusercontent.com/Pieloaf/TwitchThings/master/gif-overlay/gifs.json"
)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (json) {
    gifz = json;
  });

ComfyJS.onCommand = (user, command, message, flags, self, extra) => {
  if (flags.broadcaster && command === "reload") {
    location.reload();
  } else {
    Object.keys(gifz).forEach((element) => {
      let idxCmd = Object.keys(gifz).indexOf(element);
      if (command === element) {
        displayGif(element, Object.values(gifz)[idxCmd].text);
      }
    });
  }
};

displayGif = function (name, btext) {
  console.log(name);
  gif.src = `https://raw.githubusercontent.com/Pieloaf/TwitchThings/master/gif-overlay/assets/${name}.gif`;
  sound.src = `https://raw.githubusercontent.com/Pieloaf/TwitchThings/master/gif-overlay/assets/${name}.mp3`;
  sound.autoplay = true;
  text.innerHTML = btext;
  block.appendChild(gif);
  block.appendChild(text);
};

sound.onended = function () {
  block.removeChild(gif);
  block.removeChild(text);
};

ComfyJS.Init("YOUR-CHANNEL-NAME");
