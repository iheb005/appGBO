import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Fact } from 'src/app/model/Facture';

@Component({
  selector: 'app-impression',
  templateUrl: './impression.component.html',
  styleUrls: ['./impression.component.css']
})
export class ImpressionComponent implements OnInit {
  id=this.activatedroute.snapshot.params.id
  @ViewChild('htmlData') htmlData:ElementRef;

  facture:any
  constructor(private activatedroute:ActivatedRoute, private service:ServiceService) { }

  ngOnInit(): void {
    this.getOneFacture()
  }

  getOneFacture(){
    this.service.getAll().subscribe((res:any)=>{

      this.facture=res.filter((el)=>el.id==this.id)[0]
      console.log("factureeeee by id", this.facture)
    })
  }
  public openPDF():void {
    let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA).then((canvas:any) => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');
    });     
  }

}
