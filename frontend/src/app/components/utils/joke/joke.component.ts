import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  joke$!: Observable<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public joke: string,
  ) { }

  ngOnInit(): void {
  }

}
