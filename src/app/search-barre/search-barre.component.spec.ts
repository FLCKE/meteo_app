import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarreComponent } from './search-barre.component';

describe('SearchBarreComponent', () => {
  let component: SearchBarreComponent;
  let fixture: ComponentFixture<SearchBarreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
