import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagReplacComponent } from './tag-replac.component';

describe('TagReplacComponent', () => {
  let component: TagReplacComponent;
  let fixture: ComponentFixture<TagReplacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagReplacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagReplacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
