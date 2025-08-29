import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() error: string | string[] | null = null;
  @Input() showRetryButton: boolean = true;
  @Input() retryButtonText: string = 'もう一度試す';
  
  @Output() retry = new EventEmitter<void>();
  
  onRetryClick(): void {
    this.retry.emit();
  }
  
  getErrorMessages(): string[] {
    if (!this.error) return [];
    return Array.isArray(this.error) ? this.error : [this.error];
  }
}