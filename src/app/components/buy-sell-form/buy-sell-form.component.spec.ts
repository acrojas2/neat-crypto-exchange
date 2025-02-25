import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellFormComponent } from './buy-sell-form.component';

describe('BuySellFormComponent', () => {
  let component: BuySellFormComponent;
  let fixture: ComponentFixture<BuySellFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuySellFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
