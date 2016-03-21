import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { SignalRService } from '../../services/signalR.service';
import { NeedsAuthentication } from '../../decorators/NeedsAuthentication';

@Component({
    selector: 'cpu-component',
    templateUrl: 'app/components/cpu/cpu.component.html',
    directives: [CORE_DIRECTIVES]
})

@NeedsAuthentication()
export class CpuComponent implements OnInit {
    public cpuValue: number;

    constructor(private _signalRService: SignalRService) {

    }

    public ngOnInit() {
        this.subscribeToEvents();
    }

    private subscribeToEvents(): void {
        this._signalRService.newCpuValue.subscribe((cpuValue: number) => {
            this.cpuValue = cpuValue;
        });
    }
}