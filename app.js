
class Personel {
  constructor(first_name, last_name, department, email) {
    this.id = '0000'
    this.first_name = first_name;
    this.last_name = last_name;
    this.department = department;
    this.email = email;
  }
}

class UI {
  addToList(personel) {
    const list = document.getElementById('personel_list');

    var html = `
      <tr>
        <td>${personel.id}</td>
        <td>${personel.first_name}</td>
        <td>${personel.last_name}</td>
        <td>${personel.department}</td>
        <td>${personel.email}</td>
        <td>
          <a href="#" class="btn btn-secondary btn-sm edit">
            Edit
          </a>
          <a href="#" class="btn btn-danger btn-sm delete">
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
    if(element.classList.contains('edit')){

    }
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



document.getElementById('new_personel').addEventListener('submit',
function(e){
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const department = document.getElementById('department').value;
    const email = document.getElementById('email').value;

    // create new_personel
    const personel = new Personel(first_name, last_name, department, email);

    // create ui
    const ui = new UI();

    if(first_name==='' || last_name ==='' || department === ''|| email === ''){
        ui.showAlert('Please complete the form','warning');
    }else{
        // add to list
        ui.addToList(personel);

        // clear form
        ui.clearForm();

        ui.showAlert('New personel has been added','success');
    }


    e.preventDefault();
});
