import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { FoodComponent } from '../food/foodcomponent';
import { ChatComponent } from '../chat/chatComponent';
import { CpuComponent } from '../cpu/cpuComponent';
import { NeedsAuthentication } from '../../decorators/NeedsAuthentication';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    directives: [CORE_DIRECTIVES, FoodComponent, ChatComponent, CpuComponent]
})

@NeedsAuthentication()
export class DashboardComponent {

    public message: string;

    constructor() {
        this.message = 'Hello from HomeComponent constructor';
    }
}
