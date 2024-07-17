import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UtilsService } from 'app/core/services/utils.service';

@Component({
    selector       : 'error-404',
    templateUrl    : './error-404.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error404Component
{
    /**
     * Constructor
     */
    constructor(
        private utils: UtilsService
    )
    {
    }

    backToDashboard(){
        this.utils.navigateByOrgURL('/home/dashboard')
    }
}
