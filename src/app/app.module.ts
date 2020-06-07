import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { MatIconModule, MatSidenavContent, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes} from '@angular/router';
import { CustomMaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchHubComponent } from './Searchhub/searchhub.component';
import { PersonScreenComponent} from './personscreen/personscreen.component';
import { RelationScreenComponent } from './relationscreen/relationscreen.component';
import { InfoScreenComponent} from './infoscreen/infoscreen.component';
import { ChildrenScreenComponent } from './childrenscreen/childrenscreen.component';
import { DataSprocsService } from './datasprocs.service';
import { StateManagementService, StateServiceChildrenScreen, StateServiceSerchHubScreen } from './statemanagement.service';
import { MessageService } from './eventhub.service';
import { SavePersonDialogComponent } from './dialogs/saveperson/savepersondialog.component';
import { DeletePersonDialogComponent } from './dialogs/deleteperson/deletepersondialog.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { DocumentScreenComponent } from './documentscreen/documentscreen.component';
import { PreviousMariageScreenComponent } from './previousmariagescreen/previousmariagescreen.component';
import { LogInOutScreenComponent } from './loginoutscreen/loginoutscreen.component';
import { TreeFactoryModule } from './core/TreeBranches';
import { UserManagementService } from './usermanagement.service';

const appRoutes: Routes = [
    // { path: '', outlet: 'primary', redirectTo: '/personscreen(/sidenavNavigatie:searchhub)', pathMatch: 'full' },
    { path: '', outlet: 'primary', redirectTo: '/loginoutscreen', pathMatch: 'full' },
    { path: 'loginoutscreen', outlet: 'primary', component: LogInOutScreenComponent},
    { path: 'personscreen', outlet: 'primary', component: PersonScreenComponent}, // children: [
    { path: 'childrenscreen', outlet: 'personsChildren', component: ChildrenScreenComponent},
    { path: 'relationscreen', outlet: 'primary', component: RelationScreenComponent},
    { path: 'infoscreen', outlet: 'primary', component: InfoScreenComponent},
    { path: 'searchhub', outlet: 'sidenavNavigatie', component: SearchHubComponent},
    { path: 'loginoutscreen', outlet: 'primary', component: LogInOutScreenComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchHubComponent,
    PersonScreenComponent,
    RelationScreenComponent,
    InfoScreenComponent,
    ChildrenScreenComponent,
    DocumentScreenComponent,
    PreviousMariageScreenComponent,
    SavePersonDialogComponent,
    DeletePersonDialogComponent,
    LogInOutScreenComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    CustomMaterialModule,
    HttpClientModule,
    TreeFactoryModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: false, enableTracing: true } // Change enableTracing: to true to debug
    )
  ],
  providers: [
    DatePipe,
    DataSprocsService,
    StateManagementService,
    StateServiceChildrenScreen,
    StateServiceSerchHubScreen,
    MessageService,
    UserManagementService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SavePersonDialogComponent, DeletePersonDialogComponent]
})
export class AppModule {}
