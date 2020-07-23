let peerConnection;
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};

const socket = io.connect(window.location.origin);
const video = document.querySelector("#video");

socket.on("offer",resPayload => {
  peerConnection = new RTCPeerConnection(config);
  peerConnection
    .setRemoteDescription(resPayload.msg)
    .then(() => peerConnection.createAnswer())
    .then((sdp) => peerConnection.setLocalDescription(sdp))
    .then(() => {
        const payload = {
            id:resPayload.id,
            msg: peerConnection.localDescription
        }
        console.log("answer",payload)
      socket.emit("answer", payload);
    });

  peerConnection.ontrack = (event) => {
    video.srcObject = event.streams[0];
  };
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        const payload = {
            id:resPayload.id,
            msg: event.candidate
        }
      socket.emit("candidate",payload);
    }
  };
});

socket.on("candidate", payload=> {
  peerConnection
    .addIceCandidate(new RTCIceCandidate(payload.msg))
    .catch((error) => console.log(error));
});

socket.on("connect", () => {
  socket.emit("watcher");
});

socket.on("broadcaster", () => {
  socket.emit("watcher");
});

socket.on("disconnectPeer", () => {
  peerConnection.close();
});

window.onunload = window.onbeforeunload = () => {
  socket.close();
};
