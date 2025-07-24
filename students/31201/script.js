document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-target');
    const subBoxes = document.querySelectorAll(`.sub-box.${type}`);
    const isVisible = subBoxes[0].style.display === 'block';

    subBoxes.forEach(box => {
      box.style.display = isVisible ? 'none' : 'block';
    });

    button.textContent = isVisible ? '자세히 보기' : '닫기';
  });
});
