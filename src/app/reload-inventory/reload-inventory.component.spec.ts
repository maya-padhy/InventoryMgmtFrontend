import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadInventoryComponent } from './reload-inventory.component';

describe('ReloadInventoryComponent', () => {
  let component: ReloadInventoryComponent;
  let fixture: ComponentFixture<ReloadInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReloadInventoryComponent]
    });
    fixture = TestBed.createComponent(ReloadInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
