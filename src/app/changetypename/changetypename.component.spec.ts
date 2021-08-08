import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangetypenameComponent } from './changetypename.component';

describe('ChangetypenameComponent', () => {
  let component: ChangetypenameComponent;
  let fixture: ComponentFixture<ChangetypenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangetypenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangetypenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
