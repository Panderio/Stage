import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-cours',
  templateUrl: './details-cours.component.html',
  styleUrls: ['./details-cours.component.css']
})
export class DetailsCoursComponent implements OnInit {

  Course_Name= "Learn Python for beginner" ;
  Course_description = "lorem";
  number_enrolled = 4513;

  constructor() { }

  ngOnInit(): void {
  }

}
