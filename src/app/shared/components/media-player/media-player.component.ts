import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover: TrackModel = {
    cover: "https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc",
    album: "Gioli y Assia",
    name: "BEBE (Oficial)",
    url: "http://localhost/track.mp3",
    _id: 1
  }
  
  ListObserver$:Array<Subscription> =[]

  constructor(private multimediaService: MultimediaService  ) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (Response: TrackModel) =>{
        console.log('Recibiendo cancion.....', Response);
      }
    )

    this.ListObserver$=[observer1$]
  }

  ngOnDestroy(): void {
    this.ListObserver$.forEach(u => u.unsubscribe())
    console.log('→→→→→ BOOM')
  }
}
