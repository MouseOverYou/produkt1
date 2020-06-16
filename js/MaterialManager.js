let woodMat, LeuchteMat
let coatMat;

let PartTexts = []
function CreateParticleTextures(){
    var hairParticles = new BABYLON.Texture("./assets/ParticleTextures/hair heart 3.png", scene)
    PartTexts.push(hairParticles)
    var collParticles = new BABYLON.Texture("./assets/ParticleTextures/coll spot.png", scene)
    PartTexts.push(collParticles)
    var omgParticles = new BABYLON.Texture("./assets/ParticleTextures/omg spot 1.png", scene)
    PartTexts.push(omgParticles)
    var dailyParticles = new BABYLON.Texture("./assets/ParticleTextures/daily spot.png", scene)
    PartTexts.push(dailyParticles)
    var flatterParticles = new BABYLON.Texture("./assets/ParticleTextures/flatter blume gruen 3.png", scene)
    PartTexts.push(flatterParticles)
    var redParticles = new BABYLON.Texture("./assets/ParticleTextures/red spot.png", scene)
    PartTexts.push(redParticles)
    var glowParticles = new BABYLON.Texture("./assets/ParticleTextures/glow heart 2.png", scene)
    PartTexts.push(glowParticles)

}

function ChangeMaterialProperties() {

    var white = new BABYLON.Color3.FromHexString("#FFFFFF");
    var black = new BABYLON.Color3.FromHexString("#000000");

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial") {
            continue;
        }
        mat.reflectionTexture = hdrTextureCity;


        if (mat.name == "Floor Gel AO") {
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
        }
        else if(mat.name == "Floor Spray AO"){
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
            
        }
        else if(mat.name == "Floor Wax AO"){
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
            
        }
        else if(mat.name =="Glas 001"){
            mat.alpha = 0.4
            mat.albedoColor = white 
            mat.roughness = 0;
            mat.metallic = 0.6
        }
        else if(mat.name == '2_Gel_chamlon_Lable') {
            mat.metallic = 1;
            mat.metallicF0Factor = 0.1
            mat.roughness = 1

        }
        else if(mat.name == '3_Gel_chamlon_Lable') {
            mat.metallic = 0.3;
            mat.metallicF0Factor = 0.1
            mat.roughness = 0.25
        }
        else if(mat.name == '1_Gel_chamlon_Lable') {
            mat.metallic = 0.3;
            mat.metallicF0Factor = 0.1
            mat.roughness = 0.25

        }
        

    }


}


var colMat, HotspotMat, HotspotInfoMat
function CreateCustomMaterials() {
    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = true
    colMat.alpha = 0

    /*
    var hsInfoText = new BABYLON.Texture("./assets/hotspot_info.png", scene, true, true)
    var hsText = new BABYLON.Texture("./assets/hotspot.png", scene, true, true)
    HotspotMat = new BABYLON.PBRMaterial("HotspotMat", scene)
    HotspotMat.unlit = true
    HotspotMat.albedoTexture = hsText
    HotspotMat.opacityTexture = hsText

    HotspotInfoMat = new BABYLON.PBRMaterial("HotspotInfoMat", scene)
    HotspotInfoMat.unlit = true
    HotspotInfoMat.albedoTexture = hsInfoText
    HotspotInfoMat.opacityTexture = hsInfoText
    */

    
}

