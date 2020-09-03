import { Component, OnInit, ViewChild, ElementRef,Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cap-img',
  templateUrl: './cap-img.component.html',
  styleUrls: ['./cap-img.component.css']
})

export class CapImgComponent implements OnInit {


    @ViewChild('video', { static: true }) videoElement: ElementRef;
    @ViewChild('canvas', { static: true }) canvas: ElementRef;
    constraints = {
        video: {
            facingMode: "environment",
            width: { ideal: 4096 },
            height: { ideal: 2160 }
        }
    };

    public captures: Array<any>;
    constructor(private renderer: Renderer2, private http: HttpClient) {
        this.captures  = [];
    }

    startCamera() {
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
     navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
        } else {
            alert('Sorry, camera not available.');
        }
    }
    handleError(error) {
        console.log('Error: ', error);
    }
    attachVideo(stream) {
        this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
        this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
            this.videoHeight = this.videoElement.nativeElement.videoHeight;
            this.videoWidth = this.videoElement.nativeElement.videoWidth;
            
        });
    }


    public ngOnInit() {
    this.startCamera();
    }
    videoWidth = 0;
    videoHeight = 0;

    capture() {
         
        this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
        this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        return this.canvas.nativeElement.toDataURL('image/jpg');

    }
        
    
    
    onSubmit(){
        const formData = new FormData();
        let cap = this.capture();
        fetch(cap)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "File name",{ type:
            "image/png" });
            console.log(file)
        formData.append('personImage',file );
    
        this.http.post<any>('http://localhost:3000/api/person', formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
        })    
        this.http.get<any>('http://localhost:3000/api/person').subscribe(
            (res) => console.log(res),
            (err) => console.log(err) 
            );
    }


}