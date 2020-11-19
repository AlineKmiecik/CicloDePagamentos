import { BillingCycle } from './../../../models/BillingCycle';
import { CycleService } from './../../../services/cycle.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: "app-list-cycle",
  templateUrl: "./list-cycle.component.html",
  styleUrls: ["./list-cycle.component.css"],
})
export class ListCycleComponent implements OnInit {
  
  cyclesColumns: string[] = ["id", "date", "edit", "delete"];
  
  cycles: BillingCycle[] = [];
  cyclesTable: MatTableDataSource<BillingCycle> = 
    new MatTableDataSource<BillingCycle>(
    this.cycles
  );

  constructor(private router: Router, private cycleService: CycleService) {}
  
  ngOnInit(): void {
    this.cycleService.list().subscribe((lista) => {
      this.cycles = lista;      
      this.cyclesTable = new MatTableDataSource<BillingCycle>(this.cycles);
    });
  }

  navigateToCreateCycle(): void {
    this.router.navigate(['cycle/create']);
  }

  delete(id: string): void{
    this.cycleService.delete(id).subscribe((lista) => {
      this.cycles = lista;      
      this.cyclesTable = new MatTableDataSource<BillingCycle>(this.cycles);
    });
  }

}
