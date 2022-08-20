import { Component, OnInit } from '@angular/core';
import { Blob } from '../models/blob';
import { BlobService } from '../services/blob.service';
@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.css']
})
export class BlobComponent implements OnInit {

  constructor(private blobService: BlobService) { }
  selectedFile: string = ''
  blobs: string[] = []
  blobName: string[] = []

  blob: Blob = {blobName: ''}

  blobPath: string = 'https://demostorage23031999.blob.core.windows.net/angularblob/'
  ngOnInit(): void {
    this.getBlobs()
  }

  upload(e: File[]) {
    this.selectedFile = ''
    const file = e[0]
    console.log(file)
    let fileName = file.name
    this.selectedFile = fileName
  
    this.blobService.upload(file).subscribe(
      (res) => { 
        console.log(res) 
        this.getBlobs()
      },
      error => console.log(error)
    );
  }

  chooseFile(): void {
    document.getElementById('file')?.click()
  }

  getBlobs(): void {
    this.blobService.getBlobs().subscribe((res) => {
      console.log(res)
      let blobs = res.blobs
      this.blobs = blobs
    }, (err) => {
      console.log(err)
    })
  }

  deleteBlob(blobToDelete: string): void {
    this.blob.blobName = blobToDelete
    console.log(this.blob)
    let ack = confirm("Delete Permanently")
    if(!ack)
      return
    this.blobService.deleteBlob(this.blob).subscribe((res) => {
      console.log(res)
      // fetch blobs again
      this.getBlobs()
    }, (err) => {
      console.log(err)
    })
  }

}
