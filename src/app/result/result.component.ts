import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CardImageComponent } from '../card-image/card-image.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  images: any[] = [];
  mySubscription: any;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    let param: string;
    this.activatedRoute.params.subscribe( (params: any) => {
      console.log(params[`term`]);
      param = params[`term`];
    });
    const term: string = param !== '' ? `&q=${param}` : '';
    this.mySubscription = this.http.get(`https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25${term}`)
      .subscribe( (img: any) => {
        this.images = img[`hits`];
      });
  }

}
