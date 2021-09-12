import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { AppComponent, AppComponentModule, CoreModule } from '@vendure/admin-ui/core';

import { routes } from './app.routes';
import { SharedExtensionsModule } from './shared-extensions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { OrderListCustomComponent } from '../../ui-extensions/order-list-custom.component';

@NgModule({
    declarations: [],
    imports: [
        AppComponentModule,
        RouterModule.forRoot(routes, { useHash: false }),
        CoreModule,
        SharedExtensionsModule,
        BrowserAnimationsModule,
        ModalModule.forRoot()
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
