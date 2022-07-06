import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritListComponent } from './favorit-list.component';

describe('FavoritListComponent', () => {
  let component: FavoritListComponent;
  let fixture: ComponentFixture<FavoritListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
