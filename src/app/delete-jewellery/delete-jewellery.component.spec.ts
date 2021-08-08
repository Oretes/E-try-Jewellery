import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJewelleryComponent } from './delete-jewellery.component';

describe('DeleteJewelleryComponent', () => {
  let component: DeleteJewelleryComponent;
  let fixture: ComponentFixture<DeleteJewelleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteJewelleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteJewelleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
