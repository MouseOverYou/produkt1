var Packs_P
var hdrTextureCity, hdrSkyboxMaterial, hdrSkybox,  CityEnvTask
let PacksList = [] 
let AnimsList = []
let PackColls = []

function LoadAssets(scene, assetsManager) {


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
    HumLoaderTask = assetsManager.addMeshTask("", "", "./assets/Produkt 1.glb")

    HumLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].rotationQuaternion = null;
        task.loadedMeshes[0].rotation.y = -90 * (Math.PI / 180)
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(1,1, 1)
        task.loadedMeshes[0].parent = Packs_P

        /*
        task.loadedMeshes[0]._children[1].getChildTransformNodes(true).forEach(elem => {
            AnimsList.push(elem);
            elem.setEnabled(false)
        });
        */

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
                
        //move anims
        //task.loadedMeshes[0]._children[1].position.z = 1.75
        //task.loadedMeshes[0]._children[1].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5)

    }

    HumLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    //FINISH
    assetsManager.onFinish = function (task) {
        //CreateSwooshHolder()
        ChangeMaterialProperties()
        EditMeshesPSR()
        AnimateReveal()
        //triggerSwooshUp()
        //AddGlow()

    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

