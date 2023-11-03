AFRAME.registerComponent('game', {
    schema: {
        gameState:{type:"string",default:"play"}
    },
    init:function(){
        var dur = 300 
        var timerEl = document.querySelector("#timer")
        this.startTimer(dur,timerEl)
    },
    startTimer:function(dur,timerEl){
        var min 
        var sec
        setInterval(() => {
            if(dur>=0){
                this.data.gameState = "play"
                min = parseInt(dur/60)
                sec = parseInt(dur%60)
                if(min<10){
                    min = "0"+min
                }
                if(sec<10){
                    sec = "0"+sec
                }
                timerEl.setAttribute("text",{value:min+":"+sec})
                dur-=1

            }else{
                this.data.gameState="over"
                var cameraRig = document.querySelector("#camera-rig")
                cameraRig.setAttribute("velocity",{x:0,y:0,z:0})
                var over = document.querySelector("#over")
                over.setAttribute("visible",true)
                var CarSpeed = document.querySelector("#speed")
                CarSpeed.setAttribute("text",{value:"0"})
            }

        }, 100);
    },

});
