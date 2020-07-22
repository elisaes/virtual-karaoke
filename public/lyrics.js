const audio = document.getElementById("myAudio");
const lyrics = document.querySelector(".hiddenLrc").innerHTML;

const lrc = new Lyricer({
  showLines: 1,
  clickable: false,
});

lrc.setLrc(lyrics);

audio.addEventListener("timeupdate", function () {
  lrc.move(audio.currentTime);
});
