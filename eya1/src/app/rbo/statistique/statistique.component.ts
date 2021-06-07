import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Facture Ajouter'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Facture Modifier'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Facture Supprimmer'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
