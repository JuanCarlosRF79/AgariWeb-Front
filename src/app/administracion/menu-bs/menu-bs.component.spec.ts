import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBsComponent } from './menu-bs.component';

describe('MenuBsComponent', () => {
  let component: MenuBsComponent;
  let fixture: ComponentFixture<MenuBsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
