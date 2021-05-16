import { Group, BoxGeometry, MeshBasicMaterial, Mesh, MeshLambertMaterial } from 'three';

export default class Bar extends Group {
  constructor(height, posX, posZ, color) {
    super();

    this.name = 'land';

    let geometry = new BoxGeometry(1.5, height, 1.5);
    let material = new MeshLambertMaterial({ color });
    let cube = new Mesh(geometry, material);
    cube.position.set(posX, height / 2, posZ);
    this.add(cube);
  }
}
