import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-status-modal',
  templateUrl: './payment-status-modal.component.html',
  styleUrls: ['./payment-status-modal.component.css']
})
export class PaymentStatusModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PaymentStatusModalComponent>,
    private router: Router 
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigate(['/admin']); 
    }, 5000);
  }
}
