import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatSidenavContent } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes} from '@angular/router';
import {CustomMaterialModule} from './core/material.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { PersoonMenuComponent} from './persoonmenu/persoonmenu.component';
import { AddPersonComponent } from './addperson/addperson.component';
import { ChangePersonComponent } from './changeperson/changeperson.component';
import { DeletePersonComponent } from './deleteperson/deleteperson.component';
import { RelatieMenuComponent } from './relatiemenu/relatiemenu.component';
import { DeleteRelationComponent } from './deleterelation/deleterelation.component';
import { AddRelationComponent } from './addrelation/addrelation.component';
import { ChangeRelationComponent } from './changerelation/changerelation.component';
import { InfoMenuComponent} from './infomenu/infomenu.component';
import { CompanyInfoComponent } from './companyinfo/companyinfo.component';
import { ApplicationInfoComponent } from './applicationinfo/applicationinfo.component';
import { VariousInfoComponent } from './variousinfo/variousinfo.component';
import { FdtstComponent } from './fdtst/fdtst.component';
import { DataSprocsService } from './datasprocs.service';

// const appRoutes: Routes = [
//   { path: '', outlet: 'primary', redirectTo: 'topmenu', pathMatch: 'full' },
//   { path: 'topmenu', outlet: 'primary', component: TopmenuComponent},
//   { path: 'persoonmenu', outlet: 'sidenavNavigatie', component: PersoonMenuComponent},
//   { path: 'addperson', outlet: 'sidenavInhoud', component: AddPersonComponent},
//   { path: 'deleteperson', outlet: 'sidenavInhoud', component: DeletePersonComponent},
//   { path: 'changeperson', outlet: 'sidenavInhoud', component: ChangePersonComponent},
//   { path: 'relatiemenu', outlet: 'sidenavNavigatie', component: RelatieMenuComponent},
//   { path: 'addrelation', outlet: 'sidenavInhoud', component: AddRelationComponent},
//   { path: 'deleterelation', outlet: 'sidenavInhoud', component: DeleteRelationComponent},
//   { path: 'changerelation', outlet: 'sidenavInhoud', component: ChangeRelationComponent},
//   { path: 'infomenu', outlet: 'sidenavNavigatie', component: InfoMenuComponent},
//   { path: 'companyinfo', outlet: 'sidenavInhoud', component: CompanyInfoComponent},
//   { path: 'applicationinfo', outlet: 'sidenavInhoud', component: ApplicationInfoComponent},
//   { path: 'variousinfo', outlet: 'sidenavInhoud', component: VariousInfoComponent}
// ];



const appRoutes: Routes = [
  { path: '', outlet: 'primary', redirectTo: 'topmenu', pathMatch: 'full' },
  { path: 'topmenu', outlet: 'primary', component: TopmenuComponent},
      { path: 'persoonmenu', outlet: 'sidenavNavigatie', component: PersoonMenuComponent, children: [
          { path: 'addperson', outlet: 'sidenavInhoud', component: AddPersonComponent, pathMatch: 'full'},
          { path: 'deleteperson', outlet: 'sidenavInhoud', component: DeletePersonComponent},
          { path: 'changeperson', outlet: 'sidenavInhoud', component: ChangePersonComponent}
        ]},
      { path: 'relatiemenu', outlet: 'sidenavNavigatie', component: RelatieMenuComponent, children: [
        { path: 'addrelation', outlet: 'sidenavInhoud', component: AddRelationComponent},
        { path: 'deleterelation', outlet: 'sidenavInhoud', component: DeleteRelationComponent},
        { path: 'changerelation', outlet: 'sidenavInhoud', component: ChangeRelationComponent}
      ]},
      { path: 'infomenu', outlet: 'sidenavNavigatie', component: InfoMenuComponent, children: [
        { path: 'companyinfo', outlet: 'sidenavInhoud', component: CompanyInfoComponent},
        { path: 'applicationinfo', outlet: 'sidenavInhoud', component: ApplicationInfoComponent},
        { path: 'variousinfo', outlet: 'sidenavInhoud', component: VariousInfoComponent}
      ]}
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TopmenuComponent,
    PersoonMenuComponent,
    AddPersonComponent,
    ChangePersonComponent,
    DeletePersonComponent,
    RelatieMenuComponent,
    AddRelationComponent,
    ChangeRelationComponent,
    DeleteRelationComponent,
    InfoMenuComponent,
    CompanyInfoComponent,
    ApplicationInfoComponent,
    VariousInfoComponent,
    FdtstComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    CustomMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: false, enableTracing: true } // <-- debug
    )
  ],
  providers: [
    DataSprocsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
