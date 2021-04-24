import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dados21Component } from './dados21.component';

describe('Dados21Component', () => {
  let component: Dados21Component;
  let fixture: ComponentFixture<Dados21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dados21Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dados21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
