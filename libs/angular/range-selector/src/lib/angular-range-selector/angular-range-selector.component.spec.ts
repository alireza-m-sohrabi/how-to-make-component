import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularRangeSelectorComponent } from './angular-range-selector.component';

describe('AngularRangeSelectorComponent', () => {
  let component: AngularRangeSelectorComponent;
  let fixture: ComponentFixture<AngularRangeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularRangeSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
