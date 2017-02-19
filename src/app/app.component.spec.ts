import { TestBed, async, fakeAsync, inject } from '@angular/core/testing';
// import { NgModuleFactoryLoader } from '@angular/core';
import { AppComponent } from './app.component';

import { Router } from '@angular/router';


import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryStoreService } from '../api/in-memory-store.service';
import { AppRoutingModule, routes } from './app-routing.module';
import { SpeakerService } from './models';
import { PageNotFoundComponent } from './page-not-found.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Speaker } from './models';

class SpeakerServiceStub extends SpeakerService {
  private getObservableSpeaker() {
    const subject = new BehaviorSubject(new Speaker());
    const retVal = subject.asObservable();
    return <Observable<Speaker>>retVal;
  }
  addSpeaker(speaker: Speaker) {
    return this.getObservableSpeaker();
  }

  deleteSpeaker(speaker: Speaker) {
    return this.getObservableSpeaker();
  }
  getSpeakers() {
    const subject = new BehaviorSubject([new Speaker()]);
    const retVal = subject.asObservable();
    return <Observable<[Speaker]>>retVal;
  }
  getSpeaker(id: number) {
    return this.getObservableSpeaker();
  }
  updateSpeaker(speaker: Speaker) {
    return this.getObservableSpeaker();
  }
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        LoginModule,
        RouterTestingModule.withRoutes(routes),
        // RouterTestingModule,
        // AppRoutingModule,
        CoreModule,
        InMemoryWebApiModule.forRoot(InMemoryStoreService, { delay: 600 }),
      ],
      declarations: [AppComponent, PageNotFoundComponent],
      providers: [{ provide: SpeakerService, useValue: SpeakerServiceStub }],
    });
    TestBed.compileComponents();
  });

  // const loader = TestBed.get(NgModuleFactoryLoader);
  // class LoadedModule { }
  // router.resetConfig([
  //   { path: 'lazy', loadChildren: 'lazyModule' },
  // ]);

  it('true is true', () => expect(true).toBe(true));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it('should create the app', async(() => {

  //   fakeAsync(inject([Router, Location], (router: Router, location: Location) => {

  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();

  //   expect(location.path()).toEqual('/include/user/kate');
  // }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
