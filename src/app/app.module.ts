import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { MatIconModule, MatSidenavContent } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes} from '@angular/router';
import { CustomMaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchHubComponent } from './Searchhub/searchhub.component';
import { PersonScreenComponent} from './personscreen/personscreen.component';
import { RelationScreenComponent } from './relationscreen/relationscreen.component';
import { InfoScreenComponent} from './infoscreen/infoscreen.component';
import { ChildrenScreenComponent } from './childrenscreen/childrenscreen.component';
import { DataSprocsService } from './datasprocs.service';
import { MessageService } from './eventhub.service';

const appRoutes: Routes = [
    { path: '', outlet: 'primary', redirectTo: '/personscreen(sidenavNavigatie:searchhub//personsChildren:childrenscreen)', pathMatch: 'full' },
    { path: 'personscreen', outlet: 'primary', component: PersonScreenComponent},
    { path: 'relationscreen', outlet: 'primary', component: RelationScreenComponent},
    { path: 'infoscreen', outlet: 'primary', component: InfoScreenComponent},
    { path: 'searchhub', outlet: 'sidenavNavigatie', component: SearchHubComponent},
    { path: 'childrenscreen', outlet: 'personsChildren', component: ChildrenScreenComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchHubComponent,
    PersonScreenComponent,
    RelationScreenComponent,
    InfoScreenComponent,
    ChildrenScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    DataSprocsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
