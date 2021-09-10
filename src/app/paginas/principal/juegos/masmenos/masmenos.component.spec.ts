import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasmenosComponent } from './masmenos.component';

describe('MasmenosComponent', () => {
  let component: MasmenosComponent;
  let fixture: ComponentFixture<MasmenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasmenosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasmenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
