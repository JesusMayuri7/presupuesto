import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidioComponent } from './subsidio.component';

describe('SubsidioComponent', () => {
  let component: SubsidioComponent;
  let fixture: ComponentFixture<SubsidioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
