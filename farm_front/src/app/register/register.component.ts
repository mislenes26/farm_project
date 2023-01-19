import { Component, OnInit, Input } from '@angular/core';
import { FarmService } from '../services/farm.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib';
import { getArea } from 'ol/sphere.js';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })

export class RegisterComponent implements OnInit  {

  edit=false;
  drag: any;
  event: any;
  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []

  newFarm = new FormGroup({
    name: new FormControl(''),
    area: new FormControl(''),
    geometry: new FormControl(''),
    centroid: new FormControl(''),
    owner_id: new FormControl('')
  });
  message_success:boolean=false;

  constructor(private _farm:FarmService, private router:ActivatedRoute,private _mapService: MapService){}

  ngOnInit(): void {
    this._map = this._mapService.map
    if(this.router.snapshot.params.id !== undefined){
      this._farm.read(this.router.snapshot.params.id).subscribe((data)=>{
        this.newFarm = new FormGroup({
          name: new FormControl(data['name']),
          area: new FormControl(data['area']),
          geometry: new FormControl(data['geometry']),
          centroid: new FormControl(data['centroid']),
          owner_id: new FormControl(data['owner_id'])
        });
        this.edit=true;
      });
    }
  }

  draw(type: 'Circle') {
    if(!this._map) return
    this._map.includeAddon(new DrawAddon({
      identifier: 'geometry_map',
      drawType: type,
      callback: geometry => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
          this.newFarm.value['area']=getArea(geometry);
          this.newFarm.value['centroid']=this._map.getMap().getView().getCenter();
        }
      }))
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    this.newFarm.value['geometry']=geometry;
    this._geometries.push(geometry)
  }


  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }

  SaveFarm(){
    if(this.edit==false){
        this._farm.create(this.newFarm.value).subscribe((data)=>{
        this.message_success=true;
        this.newFarm.reset({});
      });
    }
    else{
      this._farm.update(this.router.snapshot.params.id,this.newFarm.value).subscribe((data)=>{
        this.message_success=true;
        this.edit=false;
      })
    }
  }
}