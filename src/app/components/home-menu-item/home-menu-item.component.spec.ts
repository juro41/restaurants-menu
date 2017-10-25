import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuItemComponent } from './home-menu-item.component';

describe('HomeMenuItemComponent', () => {
  let component: HomeMenuItemComponent;
  let fixture: ComponentFixture<HomeMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
