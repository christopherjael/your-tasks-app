window.addEventListener('load', () => {
  const $btnUpdate = document.querySelectorAll('.btnUpdate');

  $btnUpdate.forEach((e) => {
    e.addEventListener('click', (event) => {
      /* inputs from update task form */
      let $updateTitle = document.querySelector('#updateTitle');
      let $updateDescription = document.querySelector('#updateDescription');
      let $formUpdateTask = document.forms['form-update-task'];

      /* dataset from btnUpdate parents */
      let parentId = event.currentTarget.parentElement.dataset.id;
      let parent = event.currentTarget.parentElement;

      /* get title and description values from selected task */
      let title = parent.getElementsByTagName('h4')[0].textContent;
      let description = parent.getElementsByTagName('p')[0].textContent;

      /* set new values for update task from */
      $formUpdateTask.setAttribute('action', `/tasks/update/${parentId}`);
      $updateTitle.value = title;
      $updateDescription.value = description;
    });
  });
});
