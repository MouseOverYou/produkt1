
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

var waxDeckeAnim = gsap.timeline({paused: true}) 
function BufferDeckeWaxAnim(){
    waxDeckeAnim.fromTo(WaxDecke._children[0].rotation, {y: 0 * (Math.PI / 180)}, { y: 180 * (Math.PI / 180), duration: 2 });
    waxDeckeAnim.fromTo(WaxDecke.rotation, {z: 0}, { z: 80 * (Math.PI / 180), ease: "power2.out", duration: 1 }, '<0.75');
    waxDeckeAnim.fromTo(WaxDecke.rotation, {y: 90 * (Math.PI / 180)}, { y: 80 * (Math.PI / 180), ease: "power2.out", duration: 1 }, '<'); 
}

var avocadoRevealAnim = gsap.timeline({paused: true}) 
function BufferAvocadoReveal(){
    avocadoRevealAnim.from(Avocado_P.scaling, {x: 0, y: 0, z: 0 ,ease: "back.out(1.7)", duration: 1 });
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

var ps;
function CreateSprayPS() {
    swoosh_P = new BABYLON.TransformNode('swoosh_P', scene)

    swooshHolder = BABYLON.Mesh.CreateBox("swooshHolder", 0.1, scene);
    swooshHolder.isVisible = false
    swooshHolder.position.x = 2.25
    swooshHolder.position.y = 2.125
    swooshHolder.position.z = 0
    swooshHolder.parent = swoosh_P


    swooshMatPH = new BABYLON.PBRMaterial('swooshMatPH', scene)
    swooshMatPH.albedoColor = new BABYLON.Color3.FromHexString("#000000")

    swooshHolder.material = swooshMatPH

    // Create a particle system
    ps = new BABYLON.ParticleSystem("ps", 10000, scene);

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
    //ps.start();
}

var swooshAnim = gsap.timeline({ paused: true })
function triggerSwooshUp() {
    swooshAnim.fromTo(swoosh_P.rotation, { y: 0 }, { y: 360 * (Math.PI / 180), duration: 3 })
    swooshAnim.fromTo(swoosh_P.position, { y: 0 }, { y: 2, duration: 3 }, "<")
}

//Custom Animations
var PlayNuts = async function () {
    NutsMaterial.alpha = 1
    await StartNutsAnim();
}

function StartNutsAnim(){
    NutsAnim.start(false, 1, 0.5, 6.25)
}

function StartIngAnim(page){
    if(page == 'Produkt 1'){
        avocadoRevealAnim.play()
        window.setTimeout(()=>{
            AvocadoAnim.play(false)
        }, 500)


    }
    else if(page == 'Produkt 7'){
        PlayNuts()
    }
    else if(page == 'Produkt 5'){
        Lemon_P.setEnabled(true)
        LemonAnim.play()
    }
}

var openWax = false
function StartPackReaction(page){
    if(page == 'Produkt 1'){
        console.log('do nothing')
    }
    else if(page == 'Produkt 7'){
        waxDeckeAnim.paused(false)
        waxDeckeAnim.reversed(openWax)
        openWax = !openWax
        
    }
    else if(page == 'Produkt 5'){
        console.log('do spray')
        ps.start()
        window.setTimeout(()=>{
            ps.stop()
        }, 1000)
    }
}
