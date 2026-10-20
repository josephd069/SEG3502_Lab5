import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  Timestamp
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore = inject(Firestore);
  private employeesRef = collection(this.firestore, 'employees');

  private employees$ = collectionData(this.employeesRef).pipe(
    map(data => data.map(emp => new Employee(
      emp['name'],
      (emp['dateOfBirth'] as Timestamp).toDate(),
      emp['city'],
      emp['salary'],
      emp['gender'],
      emp['email']
    )))
  );

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Employee) {
    return addDoc(this.employeesRef, {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender ?? '',
      email: employee.email ?? ''
    });
  }
}
