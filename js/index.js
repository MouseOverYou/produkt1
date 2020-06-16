
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var BGDefault
var currentWorld = "turbine"

/******* Add the create scene function ******/
var createScene = function () {

    var scene = new BABYLON.Scene(engine);
    var assetsManager = new BABYLON.AssetsManager(scene)
    CreateCustomMaterials()
    LoadAssets(scene, assetsManager)

    camera = CreateMainCamera()
    SetEnvMood(scene)
    CreateLighting()
    CreateParticlesHolder()
    CreateParticleTextures()
    

    //var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    SetPointerManager(scene)

    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

let UpdateAnimRate = false
let AnimRate = 0
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    }
    /*
    if (UpdateAnimRate) {
        AnimRate += 0.01
        TurnLightsOn(AnimRate)
        console.log(AnimRate)
    }
    */
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});



/*
TO DO:
Mute video streaming: cvurrent fake mute
EXplision reveal pack
change urls
*/