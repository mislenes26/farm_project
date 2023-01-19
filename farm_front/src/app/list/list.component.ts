import { Component, OnInit } from '@angular/core';
import { FarmService } from '../services/farm.service';
import { Farm } from '../models/Farm';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
  })

export class ListComponent implements OnInit {

    dataFarm!: Farm[];

    constructor(private _farm:FarmService){}

    ngOnInit() {
        this._farm.list().subscribe((data)=>{
            this.dataFarm=data;
        })
    }
    /*farms:any=[];
    constructor(private _farm:FarmService){}

    ngOnInit() {
        this._farm.list().subscribe((data)=>{
            this.farms=data;
        })
    }*/
}