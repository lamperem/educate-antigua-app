import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'arrow-back',
    templateUrl: 'arrow-back.component.html'
})

export class ArrowBackComponent implements OnInit {
    constructor(private _location: Location)  
    {

    }

    ngOnInit() { }

    back() {
        this._location.back();
      }
}