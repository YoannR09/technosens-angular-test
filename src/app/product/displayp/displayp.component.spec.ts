import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaypComponent } from './displayp.component';

describe('DisplaypComponent', () => {
  let component: DisplaypComponent;
  let fixture: ComponentFixture<DisplaypComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaypComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
