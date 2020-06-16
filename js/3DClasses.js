class Hotspot {
    constructor(name, pos, mat, papa){

    //mesh
    this.Mesh = new BABYLON.MeshBuilder.CreatePlane("hs " + name, { size: 0.75 }, scene);
    this.Mesh.position = pos;

    //parent
    this.Mesh.setParent(papa)

    //color
    this.Mesh.material = mat;

    //collider
    this.hsColl = new BABYLON.MeshBuilder.CreateBox("HS Collider " + name, { height: 1, width:1, depth: 0.1 }, scene)

    this.hsColl.material = colMat;
    this.hsColl.setParent(this.Mesh);
    this.hsColl.position = new BABYLON.Vector3(0,0,0);
    this.hsColl.isPickable = true;

    }
}
