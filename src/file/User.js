import React, { useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/style.css';
import SidebarNav from '../include/Sidebar';

function JQueryDataTable() {
  useEffect(() => {
    import('bootstrap').then((bootstrap) => {
      window.bootstrap = bootstrap;

      const modalElement = document.getElementById('myModal');
      const modalTitle = document.getElementById('modalTitle');
      const modalBody = document.getElementById('modalBody');

      // ✅ Single reusable modal instance
      const modalInstance = new window.bootstrap.Modal(modalElement);

      // ✅ Clean up stuck backdrop
      modalElement.addEventListener('hidden.bs.modal', () => {
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style = '';
      });

      // ✅ Destroy any previous DataTable
      if ($.fn.DataTable.isDataTable('#myTable')) {
        $('#myTable').DataTable().destroy();
      }

      // ✅ Initialize DataTable with server-side + AJAX
      $('#myTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
          url: 'http://localhost/nodeapi/users.php',
          type: 'POST',
          dataSrc: (json) => json.data || []
        },
        columns: [
          { data: 'full_name' },
          { data: 'email' },
          { data: 'phone_number' },
          { data: 'entrydate' },
          {
            data: 'id',
            render: (data) => `
              <button class="btn btn-info btn-sm view-btn" data-id="${data}">View</button>
              <button class="btn btn-warning btn-sm edit-btn" data-id="${data}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${data}">Delete</button>
            `,
            orderable: false
          }
        ]
      });

      // ✅ View Button
      $('#myTable tbody').on('click', '.view-btn', function () {
        const id = $(this).data('id');
        modalTitle.textContent = 'View User';
        modalBody.innerHTML = 'Loading...';
        modalInstance.show();

        axios.post('http://localhost/nodeapi/user_view.php', new URLSearchParams({ id }))
          .then(response => {
            const data = response.data.data;
            modalBody.innerHTML = `
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone_number}</p>
              <p><strong>Date:</strong> ${data.entrydate}</p>
            `;
          })
          .catch(() => {
            modalBody.innerHTML = `<p class="text-danger">Failed to load data.</p>`;
          });
      });

      // ✅ Edit Button
      $('#myTable tbody').on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        modalTitle.textContent = 'Edit User';
        modalBody.innerHTML = `
          <form id="editForm">
            <input type="hidden" name="id" value="${id}" />
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" name="name" class="form-control" placeholder="Edit name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" name="email" class="form-control" placeholder="Edit email" />
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        `;
        modalInstance.show();

        // Optionally handle form submission here with axios.post(...)
      });

      // ✅ Delete Button
      $('#myTable tbody').on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        modalTitle.textContent = 'Delete User';
        modalBody.innerHTML = `
          <p>Are you sure you want to delete user ID: <strong>${id}</strong>?</p>
          <button class="btn btn-danger confirm-delete" data-id="${id}">Yes, Delete</button>
        `;
        modalInstance.show();

        // Handle delete confirmation click
        $(document).off('click', '.confirm-delete').on('click', '.confirm-delete', function () {
          const deleteId = $(this).data('id');
          axios.post('http://localhost/nodeapi/user_delete.php', new URLSearchParams({ id: deleteId }))
            .then(() => {
              modalInstance.hide();
              $('#myTable').DataTable().ajax.reload();
            })
            .catch(() => {
              modalBody.innerHTML += `<p class="text-danger mt-3">Delete failed.</p>`;
            });
        });
      });
    });
  }, []);

  return (
    <div className="dashboard-container">
      <SidebarNav />
      <div className="main-content">
        <h1>All Leads</h1>
        <div className="container mt-4">
          <table id="myTable" className="display" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          aria-labelledby="modalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitle">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" id="modalBody">Loading...</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JQueryDataTable;
