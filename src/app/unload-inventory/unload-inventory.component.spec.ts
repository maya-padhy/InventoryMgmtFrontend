import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadInventoryComponent } from './unload-inventory.component';

describe('UnloadInventoryComponent', () => {
  let component: UnloadInventoryComponent;
  let fixture: ComponentFixture<UnloadInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnloadInventoryComponent]
    });
    fixture = TestBed.createComponent(UnloadInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
