import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

    get currentUserProfile$(): Observable<ProfileUser | null> {
        return this.authService.currentUser$.pipe(
          
            switchMap((user) => {
                if (!user?.uid){
                    console.log("no user")
                    return of(null);
                }
                const ref = doc(this.firestore, 'users', user?.uid)
                console.log(user?.uid)
                return docData(ref) as Observable<ProfileUser>;
            })
        )
    }
    
  constructor(private firestore: Firestore,  private authService: AuthenticationService,) {}

 
  addUser(user: ProfileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc( ref, { ...user }));
  }
  
}