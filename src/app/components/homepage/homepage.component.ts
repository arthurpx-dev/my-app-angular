import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie.service';
import { KeycloakOperationService } from '../../services/keykloak.service';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  movies: Movie[] = [];
  searchText: string = '';
  userProfile: any | null = null;
  isTooltipVisible = false;

  constructor(
    private movieService: MovieService,
    private keyCloakService: KeycloakOperationService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getAllMovies();
    this.keyCloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      console.table(this.userProfile);
    });
  }
  logout() {
    this.keyCloakService.logout();
  }
  getAllMovies() {
    this.movieService.getAllMovies().subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      },
      (error: any) => {
        this.handleError(error.error);
      }
    );
  }

  onMovieIdChange(event: any) {
    this.getMovieById(event.value);
  }

  private getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe(
      (movie: Movie) => {
        console.log('Recieved movie', movie);
      },
      (error: any) => {
        this.handleError(error.error);
      }
    );
  }

  private handleError(error: any) {
    this.displayError(error.code + ' ' + error.reason + '. ' + error.message);
  }

  private displayError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
  public onSearchChange(event: any) {
    this.searchText = event.target.value;
  }
}
