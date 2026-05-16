import { Pipe, PipeTransform } from '@angular/core';
import { flatEmojiMap } from '../constants/concert-emoji.constants';

@Pipe({
  name: 'concertImage',
  standalone: true
})
export class ConcertImagePipe implements PipeTransform {

  transform(imageKey: string | undefined): string {
    if (!imageKey) return '🎤';
    const key = imageKey.toLowerCase().trim();
    return flatEmojiMap[key] || '🎤';
  }

}