import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import neatAxiosClient from '../../clients/neat-api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    this.user$ = authState(this.auth);
  }

  async signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    await neatAxiosClient.post('/users/register', { user });

    return userCredential;
  }

  async login(email: string, password: string) {
    const userWithCredentials = await signInWithEmailAndPassword(this.auth, email, password);
    await userWithCredentials.user.getIdToken();

    console.log("TOKEN", userWithCredentials)

    return userWithCredentials;
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  get user() {
    return this.auth.currentUser;
  }
}
