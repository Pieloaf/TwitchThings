var block = document.getElementById("image");
var gif = document.createElement("img");
var text = document.createElement("h1");
var sound = document.createElement("audio");
var gifz = JSON.parse(gifs)[0];

ComfyJS.onCommand = (user, command, message, flags, self, extra) => {
  if (flags.broadcaster && command === "reload") {
    location.reload();
  } else if (flags.vip || flags.mod || flags.broadcaster) {
    Object.keys(gifz).forEach((element) => {
      let a = Object.keys(gifz).indexOf(element);
      if (command === element) {
        cmd = element;
        idxCmd = a;
      }
    });
    displayGif(cmd, Object.values(gifz)[idxCmd].text);
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  let cmd;
  let idxCmd;
  if (flags.customReward) {
    Object.keys(gifz).forEach((element) => {
      let a = Object.keys(gifz).indexOf(element);
      if (extra.customRewardId === Object.values(gifz)[a].Id) {
        cmd = element;
        idxCmd = a;
        displayGif(cmd, Object.values(gifz)[idxCmd].text);
        return;
      }
    });
  }
};

displayGif = function (name, btext) {
  console.log(name);
  gif.src = `./${name}.gif`;
  sound.src = `./${name}.mp3`;
  sound.autoplay = true;
  text.innerHTML = btext;
  block.appendChild(gif);
  block.appendChild(text);
};

sound.onended = function () {
  block.removeChild(gif);
  block.removeChild(text);
};

ComfyJS.Init("Pieloaf");
