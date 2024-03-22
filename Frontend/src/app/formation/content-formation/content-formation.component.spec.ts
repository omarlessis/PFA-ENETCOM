import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFormationComponent } from './content-formation.component';

describe('ContentFormationComponent', () => {
  let component: ContentFormationComponent;
  let fixture: ComponentFixture<ContentFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
