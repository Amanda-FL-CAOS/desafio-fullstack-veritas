// declaração das constantes gerais
const buttonAddTask = document.getElementsByClassName('add-task');
const taskList = document.getElementsByClassName('class-list');

// cria uma lista pra salvar todas as informações
let tasks = [];

// armazenamento
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem('tasks');
  if (raw) tasks = JSON.parse(raw);
}

// gera Id's unicos para que seja mais fácil de movimentar as tasks
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag
  ));
}

// renderização
function renderTask(task, list) {
  const html = `
    <li 
      class="task-card" 
      data-id="${task.id}" 
      draggable="true"
      ondragstart="handleDragStart(event)"
    >
      <p class="task-title">${escapeHtml(task.title)}</p>
    </li>
  `;
  list.insertAdjacentHTML('beforeend', html);
}

function renderAll() {
  const lists = {
    todo: document.querySelector('#to-do .class-list'),
    doing: document.querySelector('#doing .class-list'),
    done: document.querySelector('#done .class-list'),
  };

  Object.values(lists).forEach(ul => ul.innerHTML = '');
  tasks.forEach(task => {
    const list = lists[task.status];
    if (list) renderTask(task, list);
  });
}

// movimentação de tarefas
function moveTaskTo(id, newStatus) {
  const task = tasks.find(t => t.id == id);
  if (!task) return;
  task.status = newStatus;
  saveTasks();
  renderAll();
}

// drag and drop
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function handleDrop(event, newStatus) {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  if (!id) return;
  moveTaskTo(id, newStatus);
}

// modal de detalhes
function openDetailModal(task, column) {
  const modal = column.querySelector('.modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h2 class="title-detail">${escapeHtml(task.title)}</h2>
      <p class="desc-detail">${escapeHtml(task.description || 'Sem descrição')}</p>
      <button class="btn-move-to-do btn">A Fazer</button>
      <button class="btn-move-doing btn">Em Andamento</button>
      <button class="btn-move-done btn">Concluído</button>
      <button class="btn-delete btn">Excluir</button>
      <button class="btn-close btn">Fechar</button>
    </div>
  `;
  modal.classList.add('active');

  modal.querySelector('.btn-move-to-do').addEventListener('click', () => {
    moveTaskTo(task.id, 'todo');
    modal.classList.remove('active');
  });

  modal.querySelector('.btn-move-doing').addEventListener('click', () => {
    moveTaskTo(task.id, 'doing');
    modal.classList.remove('active');
  });

  modal.querySelector('.btn-move-done').addEventListener('click', () => {
    moveTaskTo(task.id, 'done');
    modal.classList.remove('active');
  });

  modal.querySelector('.btn-delete').addEventListener('click', () => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    renderAll();
    modal.classList.remove('active');
  });

  modal.querySelector('.btn-close').addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

// adicionar as tarefas nos quadros
document.querySelectorAll('.add-task').forEach(btn => {
  const column = btn.closest('.square');
  const list = column.querySelector('.class-list');
  const modal = column.querySelector('.modal');

  btn.addEventListener("click", () => {
    modal.innerHTML = `
      <div class="modal-content">
        <input class="input-title input" placeholder="Título">
        <textarea class="input-desc input" placeholder="Descrição da tarefa"></textarea>
        <button class="btn-save">Adicionar</button>
        <button class="btn-cancel">Fechar</button>
      </div>
    `;
    modal.classList.add('active');

    modal.querySelector('.btn-save').addEventListener('click', () => {
      const title = modal.querySelector('.input-title').value.trim();
      const desc = modal.querySelector('.input-desc').value.trim();
      if (!title) return alert('Coloque um título!');

      const id = generateId();
      const status =
        column.id === 'to-do' ? 'todo' :
        column.id === 'doing' ? 'doing' : 'done';

      const task = { id, title, description: desc, status };
      tasks.push(task);
      saveTasks();
      renderTask(task, list);

      modal.classList.remove('active');
    });

    modal.querySelector('.btn-cancel').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  // abrir modal de detalhes ao clicar na task
  list.addEventListener('click', (e) => {
    const card = e.target.closest('.task-card');
    if (!card) return;

    const id = card.dataset.id;
    const task = tasks.find(t => String(t.id) === String(id));
    if (task) openDetailModal(task, column);
  });
});

loadTasks();
renderAll();
