import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'cooming-soon-component',
    templateUrl    : 'cooming-soon.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoomingSoonComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
