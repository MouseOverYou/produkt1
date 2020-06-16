
var RevealAnim = gsap.timeline({ paused: true });

var startPos = []
var SmallBottle = new BABYLON.Vector3(0.1, 0.1, 0.1);
var BigBottle = new BABYLON.Vector3(0.15, 0.15, 0.15);

function BringPacksBehind() {

    var c = 0

    for (let bottle of PacksList) {

        //save Start Position
        startPos.push(bottle.position)

        //bring bottles behind daily
        if (c == 3) {
            //console.log("");
        }
        else {
            bottle.position = new BABYLON.Vector3(0, 0, 0.02);
            bottle.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);
            if (c == 0 || c == 1 || c == 2)
                bottle.rotation.y = 180 * (Math.PI / 180)

            else
                bottle.rotation.y = -180 * (Math.PI / 180)
        }
        c++
    }

}


function BufferStartAnim() {
    for (let i = 0; i < PacksList.length; i++) {
        if (i == 3) {
            //Do Nothing
        }
        else if (i == 0 || i == 6) {
            AddOneReveal(i, "0")
        }
        else if (i == 1 || i == 5) {
            AddOneReveal(i, "0.4")
        }
        else if (i == 2 || i == 4) {
            AddOneReveal(i, "0.8")
        }
    }
}

function AddOneReveal(i, delay) {
    RevealAnim.to(PacksList[i].position, { x: startPos[i].x, y: startPos[i].y, z: startPos[i].z, ease: "power2.out", duration: 2 }, delay);
    RevealAnim.to(PacksList[i].rotation, { y: 0, ease: "power4.out", duration: 1.9 }, "<0.1");
    RevealAnim.to(PacksList[i].scaling, { x: 1, y: 1, z: 1, ease: "power4.out", duration: 1.9 }, "<");
}

function RevealRange() {
    window.setTimeout(() => {
        RevealAnim.restart()
    }, 1000)
}

var AnimateReveal = async function () {
    BringPacksBehind()
    await BufferStartAnim();
    await RevealRange();
}
function ResetRangePos() {
    var c = 0
    for (let elem of PacksList) {
        elem.position.x = startPos[c]
        c++
    }

}

//Change Focus PAck

var lastPack
var ChangeTime = 2
var isAnimating = false

function ChangeFocusPack(i) {
    isAnimating = true
    console.log("pack anim start")

    //first time
    if (lastPack == undefined) {
        lastPack = PacksList[3]
    }

    var backPos = PacksList[i].position
    var ChangePackAnim = gsap.timeline({ onComplete: EndAnimation });
    //Bring PAck back
    ChangePackAnim.to(lastPack.position, { z: backPos.z, ease: "back.inOut(4)", duration: ChangeTime });
    ChangePackAnim.to(lastPack.position, { x: backPos.x, ease: "power4.in", duration: ChangeTime }, "<");
    ChangePackAnim.to(lastPack.scaling, { x: 1, y: 1, z: 1, ease: "power4.in", duration: ChangeTime }, "<");
    //BRing pack to the front
    ChangePackAnim.to(PacksList[i].position, { z: 2, ease: "back.inOut(4)", duration: ChangeTime }, 0);
    ChangePackAnim.to(PacksList[i].position, { x: 0, ease: "power4.in", duration: ChangeTime }, "<");
    ChangePackAnim.to(PacksList[i].scaling, { x: 1.5, y: 1.5, z: 1.5, ease: "power4.in", duration: ChangeTime }, "<");

    //save lastPack
    lastPack = PacksList[i]
}

//play animation

var grafikAnim;
function ShowSelectedAnim(i) {

    //Turn root_node ON
    for (let k = 0; k < AnimsList.length; k++) {
        if (i == k) {
            window.setTimeout(() => {
                AnimsList[k].setEnabled(true)
            }, ChangeTime * 1000)

        }
        else {
            AnimsList[k].setEnabled(false)
        }
    }
    //go to Beginn of Video before start playing
    AnimsList[i].getChildTransformNodes(true).forEach(elem => {
        //play video on texture
        if (elem.name.startsWith("Vid")) {
            elem.getChildMeshes(true)[0].material.opacityTexture.video.currentTime = 0;
            if (elem.getChildMeshes(true)[0].name == "gp0") {
                elem.getChildMeshes(true)[0].material.albedoTexture.video.currentTime = 0;
            }
        }
    })

    window.setTimeout(() => {
        var c = 0
        grafikAnim = gsap.timeline()
        AnimsList[i].getChildTransformNodes(true).forEach(elem => {
            //play video on texture
            if (elem.name.startsWith("Vid")) {
                elem.getChildMeshes(true)[0].material.opacityTexture.video.play();
                if (elem.getChildMeshes(true)[0].name == "gp0") {
                    elem.getChildMeshes(true)[0].material.albedoTexture.video.play();
                }
            }

            //set initial scaling
            elem.scaling = new BABYLON.Vector3(0, 0, 0)

            //animate scaling
            if (c == 0)
                grafikAnim.to(elem.scaling, { x: 1, y: 1, z: 1, ease: "back.out(4)", duration: 0.5 })
            if (c == 1)
                grafikAnim.to(elem.scaling, { x: 1, y: 1, z: 1, delay: 0.6, ease: "back.out(4)", duration: 0.5 }, "<0.2")
            else
                grafikAnim.to(elem.scaling, { x: 1, y: 1, z: 1, ease: "back.out(4)", duration: 0.5 }, "<0.2")


            //play backwards
            window.setTimeout(() => {
                grafikAnim.to(elem.scaling, { x: 0, y: 0, z: 0, ease: "back.inOut(4)", duration: 1.25 }, "<0.1")
            }, 3000)

            c++

        });


    }, ChangeTime * 1000)

    //scale On rest of elements
    //play ANim backwards
    //blend out video

}


