import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularRangeSelectorExampleComponent } from './angular-range-selector-example.component';

describe('AngularRangeSelectorExampleComponent', () => {
  let component: AngularRangeSelectorExampleComponent;
  let fixture: ComponentFixture<AngularRangeSelectorExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularRangeSelectorExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularRangeSelectorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
