
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var BGDefault
var page = document.title

/******* Add the create scene function ******/
var createScene = function () {

    var scene = new BABYLON.Scene(engine);
    var assetsManager = new BABYLON.AssetsManager(scene)
    CreateCustomMaterials()
    
    console.log(page)
    LoadAssets(scene, assetsManager, page)

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
    }
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