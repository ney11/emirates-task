import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { List } from '../list.model';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = ''
  postCreated: any;
  private mode = 'create';
  private listId: string | any;
  list: List | any;
  isLoading = false;

  constructor(private listsService: ListsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
      if(paramMap.has('listId')){
        this.mode = 'edit'
        this.listId = paramMap.get('listId');
        this.isLoading = true;
        // this.list = this.listsService.getList(this.listId)
        this.listsService.getList(this.listId).subscribe((listData)=> {
          this.isLoading = false;
          this.list = {id: listData._id, title: listData.title, content: listData.content};
        });
      }else {
        this.mode = 'create';
        this.listId = null;
      }
    })
  }

  onSaveList(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.listsService.addList(form.value.title,form.value.content);
    } else {
      this.listsService.updateList(
        this.listId,
        form.value.title,
        form.value.content
      );
    }
    
    form.resetForm();
  }
}
