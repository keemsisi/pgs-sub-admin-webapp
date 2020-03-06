import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
  styleUrls: ['./all-applicants.component.css']
})
export class AllApplicantsComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // We only want to detach the change detectors after change detection has been
    // performed for the first time
    this.cdr.detach();
  }

  update() {
    // Run change detection only for this component when update() method is called.
    this.cdr.detectChanges();
  }
  
}