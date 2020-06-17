
//callinfobox button
let showInfo = false;
$(document).keyup(function (e) {
    //if keypress "i"

    if (e.keyCode === 73) {
        swooshAnim.restart()
    }
    if (e.keyCode === 79) {
        //MuteVideoStreaming();
    }
});


function SetPointerManager(scene) {
    scene.onPointerMove = function () {

    }

    var showUI = false
    scene.onPointerDown = function () {

        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return (mesh.name.startsWith("PackCollider") && mesh.isPickable); });
        if (pickInfo && pickInfo.pickedMesh && !isAnimating) {
            CallPackPositionChange(pickInfo)

        }
    }
}

function CallPackPositionChange(pickInfo) {

    //alert(pickInfo.pickedMesh.name);
    CurrentSelection = pickInfo.pickedMesh.name.split('PackCollider')[1];

    //avoid same selection
    if (PacksList[CurrentSelection].position.z == 2) {
        return;
    }
    //shoot Particles
    var pos = pickInfo.pickedMesh.getAbsolutePosition()
    pos.y = 1.3
    console.log(pos)
    createWinParticles(CurrentSelection, pos)

    window.setTimeout(() => {
        selectParticles.stop();
    }, 1500)

    //Animate
    ChangeFocusPack(CurrentSelection)
    ShowSelectedAnim(CurrentSelection)
    switch (CurrentSelection) {
        case "0":
            break;

        case "1":
            break;

        case "2":
            break;

        case "3":
            break;

        case "4":
            break;

        case "5":
            break;

        case "6":
            break;
    }

}