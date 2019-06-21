import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  SampleForm: FormGroup;
  checkEmail: FormGroup;
  checkSms: FormGroup;


  types=[]
  depts=[];
  users=[];
  showDepts:boolean = false;
  showUsers:boolean = false;

  onSelectType() {
    let userType = this.SampleForm.value.types;
    // console.log('userType=>',userType);
    
    if(userType==1){
      let index=this.types.findIndex(x=>x.id==userType);
      // console.log(index);
      
      if(index!=-1){
        this.depts=this.types[index].departments;
      }
      this.showDepts = true;
      this.showUsers = true;
      this.SampleForm.get('depts').setValidators(Validators.required);
      this.SampleForm.get('users').setValidators(Validators.required);
    }else{
      this.showDepts = false;
      this.SampleForm.get('depts').setValue(null);
      this.SampleForm.get('depts').clearValidators();
      this.SampleForm.get('depts').updateValueAndValidity();
      if(userType==3){
        this.showDepts = false;
        this.showUsers = false;
        this.SampleForm.get('users').setValue(null);
        this.SampleForm.get('users').clearValidators();
        this.SampleForm.get('users').updateValueAndValidity();
        this.SampleForm.get('depts').setValue(null);
        this.SampleForm.get('depts').clearValidators();
        this.SampleForm.get('depts').updateValueAndValidity();
      }else{   
        this.showUsers = true;
        this.showDepts = false;
        if(userType == 2){
          console.log("departmenttype",this.types)
          this.SampleForm.get('users').setValidators(Validators.required);
          this.SampleForm.get('users').updateValueAndValidity();
          this.SampleForm.get('depts').setValue(null);
          this.SampleForm.get('depts').clearValidators();
          this.SampleForm.get('depts').updateValueAndValidity();
          let index=this.types.findIndex(x=>x.id ==this.SampleForm.value.types) ;

          if(index!=-1){      
            this.users=this.types[index].users;
          }
        }

      }
    }
  }
  onSelectDept(){
    let index=this.depts.findIndex(x=>x.deptId==this.SampleForm.value.depts);
    if(index!=-1){
      this.users=this.depts[index].users;
    }
  }

  

  ngOnInit(){
    this.SampleForm=this.fb.group({
      types:['',Validators.required],
      depts:['',Validators.required],
      users:['',Validators.required],
    })
    this.checkEmail = this.fb.group({
      emailValue: ['', [Validators.required, Validators.email]],
      sub: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cnt: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      senderEm: ['anil@gmail.com', [Validators.required, Validators.email]],
    })
    this.checkSms = this.fb.group({
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      mobileMsg: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      senderMob: ['9999999999', Validators.required],
    })
  }

  getOptions() {
    this.types=[
      { id: 1, name: 'Super Admin',
      departments:[
        {deptId:1,deptName:"Senior-Admin",
      users:[
        {userId:1,userName:"Sr-Admin-User-1"},
        {userId:2,userName:"Sr-Admin-User-2"},
      ]},
        {deptId:2,deptName:"Junior-Admin",
        users:[
          {userId:1,userName:"Jr-Admin-User-1"},
          {userId:2,userName:"Jr-Admin-User-2"},
        ]}
      ]},
      { id: 2, name: 'Department User',users:[
        {userId:1,userName:"Dept-user-1"},
        {userId:2,userName:"Dept-user-2"},
        {userId:3,userName:"Dept-user-3"},
      ]},
      { id: 3, name: 'Normal User'}
    ];    
  }
 
  constructor(private fb:FormBuilder) { 
    this.getOptions();
  }

  
  public email;
  public subject;
  public content;
  public senderEmail;

  emailDetails(){
    this.email = this.checkEmail.value.emailValue;
    this.subject = this.checkEmail.value.sub;
    this.content = this.checkEmail.value.cnt;
    this.senderEmail = this.checkEmail.value.senderEm;
    console.log(this.email -- , this.subject -- , this.content -- , this.senderEmail);
  }

  public mobileNum;
  public msg1;
  public senderMobile;

  smsDetails(){
    this.mobileNum = this.checkSms.value.mobile;
    this.msg1 = this.checkSms.value.mobileMsg;
    this.senderMobile = this.checkSms.value.senderMob;
    console.log(this.mobileNum -- , this.msg1 -- , this.senderMobile);
  }

}







// onSelectType() {
//   let userType = this.SampleForm.value.types;
//     console.log('userType=>',userType);
    
    
//   if(userType==1){
//      let index=this.types.findIndex(x=>x.id==userType);
//      console.log(index);
     
//       if(index!=-1){
//         this.depts=this.types[index].departments;
//       }
//       this.hideDepts = true;
//       this.hideUsers = true;
//   }else{
//     this.hideDepts = false;
//     if(userType==3){
//       this.hideDepts = false;
//         this.hideUsers = false;
//     }
     
//       else
//       {
        
//         this.hideUsers = true;

//       }
//   }
// }
