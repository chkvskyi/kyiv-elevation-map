import { BoxGeometry, Group, AxesHelper } from 'three';
import BasicLights from './Lights.js';

import * as d3 from 'd3';

import elevations from './kyiv_elevation.json';
import Bar from './Bar.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    let lights = new BasicLights();
    let elevationsC = elevations.map(e => ({ lat: Number(e.lat), lng: Number(e.lng), elevation: Number(e.elevation) }))
    let minLat = d3.min(elevationsC, d => d.lat);
    let minLng = d3.min(elevationsC, d => d.lng);
    let maxLat = d3.max(elevationsC, d => d.lat);
    let maxLng = d3.max(elevationsC, d => d.lng);

    let scaleX = 500 / (maxLat - minLat);
    let scaleZ = 500 / (maxLng - minLng);

    let minEl = d3.min(elevationsC, d => d.elevation);
    let maxEl = d3.max(elevationsC, d => d.elevation);
    let scaleY = 1 / (maxEl - minEl);
    
    elevationsC.forEach(e => {
      let x = (e.lat - minLat) * scaleX - 250;
      let z = (e.lng - minLng) * scaleZ - 250;

      let bar = new Bar(e.elevation / 2, x, z, d3.interpolateViridis((e.elevation - minEl) * scaleY));
      this.add(bar);
    });

    let axesHelper = new AxesHelper(100);
    this.add(lights, axesHelper);
    console.log(this)
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 1000000;
  }
}