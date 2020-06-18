var lightLinks, lightRechts, spotLightL, spotLightR, godrays
function CreateLighting() {
    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-1, -0.25, -1), scene);
    lightLinks.position = new BABYLON.Vector3(0, 2, -1);
    lightLinks.intensity = 2
    //lightLinks.shadowMinZ = -13

    lightRechts = new BABYLON.DirectionalLight("lightRechts", new BABYLON.Vector3(-1, -0.25, 1), scene);
    lightRechts.position = new BABYLON.Vector3(0, 2, 1);
    lightRechts.intensity = 1

}

let LightMesh
function EditMeshesPSR() {
    //scene.getMeshByName("BackgroundPlane").position.y=-1.5
    scene.meshes.forEach(mesh => {
        //console.log(mesh.name)
        if (mesh.name == "BackgroundPlane") {
            mesh.position.y = -1.5
        }
    });
}

function AddShadows() {
    var groundShadow = BABYLON.Mesh.CreatePlane('groundShadow', 95, scene)
    groundShadow.rotation.x = Math.PI / 2
    groundShadow.position.y = 0.01
    groundShadow.material = new BABYLON.ShadowOnlyMaterial('shadowOnly', scene)
    groundShadow.material.alpha = 0.2
    groundShadow.receiveShadows = true

    var generator = new BABYLON.ShadowGenerator(4096 / 8, lightLinks);
    generator.setTransparencyShadow(true);
    generator.filter = 100

    for (var i = 0; i < scene.meshes.length; i++) {
        if (scene.meshes[i].name == "Car03_CollisionMesh") {
            generator.addShadowCaster(scene.meshes[i]);

        }
        else if (scene.meshes[i].name == "walls") {
            scene.meshes[i].receiveShadows = true;
        }

    }

}

function AddGlow() {
    // Add lights to the scene
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity = 0;
    scene.meshes.forEach(elem => {
        if (elem.name.startsWith("Screen_") || elem.name == "Video_Screens") {
            //gl.addExcludedMesh(elem)
        }
    });

}


function CreateMainCamera(){
    var camera = new BABYLON.ArcRotateCamera("Camera", 0 * (Math.PI / 180), 90 * (Math.PI / 180), 7, new BABYLON.Vector3(0, 1.5, 0), scene);
    camera.minZ = 1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 4
    camera.upperRadiusLimit = 10
    camera.upperBetaLimit = 90 * (Math.PI / 180)
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    return camera
}

function SetEnvMood(scene){
    scene.clearColor = new BABYLON.Color4(0, 0, 0,0);
    
    scene.ambientColor = new BABYLON.Color4(1, 1, 1,0);
    
    BGDefault = scene.createDefaultEnvironment({
        groundColor: new BABYLON.Color4(1, 1, 1,0),
        skyboxColor: new BABYLON.Color4(1, 1, 1,0)

    });

    BGDefault.skybox.setEnabled(false)
    BGDefault.rootMesh.position.y = -0.05

    
}



