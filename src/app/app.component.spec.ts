import { TestBed, ComponentFixture, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyNgModuleFactoryLoader } from '@angular/router/testing';

import {
  Component,
  DebugElement,
  NgModule,
  NgModuleFactoryLoader,
  NO_ERRORS_SCHEMA
} from '@angular/core';

import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { PageNotFoundComponent } from './page-not-found.component';

@Component({
  template: '<div>lazy-loaded</div>'
})
class LazyComponent {}

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: LazyComponent }])],
  declarations: [LazyComponent]
})
class LazyModule {}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, PageNotFoundComponent],
      providers: [],
      schemas: [
        /**
         * This tells the compiler to ignore any unknown elements
         * in the component template. This way we can only test
         * what we need to without bringing in all the dependencies.
         */
        NO_ERRORS_SCHEMA
      ]
    });
    TestBed.compileComponents();
  });

  it('true is true', () => expect(true).toBe(true));

  it(
    'should be defined',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  it('should contain a navigation component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('ev-nav').length).toBe(1);
  });

  it(
    'should render a 404 route',
    fakeAsync(
      inject([Router], (router: Router) => {
        const fixture = TestBed.createComponent(AppComponent);

        router.navigate(['/invalid']);

        tick();
        fixture.detectChanges();
        tick();

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h4').textContent).toContain('Inconceivable!');
        expect(compiled.querySelectorAll('ev-404').length).toBe(1);
      })
    )
  );

  it(
    'should lazy load a dashboard module',
    fakeAsync(
      inject(
        [Router, NgModuleFactoryLoader],
        (router: Router, loader: SpyNgModuleFactoryLoader) => {
          const fixture = TestBed.createComponent(AppComponent);

          loader.stubbedModules = {
            'app/dashboard/dashboard.module#DashboardModule': LazyModule
          };

          router.navigate(['/dashboard']);

          tick();
          fixture.detectChanges();
          tick();

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('div').textContent).toContain('lazy-loaded');
        }
      )
    )
  );

  it(
    'should go to / on app creation',
    async(
      inject([Router, Location], (router: Router, location: Location) => {
        // fakeAsync(inject([Router, Location], (router: Router, location: Location) => {

        // const location = TestBed.get(Location);
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
        expect(location.path()).toEqual('');
      })
    )
  );
});
