console.log("loading auio");

const videoEl = document.querySelector("#video")


let audioStream = null;
const getAudio = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video:  { width: 500, height: 400 }, audio: true }).then(
        stream =>{
            videoEl.srcObject = stream;
            audioStream = stream;
        }
    );
  }
};

getAudio()
setTimeout(()=>{

    console.log(audioStream)
},5000)