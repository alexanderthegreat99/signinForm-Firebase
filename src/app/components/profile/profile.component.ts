import { Component } from '@angular/core';
//import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { NgToastService } from 'ng-angular-popup';
import {
  User,
  
} from '@angular/fire/auth';
import { concatMap } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user$ = this.authService.currentUser$;
  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: NgToastService,

 ) {}
 uploadImage(event: any, user: User){
  this.imageUploadService.uploadImage(event.target.files[0],`images/profile/${user.uid}`).pipe(
    concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
  ).subscribe(() => {
    this.toast.success({detail:"SUCCESS",summary:'You Sucessfully Uploaded the Image!', duration: 5000});
  
    
  }, err=>{
    this.toast.error({detail:"ERROR",summary:'Image Upload failed!', duration: 5000})
  });
 }



}
