import { Component, OnInit } from "@angular/core";
import { BillingCycle } from "src/app/models/BillingCycle";
import { Credit } from "src/app/models/Credit";
import { CycleService } from "src/app/services/cycle.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Debit } from "src/app/models/Debit";

@Component({
  selector: "app-create-cycle",
  templateUrl: "./create-cycle.component.html",
  styleUrls: ["./create-cycle.component.css"],
})
export class CreateCycleComponent implements OnInit {
  creditColumns: string[] = ["name", "value"];
  debitColumns: string[] = ["name", "value", "status"];
  credits: Credit[] = [];
  debits: Debit[] = [];

  creditsTable: MatTableDataSource<Credit> = new MatTableDataSource<Credit>(
    this.credits
  );
  debitsTable: MatTableDataSource<Debit> = new MatTableDataSource<Debit>(
    this.debits
  );
  cycle: BillingCycle = new BillingCycle();
  credit: Credit = new Credit();
  debit: Debit = new Debit();

  date: string;
  creditName: string;
  creditValue: number;
  debitName: string;
  debitValue: number;
  debitStatus: string;

  constructor(
    private service: CycleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id !== null) {
      this.service.getById(id).subscribe((cycle) => {
        console.log(cycle);
        this.cycle = cycle;
        this.credits = cycle.credits;
        this.debits = cycle.debits;
        this.date = cycle.date.toString();
        this.creditsTable = new MatTableDataSource<Credit>(this.credits);
        this.debitsTable = new MatTableDataSource<Debit>(this.debits);
      });
    }
  }

  create(): void {
    this.cycle.date = new Date(this.date);
    this.cycle.credits = this.credits;
    this.cycle.debits = this.debits;
    if (this.cycle._id == null) {
      this.service.create(this.cycle).subscribe((cycle) => {
        console.log(cycle);
      });
    } else {
      this.service.update(this.cycle).subscribe((cycle) => {
        console.log(cycle);
      });
    }
    this.router.navigate([""]);
  }

  addCredit(): void {
    this.credit = new Credit();
    this.credit.name = this.creditName;
    this.credit.value = this.creditValue;
    this.credits.push(this.credit);

    this.creditsTable._updateChangeSubscription();

    this.creditName = "";
    this.creditValue = null;
  }

  addDebit(): void {
    console.log(this.debitStatus);
    this.debit = new Debit();
    this.debit.name = this.debitName;
    this.debit.value = this.debitValue;
    this.debit.status = this.debitStatus;
    this.debits.push(this.debit);

    this.debitsTable._updateChangeSubscription();

    this.debitName = "";
    this.debitValue = null;
    this.debitStatus = "";
  }

  getCycle(): void {
    let dateInput = new Date(this.date);
    this.service.getByMonthYear(dateInput.getFullYear(), dateInput.getMonth()).subscribe((cycle) => {
      console.log(cycle);
      this.cycle = cycle;
      this.credits = cycle.credits;
      this.debits = cycle.debits;
      this.date = cycle.date.toString();
      this.creditsTable = new MatTableDataSource<Credit>(this.credits);
      this.debitsTable = new MatTableDataSource<Debit>(this.debits);
    });
  }
}
