import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUSERComponent } from './data-user.component';

describe('DataUSERComponent', () => {
  let component: DataUSERComponent;
  let fixture: ComponentFixture<DataUSERComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUSERComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUSERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
