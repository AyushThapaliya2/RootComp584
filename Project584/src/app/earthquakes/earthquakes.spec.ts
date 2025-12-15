import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Earthquakes } from './earthquakes';

describe('Earthquakes', () => {
  let component: Earthquakes;
  let fixture: ComponentFixture<Earthquakes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Earthquakes],
    }).compileComponents();

    fixture = TestBed.createComponent(Earthquakes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
