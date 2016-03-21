import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

@Component({
    selector: 'unauthorized-component',
    templateUrl: 'app/components/unauthorized/unauthorized.component.html',
    directives: [CORE_DIRECTIVES]
})

export class UnauthorizedComponent {

    constructor() {}
}