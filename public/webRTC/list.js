const socket = io.connect(window.location.origin);

socket.on("broadcaster", (payload) => {
  console.log(payload);
  console.log("id", payload.songId, "usrname", payload.userName);
  const singer = document.createElement("a");
  console.log("element");
  singer.href = "/songs/watch/" + payload.songId;
  console.log("href");
  singer.innerText = payload.userName;
  singer.classList = "linkList";
  document.querySelector(".singersContainer").appendChild(singer);
});
