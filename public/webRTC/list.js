const socket = io.connect(window.location.origin);
const singer = document.createElement("a");

const updateList = (data)=>{
  singer.href = "/songs/watch/" + data.songId;
  singer.innerText = data.userName;
  singer.classList = "linkList";
  document.querySelector(".singersContainer").appendChild(singer);


}

const removeBroadcaster = ()=>{
 singer.innerHTML = ""
}

socket.on("broadcaster", (data) => {
  updateList(data)

});

socket.on("getBroadcasterInfoReply",(data)=>{
  if (!data.userName){
    console.log("is null broadcaster")
    removeBroadcaster()
  }
  else {
    updateList(data)
  }

})

socket.emit("getBroadcasterInfo");
