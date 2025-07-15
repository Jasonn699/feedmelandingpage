document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.feature-tab');
  const details = document.querySelectorAll('.feature-details');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Hide all details
      details.forEach(d => d.classList.remove('active'));
      // Activate this tab
      tab.classList.add('active');
      // Show corresponding details
      const feature = tab.getAttribute('data-feature');
      const detail = document.getElementById('feature-' + feature);
      if (detail) detail.classList.add('active');
    });
  });
}); 