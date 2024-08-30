import Swal from 'sweetalert2';
import { API_ENDPOINT } from '../config/api.config.js';
import {
  customValidationTitleHandler,
  customValidationBodyHandler,
} from '../validations/note-custom-validation.js';
import { hideLoading, showLoading } from '../utils.js';

export default function Home() {
  const loading = document.querySelectorAll('#loading');

  const renderNotes = (notes, targetElement) => {
    targetElement.innerHTML = '';

    notes.forEach((note) => {
      const article = document.createElement('article');

      const actionButtons = note.archived
        ? `
          <button id="${note.id}" class="btn blue btn-unarchive" aria-label="Batal Arsipkan catatan">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-x"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="m9.5 17 5-5"/><path d="m9.5 12 5 5"/></svg>
          </button>
        `
        : `
          <button id="${note.id}" class="btn btn-archive" aria-label="Arsipkan catatan">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
          </button>
        `;

      article.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <small>${new Date(note.createdAt).toLocaleString()}</small>
        <div class="action">
          ${actionButtons}
          <button id="${note.id}" class="btn red btn-delete" aria-label="Hapus catatan">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;
      targetElement.appendChild(article);
    });

    addNoteEventListeners();
  };

  const addNoteEventListeners = () => {
    document.querySelectorAll('.btn-archive').forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        try {
          showLoading(loading);
          const noteId = btn.attributes.id.value;
          const response = await fetch(API_ENDPOINT.addArchive(noteId), {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const { message } = await response.json();
          updateNotesDisplay();
          Swal.fire('Tersimpan!', `${message}`, 'success');
        } catch (error) {
          hideLoading(loading);
          Swal.fire('Gagal Mengarsipkan Catatan', `${error.message}`, 'error');
        } finally {
          hideLoading(loading);
        }
      });
    });

    document.querySelectorAll('.btn-unarchive').forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        try {
          showLoading(loading);
          const noteId = btn.attributes.id.value;
          const response = await fetch(API_ENDPOINT.addUnArchive(noteId), {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const { message } = await response.json();
          updateNotesDisplay();
          Swal.fire('Catatan telah dikembalikan!', `${message}`, 'success');
        } catch (error) {
          hideLoading(loading);
          Swal.fire('Gagal mengembalikan catatan', `${error.message}`, 'error');
        } finally {
          hideLoading(loading);
        }
      });
    });

    const btnDelete = document.querySelectorAll('.btn-delete');

    btnDelete.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        Swal.fire({
          title: 'Yakin Ingin Menghapus?',
          text: 'Catatan yang Sudah dihapus TIDAK dapat dikembalikan',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, HAPUS!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              showLoading(loading);
              const noteId = btn.attributes.id.value;
              const response = await fetch(API_ENDPOINT.delete(noteId), {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              });
              const { message } = await response.json();
              updateNotesDisplay();
              Swal.fire('Terhapus!', `${message}`, 'success');
            } catch (error) {
              hideLoading(loading);
              Swal.fire('Gagal menghapus catatan', `${error.message}`, 'error');
            } finally {
              hideLoading(loading);
            }
          }
        });
      });
    });
  };

  const updateNotesDisplay = async (searchQuery = '') => {
    try {
      showLoading(loading);

      const [notesResponse, archivedResponse] = await Promise.all([
        fetch(API_ENDPOINT.notes),
        fetch(API_ENDPOINT.archived),
      ]);

      const [{ data: notes }, { data: archivedNotes }] = await Promise.all([
        notesResponse.json(),
        archivedResponse.json(),
      ]);

      // Filter notes based on searchQuery
      const filteredNotes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.body.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      const filteredArchivedNotes = archivedNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.body.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      renderNotes(filteredNotes, document.querySelector('#noteList'));
      renderNotes(
        filteredArchivedNotes,
        document.querySelector('#archivedNoteList'),
      );
    } catch (error) {
      Swal.fire('Gagal memuat catatan', `${error.message}`, 'error');
    } finally {
      hideLoading(loading);
    }
  };

  const form = document.getElementById('noteForm');

  const titleInput = form.elements['title'];
  const bodyInput = form.elements['body'];

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = form.title.value;
    const body = form.body.value;
    const response = await fetch(API_ENDPOINT.notes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const { message, status } = await response.json();

    if (status === 'success') {
      Swal.fire({
        title: 'Catatan Berhasil Ditambahkan',
        text: `${message}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } else {
      Swal.fire({
        title: 'Gagal Menambahkan Catatan',
        text: `${message}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
    form.reset();
    updateNotesDisplay();
  });

  titleInput.addEventListener('change', customValidationTitleHandler);
  titleInput.addEventListener('invalid', customValidationTitleHandler);

  titleInput.addEventListener('blur', (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = '';
    }
  });

  bodyInput.addEventListener('change', customValidationBodyHandler);
  bodyInput.addEventListener('invalid', customValidationBodyHandler);

  bodyInput.addEventListener('blur', (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = '';
    }
  });

  document
    .querySelector('note-search')
    .addEventListener('search-note', (event) => {
      const searchQuery = event.detail;
      updateNotesDisplay(searchQuery);
    });

  updateNotesDisplay();
}
