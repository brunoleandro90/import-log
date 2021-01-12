import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';

const routes: Routes = [
    {
        path: '',
        component: PortalComponent,
        children: [
            {
                path: '',
                redirectTo: 'batch'
            },
            {
                path: 'batch',
                loadChildren: () => import('./batch/batch.module').then(m => m.BatchModule)
            },
            {
                path: 'log',
                loadChildren: () => import('./log/log.module').then(m => m.LogModule)
            },
            // {
            //     path: 'log',
            //     component: LogComponent
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortalRoutingModule {}
