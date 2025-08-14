export function openModal(content) {
    const modal = document.getElementById("modal");
    if (!modal)
        return;
    modal.innerHTML = `<div class="modal-content">${content}</div>`;
    modal.style.display = "block";
}
