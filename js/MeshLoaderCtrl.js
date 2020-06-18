var Packs_P, Nuts_P, AvocadoAnim, LemonAnim
var hdrTextureCity, hdrSkyboxMaterial, hdrSkybox,  CityEnvTask
let PacksList = []
let LemonList = []  
let AnimsList = []
let PackColls = []

function LoadAssets(scene, assetsManager, page) {


    //CanyonEnvTask
    CityEnvTask = assetsManager.addCubeTextureTask("CityEnvTask", "./assets/environment.dds");

    CityEnvTask.onSuccess = function (task) {
        hdrTextureCity = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTextureCity.rotationY = 120 * (Math.PI / 180);
        hdrTextureCity.level = 1.5

        hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTextureCity.clone();
        hdrSkyboxMaterial.reflectionTexture.level = 0.1
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = false;
        // Create Skybox
        hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    CityEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    Packs_P = new BABYLON.TransformNode("Packs_P");
    HumLoaderTask = assetsManager.addMeshTask("", "", "./assets/" + page + ".glb")

    HumLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 2
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].rotationQuaternion = null;
        task.loadedMeshes[0].rotation.y = -90 * (Math.PI / 180)
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(1,1, 1)
        task.loadedMeshes[0].parent = Packs_P

        let j =0
        task.loadedMeshes[0]._children[0].getChildTransformNodes(true).forEach(elem => {
            elem.rotationQuaternion = null;
            PacksList.push(elem);
            //colliders
            var packColl = new BABYLON.MeshBuilder.CreateBox("PackCollider" + j.toString(), { height: 1.4, width:0.6, depth: 0.7 }, scene)
            packColl.material = colMat
            packColl.setParent(elem);
            packColl.position = new BABYLON.Vector3(0,0.7,0);
            packColl.isPickable = true;
            PackColls.push(packColl)
            j++
        });
        
        //custom animations

    }

    HumLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //Custom animations
    if(page == 'Produkt 7'){
        Nuts_P = new BABYLON.TransformNode("Nuts_P");

        NutsLoaderTask = assetsManager.addMeshTask("", "", "./assets/Nuts animation.glb")
    
        NutsLoaderTask.onSuccess = function (task) {
    
            task.loadedMeshes[0].position.x = 2
            task.loadedMeshes[0].position.y = -0.06
            task.loadedMeshes[0].position.z = 0
            task.loadedMeshes[0].rotationQuaternion = null;
            task.loadedMeshes[0].rotation.y = 0 * (Math.PI / 180)
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(1,1, 1)
            task.loadedMeshes[0].parent = Nuts_P
            Nuts_P.position.x = 0.1
            NutsAnim = task.loadedAnimationGroups[0]
            NutsAnim.stop()
            console.log(NutsAnim)
    
        }
    
        NutsLoaderTask.onError = function (task, message, exception) {
            console.log(message, exception);
        }
    }


    else if(page == 'Produkt 1'){
        Avocado_P = new BABYLON.TransformNode("Avocado_P");

        AvocadoTask = assetsManager.addMeshTask("", "", "./assets/avocado.glb")
    
        AvocadoTask.onSuccess = function (task) {
    
            task.loadedMeshes[0].position.x = 1.5
            task.loadedMeshes[0].position.y = -0.06
            task.loadedMeshes[0].position.z = 1.2
            task.loadedMeshes[0].rotationQuaternion = null;
            task.loadedMeshes[0].rotation.y = 120 * (Math.PI / 180)
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(10,10, 10)
            task.loadedMeshes[0].parent = Avocado_P
            AvocadoAnim = task.loadedAnimationGroups[0]
            AvocadoAnim.stop()
            Avocado_P.setEnabled(false)
            console.log(AvocadoAnim)
    
        }
    
        AvocadoTask.onError = function (task, message, exception) {
            console.log(message, exception);
        }
    }
    else if(page == 'Produkt 5'){
        Lemon_P = new BABYLON.TransformNode("Lemon_P");

        LemonTask = assetsManager.addMeshTask("", "", "./assets/lemon.glb")
    
        LemonTask.onSuccess = function (task) {
    
            task.loadedMeshes[0].position.x = 1.5
            task.loadedMeshes[0].position.y = -0.06
            task.loadedMeshes[0].position.z = 1.5
            task.loadedMeshes[0].rotationQuaternion = null;
            task.loadedMeshes[0].rotation.y = 90 * (Math.PI / 180)
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(7,7, 7)
            task.loadedMeshes[0].parent = Lemon_P

            LemonAnim = task.loadedAnimationGroups[0]
            LemonAnim.stop()
            Lemon_P.setEnabled(false)
    
        }
    
        LemonTask.onError = function (task, message, exception) {
            console.log(message, exception);
        }
    }





    //FINISH
    assetsManager.onFinish = function (task) {
        ChangeMaterialProperties()
        EditMeshesPSR()
        AnimateReveal()
        CreateSprayPS()

    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

