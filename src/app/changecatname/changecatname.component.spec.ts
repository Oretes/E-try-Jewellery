import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecatnameComponent } from './changecatname.component';

describe('ChangecatnameComponent', () => {
  let component: ChangecatnameComponent;
  let fixture: ComponentFixture<ChangecatnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangecatnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecatnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
