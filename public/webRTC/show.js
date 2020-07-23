const peerConnections = {};
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};

const socket = io.connect(window.location.origin);
const vider = document.querySelector("#video");

const constraints = {
  video: { facingMode: "user" },
  audio: true,
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    video.srcObject = stream;
    socket.emit("broadcaster");
  })
  .catch((error) => console.log(error));

socket.on("watcher", resPayload => {
  const peerConnection = new RTCPeerConnection(config);
  peerConnections[resPayload.id] = peerConnection;
  let stream = video.srcObject;
  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        const payload = {
            id:resPayload.id,
            msg: event.candidate
        }
      socket.emit("candidate", payload);
    }
  };

  peerConnection
    .createOffer()
    .then((sdp) => peerConnection.setLocalDescription(sdp))
    .then(() => {
        const payload = {
            id:resPayload.id,
            msg:peerConnection.localDescription
        }
        console.log(payload)
      socket.emit("offer",payload);
    });

});

socket.on("answer", (payload) => {
    console.log(payload)
  peerConnections[payload.id].setRemoteDescription(payload.msg);
});

socket.on("candidate", (payload) => {
  peerConnections[payload.id].addIceCandidate(new RTCIceCandidate(payload.msg));
});
socket.on("disconectPeer", (payload) => {
  peerConnections[payload.id].close();
  delete peerConnections[payload.id];
});
window.onunload = window.onbeforeunload = () => {
  socket.close();
};