function EndAnimation() {
    isAnimating = false
    console.log("grafik anim end")
}

//PARTICLES
var emitterSelection, selectParticles
function CreateParticlesHolder() {
    emitterSelection = BABYLON.Mesh.CreateBox("emitterSelection", 0.1, scene);
    emitterSelection.isVisible = false
    emitterSelection.position.y = 1.4
}
function createWinParticles(selec, pos) {
    emitterSelection.position.x = pos.x - 0.8
    emitterSelection.position.z = pos.z

    selectParticles = new BABYLON.ParticleSystem("rain", 10, scene);
    selectParticles.particleTexture = PartTexts[selec]

    // Particles
    selectParticles.minAngularSpeed = -2;
    selectParticles.maxAngularSpeed = 2;
    selectParticles.minSize = 0.3;
    selectParticles.maxSize = 0.6;
    selectParticles.minLifeTime = 0.5;
    selectParticles.maxLifeTime = 1;
    selectParticles.minEmitPower = 1;
    selectParticles.maxEmitPower = 2;
    selectParticles.emitter = emitterSelection;
    selectParticles.emitRate = 6;
    selectParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    selectParticles.direction1 = new BABYLON.Vector3(-0.5, 0.8, -0.6);
    selectParticles.direction2 = new BABYLON.Vector3(0.5, 0.6, 0.6);
    selectParticles.colorDead = new BABYLON.Color4(1, 1, 1, 0.5)
    selectParticles.gravity = new BABYLON.Vector3(0, -1, 0);
    //selectParticles.disposeOnStop = true
    selectParticles.start()

}

function CreateSwooshHolder() {
    swoosh_P = new BABYLON.TransformNode('swoosh_P', scene)

    swooshHolder = BABYLON.Mesh.CreateBox("swooshHolder", 0.1, scene);
    swooshHolder.isVisible = false
    swooshHolder.position.x = 0.25
    swooshHolder.position.y = 2.125
    swooshHolder.position.z = 0
    swooshHolder.parent = swoosh_P


    swooshMatPH = new BABYLON.PBRMaterial('swooshMatPH', scene)
    swooshMatPH.albedoColor = new BABYLON.Color3.FromHexString("#000000")

    swooshHolder.material = swooshMatPH

    // Create a particle system
    var ps = new BABYLON.ParticleSystem("ps", 10000, scene);

    //Texture of each particle
    ps.particleTexture = new BABYLON.Texture("assets/flare.png", scene);

    // Where the particles come from
   
    ps.minAngularSpeed = -0.5;
    ps.maxAngularSpeed = 0.5;
    ps.minSize = 0.005;
    ps.maxSize = 0.01;
    ps.minLifeTime = 0.5;
    ps.maxLifeTime = 2.0;
    ps.minEmitPower = 0.1;
    ps.maxEmitPower = 0.5;
    ps.emitter = swooshHolder
    var direction1 = new BABYLON.Vector3(1, -1, -1);
    var direction2 = new BABYLON.Vector3(1, 1, 1);
    ps.createDirectedSphereEmitter(0.05, direction1, direction2);
    ps.emitRate = 10000;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE


    ps.color1 = new BABYLON.Color3(197 / 255, 205 / 255, 204 / 255);//nagels rot
    //particleSystem.color1 = new BABYLON.Color3(211/255, 211/255, 211/255);//silver
    ps.color2 = new BABYLON.Color3(81 / 255, 100 / 255, 81 / 255); //light gold
    //particleSystem.color2 = new BABYLON.Color3(218/255, 165/255, 32/255); //hard gold
    ps.gravity = new BABYLON.Vector3(0, 0, 0);
    //velocity at birth
    ps.addVelocityGradient(0, 0.5, 0.8);
    //velocity reached at dead
    ps.addVelocityGradient(1.0, 3, 4);

    // Start the particle system
    ps.start();
}

var swooshAnim = gsap.timeline({ paused: true })

function triggerSwooshUp() {
    swooshAnim.fromTo(swoosh_P.rotation, { y: 0 }, { y: 360 * (Math.PI / 180), duration: 3 })
    swooshAnim.fromTo(swoosh_P.position, { y: 0 }, { y: 2, duration: 3 }, "<")
}