import { Component, OnInit, ViewChild } from '@angular/core';
import { FarmService } from '../services/farm.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [FarmService]
  })

export class DetailsComponent implements OnInit {
    
    object!:any;

    constructor(private _farm:FarmService, private router: ActivatedRoute, private route:Router ){}

    ngOnInit(): void {
      if(this.router.snapshot.params.id !== undefined){
        if(!isNaN(+this.router.snapshot.params['id'])){
          this._farm.read(this.router.snapshot.params.id).subscribe((data)=>{
            const dataFarm = {
              id: data['id'],
              name: data['name'],
              geometry: data['geometry'],
              area: data['area'],
              centroid: data['centroid'],
              owner_id: data['owner_id']
            }
            this.object=dataFarm;
          });
        }
        else{
          this.route.navigate(['/','/']);
        }
      }
    }

    deleteFarm(id:number){
      this._farm.delete(id).subscribe((data)=>{
        this.route.navigate(['/','/'])
      });
    }
}