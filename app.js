
class Personnel {
  constructor(first_name, last_name, department, email) {
    this.id = Math.floor(Math.random()*10000);
    this.first_name = first_name;
    this.last_name = last_name;
    this.department = department;
    this.email = email;
  }
}

class UI {
  addToList(personnel) {
    const list = document.getElementById('personnel_list');

    var html = `
      <tr>
        <td>${personnel.id}</td>
        <td>${personnel.first_name}</td>
        <td>${personnel.last_name}</td>
        <td>${personnel.department}</td>
        <td>${personnel.email}</td>
        <td>
          <a href="#" data-id="${personnel.id}" class="btn btn-secondary btn-sm edit">
            Edit
          </a>
          <a href="#" data-id="${personnel.id}" class="btn btn-danger btn-sm delete">
            Delete
          </a>
        </td>
      </tr>
    `;
     list.innerHTML += html;

  }
  clearForm() {
    const first_name = document.getElementById('first_name').value="";
    const last_name = document.getElementById('last_name').value="";
    const department = document.getElementById('department').value="";
    const email = document.getElementById('email').value="";

  }
  editElement(element) {
    // inline edif form wolud be bigger issue than all project
  }
  deleteElement(element) {
    if(element.classList.contains('delete')){
      element.parentElement.parentElement.remove();
      return true;
    }
  }
  showAlert(message, className) {
    var alert = `
     <div class="alert alert-${className}">
        ${message}
     </div>
    `;

    const row = document.querySelector('.row');
    // beforeBegin , afterBegin , beforeEnd , afterEnd
    row.insertAdjacentHTML('beforeBegin',alert);

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);
  }
}

class Storage {

  static getPersonnel() {
    let personnel;

    if(localStorage.getItem('personnel')===null){
        personnel=[];
    }else{
        personnel = JSON.parse(localStorage.getItem('personnel'));
    }
    return personnel;
  }

  static displayPersonnel() {
    const personnel = Storage.getPersonnel();

    personnel.forEach(course => {
        const ui = new UI();
        ui.addToList(personnel);
    });
  }

  static addPersonnel(p) {
    const personnel = Storage.getPersonnel();
    personnel.push(p);
    localStorage.setItem('personnel',JSON.stringify(personnel));
  }

  static deletePersonnel(element) {
    if(element.classList.contains('delete')){
        const id = element.getAttribute('data-id');

        const personnel = Storage.getPersonnel();

        personnel.forEach((p,index)=>{
            if(p.id == id){
                personnel.splice(index,1);
            }
        });

        localStorage.setItem('personnel',JSON.stringify(personnel));
    }
  }

}

// When page is loaded show personnel list in local storage
document.addEventListener('DOMContentLoaded',Storage.displayPersonnel);

document.getElementById('new_personnel').addEventListener('submit',
function(e){
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const department = document.getElementById('department').value;
    const email = document.getElementById('email').value;

    // create new_personnel
    const personnel = new Personnel(first_name, last_name, department, email);

    // create ui
    const ui = new UI();

    if(first_name==='' || last_name ==='' || department === ''|| email === ''){
        ui.showAlert('Please complete the form','warning');
    }else{
        // add to list
        ui.addToList(personnel);
        // add to Local Storage
        Storage.addPersonnel(personnel);

        // clear form
        ui.clearForm();

        ui.showAlert('New personnel has been added','success');
    }


    e.preventDefault();
});

document.getElementById('personnel_list').addEventListener('click',function(e){

    // create ui
    const ui = new UI();

    // delete course
    if(ui.deleteElement(e.target)==true){
        // delete from LS
        Storage.deletePersonnel(e.target);

        ui.showAlert('Personnel has been deleted','danger');
    }
});

document.getElementById('personnel_list').addEventListener('click',function(e){
    // inline edit form wolud be bigger issue than all project
    // create ui
    const ui = new UI();

    ui.showAlert("This function won't be added",'warning');

});
