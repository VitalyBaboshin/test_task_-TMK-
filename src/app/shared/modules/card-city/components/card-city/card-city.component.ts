import {Component, Input} from '@angular/core';

@Component({
  selector: 'vl-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss']
})
export class CardCityComponent {
  @Input('city') cityProps: string

  // set mock findings
  temp: number = this.randomInteger(-20, 20)
  indication = {
    pressure: this.randomInteger(480, 800),
    wind: this.randomInteger(0, 25),
    precip:this.randomInteger(0, 99)
}

  randomInteger(min, max): number {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
  }
}
