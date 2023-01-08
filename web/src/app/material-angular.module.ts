import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

const importExports = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [...importExports],
  exports: [...importExports],
})
export class MaterialAngularModule {}
