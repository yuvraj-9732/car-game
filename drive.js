AFRAME.registerComponent('drive', {
    init: function () {
        var gameStateVal = this.el.getAttribute("game")
        if(gameStateVal=="play"){
            this.driveCar()
        }
    },
    driveCar : function() {
        var multiply = 10
        var wheelRot = 0
        window.addEventListener("keydown",function(e){
// steering wheel control
            var wheel = document.querySelector("#control-wheel")
            if(e.code=="ArrowRight" && wheelRot>-40){
                wheelRot-=5
                wheel.setAttribute("rotation",{x:0,y:0,z:wheelRot})
            }
            if(e.code=="ArrowLeft" && wheelRot<40){
                wheelRot+=5
                wheel.setAttribute("rotation",{x:0,y:0,z:wheelRot})
            }
            var cameraRig =document.querySelector("#camera-rig")
            var cameraRot = cameraRig.getAttribute("rotation")
            var cameraPos = cameraRig.getAttribute("position")
            var cameraMovCon = cameraRig.getAttribute("movement-controls")
            console.log(cameraMovCon.speed)
            cameraRig.setAttribute("movement-controls",{"speed":cameraMovCon.speed+0.005})
            console.log(cameraMovCon.speed)
            var cameraDir = new THREE.Vector3()
            cameraRig.object3D.getWorldDirection(cameraDir)
            if(e.code=="ArrowRight"){
                cameraRot.y-=5
                cameraRig.setAttribute("rotation",{x:0,y:cameraRot.y,z:0})
                cameraRig.setAttribute("movement-controls",{"speed":cameraMovCon.speed+0.005})
            }
            if(e.code=="ArrowLeft"){
                cameraRot.y+=5
                cameraRig.setAttribute("rotation",{x:0,y:cameraRot.y,z:0})
                cameraRig.setAttribute("movement-controls",{"speed":cameraMovCon.speed+0.005})
            }
// Speed and accel Uparrow
            if(e.code=="ArrowUp"){
                multiply+=0.5
                if(multiply<=100 && cameraPos.z>-500){
                    cameraRig.setAttribute("movement-controls",{"speed":cameraMovCon.speed+0.005})
                    var carAcce = document.querySelector("#control-acce")
                    carAcce.setAttribute("material","color","green")
                    var carSpeed =document.querySelector("#speed")
                    carSpeed.setAttribute("text",{value:multiply})
                }
            }
            if(e.code=="Space"){
                cameraRig.setAttribute("movement-controls",{"speed":0})
                var carBr = document.querySelector("#control-brake")
                carBr.setAttribute("material","color","red")
            }

        })
//keyup events
        window.addEventListener("keyup",function(e){
            var cameraRig =document.querySelector("#camera-rig")
            var cameraDir = new THREE.Vector3()
            cameraRig.object3D.getWorldDirection(cameraDir)
            var cameraMovCon=cameraRig.getAttribute("movement-controls")
            if(e.code=="Space"){
                var carBr = document.querySelector("#control-brake")
                carBr.setAttribute("material","color","grey")
            }
            if(e.code=="ArrowUp"){
                if(multiply>10){
                    multiply-=0.5
                    cameraRig.setAttribute("movement-controls",{"speed":cameraMovCon.speed+0.005})
                    var carAcce = document.querySelector("#control-acce")
                    carAcce.setAttribute("material","color","grey")
                }
            }
        })
    }
});
