import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { Router } from '@angular/router';
// import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // private authGuard: AuthGuard
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // On page load, check if user was redirected to login
    // if (this.authGuard.redirectUrl) {
    // this.messageClass = 'alert alert-danger'; // Set error message: need to login
    // this.message = 'You must be logged in to view that page.'; // Set message
    // this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
    // this.authGuard.redirectUrl = undefined; // Erase previous URL
    // }
  }


  // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    // this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }
    console.log(user);
    // Function to send login data to API
    this.authService.login(user).subscribe((data) => {
      // Check if response was a success or error
      this.message = data.message;
      if (!data) {
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
        this.message = data.message;
      } else {
        // Set success message
        // Function to store user's token in client local storage
        // this.authService.storeUserData(data.token, data.user);
        // After 2 seconds, redirect to dashboard page
        //  setTimeout(() => {
        //     Check if user was redirected or logging in for first time
        //    if (this.previousUrl) {
        //      this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
        //    } else {
        //      this.router.navigate(['/dashboard']); // Navigate to dashboard view
        //    }
        //  }, 2000);
      }
    }
    );
  }



}