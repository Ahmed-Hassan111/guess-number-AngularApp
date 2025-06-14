import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-number',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-number.component.html',
  styleUrl: './guess-number.component.scss',
})
export class GuessNumberComponent {
  secretNumber: number = this.generateRandomNumber();
  attemptsLeft: number = 10;
  guessedNumber?: number;
  feedbackMessage: string = '';
  gameOver: boolean = false;

  private static readonly MAX_ATTEMPTS: number = 10;
  private static readonly MAX_NUMBER: number = 100;

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * GuessNumberComponent.MAX_NUMBER) + 1;
  }

  public isValidGuess(guessedNumber: number): boolean {
    return (
      !isNaN(guessedNumber) &&
      guessedNumber >= 1 &&
      guessedNumber <= GuessNumberComponent.MAX_NUMBER
    );
  }
  submitGuess(): void {
    if (!this.isValidGuess(this.guessedNumber!)) {
      this.feedbackMessage = `Enter a number between 1 and ${GuessNumberComponent.MAX_NUMBER}.`;
      return;
    }
    this.attemptsLeft--;
    this.evaluateGuess();
  }

  private evaluateGuess(): void {
    if (this.guessedNumber === this.secretNumber) {
      this.endGame(true);
    } else if (this.attemptsLeft === 0) {
      this.endGame(false);
    } else {
      this.feedbackMessage =
        this.guessedNumber! > this.secretNumber
          ? 'Too High! Try again.'
          : 'Too low! Try again.';
    }
  }

  private endGame(isWin: boolean): void {
    this.gameOver = true;
    this.feedbackMessage = isWin
      ? 'Congratulations! You guessed the correct number!'
      : `Game over! The correct number was ${this.secretNumber}`;
  }

  resetGame(): void {
    this.secretNumber = this.generateRandomNumber();
    this.attemptsLeft = GuessNumberComponent.MAX_ATTEMPTS;
    this.guessedNumber = undefined;
    this.feedbackMessage = '';
    this.gameOver = false;
  }
}
